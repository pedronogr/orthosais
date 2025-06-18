const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Configuração para usar banco de dados local como único método
const USE_LOCAL_DB = true;
const LOCAL_DB_PATH = path.join(__dirname, 'local_coupons.json');

// Armazenamento local para cupons
let localCoupons = {};

// Função para carregar cupons do arquivo local
const loadLocalCoupons = async () => {
  try {
    console.log(`Tentando carregar cupons do arquivo local: ${LOCAL_DB_PATH}`);
    const data = await fs.readFile(LOCAL_DB_PATH, 'utf8');
    localCoupons = JSON.parse(data);
    console.log(`Cupons carregados com sucesso: ${Object.keys(localCoupons).length} cupons encontrados`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Arquivo de cupons local não encontrado. Criando novo banco de dados.');
      localCoupons = {};
      await saveLocalCoupons();
    } else {
      console.error('Erro ao carregar cupons locais:', error);
      localCoupons = {};
    }
  }
};

// Função para salvar cupons no arquivo local
const saveLocalCoupons = async () => {
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(localCoupons, null, 2));
    console.log('Cupons salvos localmente com sucesso');
  } catch (error) {
    console.error('Erro ao salvar cupons localmente:', error);
  }
};

// Cria uma interface de banco de dados local
const createLocalDbInterface = () => {
  return {
    collection: (name) => ({
      find: () => ({ toArray: async () => Object.values(localCoupons) }),
      findOne: async (query) => {
        if (query.id) return localCoupons[query.id];
        if (query.code) return Object.values(localCoupons).find(c => c.code === query.code);
        return null;
      },
      insertOne: async (doc) => {
        localCoupons[doc.id] = doc;
        await saveLocalCoupons();
        return { insertedId: doc.id };
      },
      updateOne: async (query, update) => {
        const id = query.id;
        if (localCoupons[id]) {
          if (update.$set) {
            localCoupons[id] = { ...localCoupons[id], ...update.$set };
          }
          if (update.$inc && update.$inc.uses) {
            localCoupons[id].uses += update.$inc.uses;
          }
          await saveLocalCoupons();
          return { matchedCount: 1, modifiedCount: 1 };
        }
        return { matchedCount: 0, modifiedCount: 0 };
      },
      deleteOne: async (query) => {
        const id = query.id;
        if (localCoupons[id]) {
          delete localCoupons[id];
          await saveLocalCoupons();
          return { deletedCount: 1 };
        }
        return { deletedCount: 0 };
      }
    })
  };
};

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  // Configurações de CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
  
  // Retornar resposta imediata para preflight requests (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight request successful' }),
    };
  }
  
  try {
    console.log(`Recebida requisição ${event.httpMethod} para ${event.path} em ${new Date().toISOString()}`);
    
    // Carregamos os cupons locais
    await loadLocalCoupons();
    
    // Criamos a interface do banco de dados local
    const db = createLocalDbInterface();
    const coupons = db.collection('coupons');
    const path = event.path.split('/').pop();
    
    // GET /coupons - Lista todos os cupons
    if (event.httpMethod === 'GET' && !path.includes('verify')) {
      try {
        const results = await coupons.find({}).toArray();
        console.log(`Encontrados ${results.length} cupons`);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(results),
        };
      } catch (error) {
        console.error("Erro ao buscar cupons:", error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify([]), // Retorna array vazio em caso de erro
        };
      }
    }
    
    // GET /coupons/verify/:code - Verifica se um cupom é válido
    if (event.httpMethod === 'GET' && path.includes('verify')) {
      try {
        const code = path.split('verify/')[1];
        console.log(`Verificando cupom com código: ${code}`);
        
        const coupon = await coupons.findOne({ code: code });
        console.log(`Resultado da busca por cupom ${code}:`, coupon ? `Encontrado (ID: ${coupon.id})` : 'Não encontrado');
        
        if (!coupon) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Cupom não encontrado' }),
          };
        }
        
        // Verifica se o cupom é válido (não expirado e com usos disponíveis)
        const isValid = coupon.expiresAt > Date.now() && coupon.uses < coupon.maxUses;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            coupon,
            isValid,
            reason: !isValid
              ? coupon.expiresAt <= Date.now()
                ? 'expirado'
                : 'esgotado'
              : null,
          }),
        };
      } catch (error) {
        console.error(`Erro ao verificar cupom ${code}:`, error);
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Erro ao verificar cupom', message: error.message }),
        };
      }
    }
    
    // POST /coupons - Cria um novo cupom
    if (event.httpMethod === 'POST') {
      try {
        const couponData = JSON.parse(event.body);
        console.log(`Criando novo cupom:`, couponData);
        
        // Valida os dados necessários
        if (!couponData.code || !couponData.type || couponData.value === undefined) {
          console.error('Dados incompletos para criação do cupom');
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Dados incompletos' }),
          };
        }
        
        // Verifica se o código já existe
        const existingCoupon = await coupons.findOne({ code: couponData.code });
        if (existingCoupon) {
          console.log(`Cupom com código ${couponData.code} já existe`);
          return {
            statusCode: 409,
            headers,
            body: JSON.stringify({ error: 'Código de cupom já existe' }),
          };
        }
        
        // Adiciona campos default caso não existam
        const newCoupon = {
          ...couponData,
          id: couponData.code,
          maxUses: couponData.maxUses || 100,
          uses: 0,
          expiresAt: couponData.expiresAt || Date.now() + 30 * 86400000, // 30 dias por padrão
          createdAt: Date.now(),
        };
        
        const result = await coupons.insertOne(newCoupon);
        console.log(`Cupom criado com sucesso.`);
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newCoupon),
        };
      } catch (error) {
        console.error('Erro ao criar cupom:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao criar cupom', message: error.message }),
        };
      }
    }
    
    // PUT /coupons/:id - Atualiza um cupom
    if (event.httpMethod === 'PUT') {
      try {
        const couponId = path;
        const updates = JSON.parse(event.body);
        console.log(`Atualizando cupom ${couponId}:`, updates);
        
        delete updates._id; // Evitar erro de modificação do _id
        
        const result = await coupons.updateOne(
          { id: couponId },
          { $set: updates }
        );
        
        console.log(`Resultado da atualização: ${result.matchedCount} encontrados, ${result.modifiedCount} modificados`);
        
        if (result.matchedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Cupom não encontrado' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ updated: true, id: couponId }),
        };
      } catch (error) {
        console.error(`Erro ao atualizar cupom:`, error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao atualizar cupom', message: error.message }),
        };
      }
    }
    
    // PATCH /coupons/:id/use - Incrementa o uso de um cupom
    if (event.httpMethod === 'PATCH' && path.includes('use')) {
      try {
        const couponId = path.split('/use')[0];
        console.log(`Incrementando uso do cupom ${couponId}`);
        
        const result = await coupons.updateOne(
          { id: couponId },
          { $inc: { uses: 1 } }
        );
        
        console.log(`Resultado do incremento: ${result.matchedCount} encontrados, ${result.modifiedCount} modificados`);
        
        if (result.matchedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Cupom não encontrado' }),
          };
        }
        
        const updatedCoupon = await coupons.findOne({ id: couponId });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedCoupon),
        };
      } catch (error) {
        console.error(`Erro ao incrementar uso do cupom:`, error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao incrementar uso do cupom', message: error.message }),
        };
      }
    }
    
    // DELETE /coupons/:id - Remove um cupom
    if (event.httpMethod === 'DELETE') {
      try {
        const couponId = path;
        console.log(`Removendo cupom ${couponId}`);
        
        const result = await coupons.deleteOne({ id: couponId });
        console.log(`Resultado da remoção: ${result.deletedCount} removidos`);
        
        if (result.deletedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Cupom não encontrado' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ deleted: true, id: couponId }),
        };
      } catch (error) {
        console.error(`Erro ao remover cupom:`, error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Erro ao remover cupom', message: error.message }),
        };
      }
    }
    
    // Se chegou aqui, é porque o endpoint não existe
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint não encontrado' }),
    };
    
  } catch (error) {
    console.error("Erro não tratado na função:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor', 
        message: error.message || 'Erro desconhecido' 
      }),
    };
  }
}; 
const { MongoClient } = require('mongodb');
require('dotenv').config();

// URI de conexão para o MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://orthosais:${process.env.MONGODB_PASSWORD}@cluster0.mongodb.net/orthosais`;
const DB_NAME = "orthosais";
const COLLECTION = "coupons";

let cachedDb = null;
let connectionAttempts = 0;
const MAX_ATTEMPTS = 3;

// Função para tentar conexão com o MongoDB com tentativas
const connectToDatabase = async () => {
  if (cachedDb) {
    console.log("Usando conexão MongoDB em cache");
    return cachedDb;
  }
  
  // Reinicia contagem de tentativas se for uma nova chamada
  connectionAttempts = 0;
  
  return attemptConnection();
};

// Função para fazer tentativas de conexão
const attemptConnection = async () => {
  connectionAttempts++;
  
  try {
    console.log(`Tentativa ${connectionAttempts} de conexão com o MongoDB...`);
    console.log(`URI: ${MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, "mongodb+srv://***:***@")}`);
    
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 segundos para timeout
      connectTimeoutMS: 10000, // 10 segundos
    });
    
    console.log("Conexão estabelecida com sucesso!");
    const db = client.db(DB_NAME);
    
    // Verifica se a coleção existe, criando-a se necessário
    const collections = await db.listCollections({ name: COLLECTION }).toArray();
    if (collections.length === 0) {
      console.log(`Criando coleção '${COLLECTION}'...`);
      await db.createCollection(COLLECTION);
      console.log(`Coleção '${COLLECTION}' criada com sucesso!`);
    }
    
    cachedDb = db;
    return db;
  } catch (error) {
    console.error(`Erro na tentativa ${connectionAttempts} de conexão com MongoDB:`, error);
    
    // Tenta novamente se ainda não atingiu o limite
    if (connectionAttempts < MAX_ATTEMPTS) {
      console.log(`Tentando novamente em 1 segundo...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return attemptConnection();
    }
    
    throw error;
  }
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
    
    const db = await connectToDatabase();
    const coupons = db.collection(COLLECTION);
    const path = event.path.split('/').pop();
    
    // GET /coupons - Lista todos os cupons
    if (event.httpMethod === 'GET' && !path.includes('verify')) {
      console.log("Buscando todos os cupons");
      const results = await coupons.find({}).toArray();
      console.log(`Encontrados ${results.length} cupons`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(results),
      };
    }
    
    // GET /coupons/verify/:code - Verifica se um cupom é válido
    if (event.httpMethod === 'GET' && path.includes('verify')) {
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
    }
    
    // POST /coupons - Cria um novo cupom
    if (event.httpMethod === 'POST') {
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
      console.log(`Cupom criado com sucesso. ID MongoDB: ${result.insertedId}`);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newCoupon),
      };
    }
    
    // PUT /coupons/:id - Atualiza um cupom
    if (event.httpMethod === 'PUT') {
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
    }
    
    // PATCH /coupons/:id/use - Incrementa o uso de um cupom
    if (event.httpMethod === 'PATCH' && path.includes('use')) {
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
    }
    
    // DELETE /coupons/:id - Remove um cupom
    if (event.httpMethod === 'DELETE') {
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
    }
    
    // Método não suportado
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
    
  } catch (error) {
    console.error('Erro na função de cupons:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        error: 'Erro interno do servidor',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
}; 
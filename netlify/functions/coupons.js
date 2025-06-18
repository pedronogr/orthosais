const { MongoClient } = require('mongodb');
require('dotenv').config();

// URI de conexão para o MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://orthosais:${process.env.MONGODB_PASSWORD}@cluster0.mongodb.net/orthosais`;
const DB_NAME = "orthosais";
const COLLECTION = "coupons";

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    console.log("Conectando ao MongoDB...");
    console.log("URI:", MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, "mongodb+srv://***:***@"));
    
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Conexão estabelecida com sucesso!");
    const db = client.db(DB_NAME);
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error);
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
    console.log(`Recebida requisição ${event.httpMethod} para ${event.path}`);
    
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
      const coupon = await coupons.findOne({ code: code });
      
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
      
      // Valida os dados necessários
      if (!couponData.code || !couponData.type || couponData.value === undefined) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Dados incompletos' }),
        };
      }
      
      // Verifica se o código já existe
      const existingCoupon = await coupons.findOne({ code: couponData.code });
      if (existingCoupon) {
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
      
      await coupons.insertOne(newCoupon);
      
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
      
      delete updates._id; // Evitar erro de modificação do _id
      
      const result = await coupons.updateOne(
        { id: couponId },
        { $set: updates }
      );
      
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
      
      const result = await coupons.updateOne(
        { id: couponId },
        { $inc: { uses: 1 } }
      );
      
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
      
      const result = await coupons.deleteOne({ id: couponId });
      
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
      body: JSON.stringify({ error: 'Erro interno do servidor' }),
    };
  }
}; 
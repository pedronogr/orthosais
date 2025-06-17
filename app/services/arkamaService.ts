import axios from 'axios';

// Configuração base para a API Arkama
const API_BASE_URL = 'https://app.arkama.com.br/api/v1';
const API_TOKEN = process.env.NEXT_PUBLIC_ARKAMA_API_TOKEN || '';

// Cliente axios configurado
const arkamaClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

// Interface para os dados da ordem
export interface OrderData {
  total: number;
  paymentMethod: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  customer: {
    name: string;
    email: string;
    document: string; // CPF/CNPJ
    phone?: string;
  };
  shipping?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    number: string;
    complement?: string;
  };
}

// Interface para a resposta de ordem
export interface OrderResponse {
  id: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: Array<any>;
  customer: any;
}

/**
 * Cria uma nova ordem de compra
 * @param orderData Dados da ordem
 * @returns Resposta com os dados da ordem criada
 */
export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    const response = await arkamaClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ordem:', error);
    throw error;
  }
};

/**
 * Busca uma ordem pelo ID
 * @param orderId ID da ordem
 * @returns Dados da ordem
 */
export const getOrder = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await arkamaClient.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar ordem ${orderId}:`, error);
    throw error;
  }
};

/**
 * Estorna (reembolsa) uma ordem
 * @param orderId ID da ordem
 * @param reason Motivo do estorno (opcional)
 * @returns Resposta da operação de estorno
 */
export const refundOrder = async (orderId: string, reason?: string): Promise<any> => {
  try {
    const response = await arkamaClient.post(`/orders/${orderId}/refund`, { reason });
    return response.data;
  } catch (error) {
    console.error(`Erro ao estornar ordem ${orderId}:`, error);
    throw error;
  }
};

export default {
  createOrder,
  getOrder,
  refundOrder
}; 
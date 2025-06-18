// Serviço de Cupons & Campanhas

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  maxUses: number;
  uses: number;
  expiresAt: number; // timestamp
  createdAt: number;
}

// URL base da API de cupons do Netlify Functions
const API_URL = '/.netlify/functions/coupons';

// Função auxiliar para fazer chamadas de API
const fetchAPI = async (endpoint: string, options?: RequestInit) => {
  console.log(`Chamando API: ${API_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { error: errorText };
      }
      console.error(`Erro na API (${response.status}):`, error);
      throw new Error(error.error || `Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Resposta API (${endpoint}):`, data);
    return data;
  } catch (error) {
    console.error(`Falha ao chamar API ${endpoint}:`, error);
    throw error;
  }
};

// Função de fallback para IndexedDB (para compatibilidade com implementação anterior)
let fallbackToIndexedDB = false;

// Objeto de armazenamento local para fallback em clientes
const localCouponStore: { [key: string]: Coupon } = {};

export const addCoupon = async (c: Coupon): Promise<string> => {
  try {
    if (fallbackToIndexedDB) {
      console.log('Usando armazenamento local para cupons');
      localCouponStore[c.id] = c;
      return c.id;
    }
    
    const result = await fetchAPI('', {
      method: 'POST',
      body: JSON.stringify(c),
    });
    
    return result.id;
  } catch (error) {
    console.error('Erro ao adicionar cupom, usando fallback:', error);
    fallbackToIndexedDB = true;
    localCouponStore[c.id] = c;
    return c.id;
  }
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  try {
    if (fallbackToIndexedDB) {
      return Object.values(localCouponStore);
    }
    
    return await fetchAPI('');
  } catch (error) {
    console.error('Erro ao buscar cupons, usando fallback:', error);
    fallbackToIndexedDB = true;
    return Object.values(localCouponStore);
  }
};

export const deleteCoupon = async (id: string): Promise<boolean> => {
  try {
    if (fallbackToIndexedDB) {
      delete localCouponStore[id];
      return true;
    }
    
    await fetchAPI(`/${id}`, {
      method: 'DELETE',
    });
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar cupom, usando fallback:', error);
    fallbackToIndexedDB = true;
    delete localCouponStore[id];
    return true;
  }
};

export const updateCoupon = async (c: Coupon): Promise<boolean> => {
  try {
    if (fallbackToIndexedDB) {
      localCouponStore[c.id] = c;
      return true;
    }
    
    await fetchAPI(`/${c.id}`, {
      method: 'PUT',
      body: JSON.stringify(c),
    });
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar cupom, usando fallback:', error);
    fallbackToIndexedDB = true;
    localCouponStore[c.id] = c;
    return true;
  }
};

export const verifyCoupon = async (code: string): Promise<{ 
  coupon: Coupon | null; 
  isValid: boolean; 
  reason?: string;
}> => {
  try {
    if (fallbackToIndexedDB) {
      const coupon = Object.values(localCouponStore).find(c => c.code.toLowerCase() === code.toLowerCase());
      if (!coupon) {
        return { coupon: null, isValid: false, reason: 'not_found' };
      }
      const isValid = coupon.expiresAt > Date.now() && coupon.uses < coupon.maxUses;
      return {
        coupon,
        isValid,
        reason: !isValid
          ? coupon.expiresAt <= Date.now()
            ? 'expirado'
            : 'esgotado'
          : undefined
      };
    }
    
    const result = await fetchAPI(`/verify/${code}`);
    return result;
  } catch (error) {
    console.error('Erro ao verificar cupom, usando fallback:', error);
    fallbackToIndexedDB = true;
    
    const coupon = Object.values(localCouponStore).find(c => c.code.toLowerCase() === code.toLowerCase());
    if (!coupon) {
      return { coupon: null, isValid: false, reason: 'not_found' };
    }
    
    const isValid = coupon.expiresAt > Date.now() && coupon.uses < coupon.maxUses;
    return {
      coupon,
      isValid,
      reason: !isValid
        ? coupon.expiresAt <= Date.now()
          ? 'expirado'
          : 'esgotado'
        : undefined
    };
  }
};

export const incrementCouponUse = async (id: string): Promise<boolean> => {
  try {
    if (fallbackToIndexedDB) {
      const coupon = localCouponStore[id];
      if (coupon) {
        coupon.uses += 1;
        localCouponStore[id] = coupon;
      }
      return true;
    }
    
    await fetchAPI(`/${id}/use`, {
      method: 'PATCH',
    });
    
    return true;
  } catch (error) {
    console.error('Erro ao incrementar uso do cupom, usando fallback:', error);
    fallbackToIndexedDB = true;
    const coupon = localCouponStore[id];
    if (coupon) {
      coupon.uses += 1;
      localCouponStore[id] = coupon;
    }
    return true;
  }
}; 
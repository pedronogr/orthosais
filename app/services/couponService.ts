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

// Removemos o fallback para IndexedDB para evitar problemas de persistência
// let fallbackToIndexedDB = false;

// Objeto de armazenamento local apenas para fallback em casos extremos
const localCouponStore: { [key: string]: Coupon } = {};

// Função para persistir localmente no localStorage
const persistLocalCoupons = (coupons: { [key: string]: Coupon }) => {
  try {
    localStorage.setItem('orthosais_coupons', JSON.stringify(coupons));
  } catch (err) {
    console.error('Erro ao salvar cupons localmente:', err);
  }
};

// Função para recuperar cupons do localStorage
const getLocalCoupons = (): { [key: string]: Coupon } => {
  try {
    const stored = localStorage.getItem('orthosais_coupons');
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Erro ao recuperar cupons locais:', err);
    return {};
  }
};

export const addCoupon = async (c: Coupon): Promise<string> => {
  try {
    const result = await fetchAPI('', {
      method: 'POST',
      body: JSON.stringify(c),
    });
    
    // Armazenamos também localmente como backup
    const localCoupons = getLocalCoupons();
    localCoupons[c.id] = c;
    persistLocalCoupons(localCoupons);
    
    return result.id;
  } catch (error) {
    console.error('Erro ao adicionar cupom:', error);
    // Mesmo em caso de erro, tentamos novamente a operação antes de falhar
    try {
      return await fetchAPI('', {
        method: 'POST',
        body: JSON.stringify(c),
      }).then(r => r.id);
    } catch (retryError) {
      console.error('Erro na segunda tentativa de adicionar cupom:', retryError);
      throw error; // Repassamos o erro original
    }
  }
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  try {
    const apiCoupons = await fetchAPI('');
    
    // Armazenamos os cupons recuperados da API localmente
    const localCouponDict: { [key: string]: Coupon } = {};
    apiCoupons.forEach((c: Coupon) => {
      localCouponDict[c.id] = c;
    });
    persistLocalCoupons(localCouponDict);
    
    return apiCoupons;
  } catch (error) {
    console.error('Erro ao buscar cupons da API, tentando novamente:', error);
    
    // Tentamos novamente antes de falhar
    try {
      return await fetchAPI('');
    } catch (retryError) {
      console.error('Erro na segunda tentativa de buscar cupons:', retryError);
      
      // Em caso de falha completa, retornamos os cupons salvos localmente
      console.warn('Usando cupons armazenados localmente como último recurso');
      const localCoupons = getLocalCoupons();
      return Object.values(localCoupons);
    }
  }
};

export const deleteCoupon = async (id: string): Promise<boolean> => {
  try {
    await fetchAPI(`/${id}`, {
      method: 'DELETE',
    });
    
    // Removemos também do armazenamento local
    const localCoupons = getLocalCoupons();
    delete localCoupons[id];
    persistLocalCoupons(localCoupons);
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar cupom, tentando novamente:', error);
    
    // Tentamos novamente antes de falhar
    try {
      await fetchAPI(`/${id}`, {
        method: 'DELETE',
      });
      
      const localCoupons = getLocalCoupons();
      delete localCoupons[id];
      persistLocalCoupons(localCoupons);
      
      return true;
    } catch (retryError) {
      console.error('Erro na segunda tentativa de deletar cupom:', retryError);
      throw error; // Repassamos o erro original
    }
  }
};

export const updateCoupon = async (c: Coupon): Promise<boolean> => {
  try {
    await fetchAPI(`/${c.id}`, {
      method: 'PUT',
      body: JSON.stringify(c),
    });
    
    // Atualizamos também no armazenamento local
    const localCoupons = getLocalCoupons();
    localCoupons[c.id] = c;
    persistLocalCoupons(localCoupons);
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar cupom, tentando novamente:', error);
    
    // Tentamos novamente antes de falhar
    try {
      await fetchAPI(`/${c.id}`, {
        method: 'PUT',
        body: JSON.stringify(c),
      });
      
      const localCoupons = getLocalCoupons();
      localCoupons[c.id] = c;
      persistLocalCoupons(localCoupons);
      
      return true;
    } catch (retryError) {
      console.error('Erro na segunda tentativa de atualizar cupom:', retryError);
      throw error; // Repassamos o erro original
    }
  }
};

export const verifyCoupon = async (code: string): Promise<{ 
  coupon: Coupon | null; 
  isValid: boolean; 
  reason?: string;
}> => {
  try {
    const result = await fetchAPI(`/verify/${code}`);
    return result;
  } catch (error) {
    console.error('Erro ao verificar cupom, tentando novamente:', error);
    
    // Tentamos novamente antes de falhar
    try {
      return await fetchAPI(`/verify/${code}`);
    } catch (retryError) {
      console.error('Erro na segunda tentativa de verificar cupom:', retryError);
      
      // Em caso de falha completa, verificamos nos cupons locais
      console.warn('Usando verificação local como último recurso');
      const localCoupons = getLocalCoupons();
      const coupon = Object.values(localCoupons).find(c => c.code.toLowerCase() === code.toLowerCase());
      
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
  }
};

export const incrementCouponUse = async (id: string): Promise<boolean> => {
  try {
    const result = await fetchAPI(`/${id}/use`, {
      method: 'PATCH',
    });
    
    // Atualizamos também no armazenamento local
    const localCoupons = getLocalCoupons();
    if (localCoupons[id]) {
      localCoupons[id].uses += 1;
      persistLocalCoupons(localCoupons);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao incrementar uso do cupom, tentando novamente:', error);
    
    // Tentamos novamente antes de falhar
    try {
      await fetchAPI(`/${id}/use`, {
        method: 'PATCH',
      });
      
      const localCoupons = getLocalCoupons();
      if (localCoupons[id]) {
        localCoupons[id].uses += 1;
        persistLocalCoupons(localCoupons);
      }
      
      return true;
    } catch (retryError) {
      console.error('Erro na segunda tentativa de incrementar uso do cupom:', retryError);
      throw error; // Repassamos o erro original
    }
  }
}; 
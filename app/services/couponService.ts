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
    const timestamp = new Date().getTime(); // Adicionando timestamp para evitar cache
    const url = `${API_URL}${endpoint}?_=${timestamp}`;
    console.log(`URL completa: ${url}`);
    
    // Definir um timeout para a requisição
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store',
      },
      ...options,
      signal: controller.signal,
    });
    
    // Limpar o timeout
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { error: errorText };
      }
      
      console.error(`Erro na API (${response.status}):`, errorDetails);
      const errorMsg = errorDetails.error || errorDetails.message || `Erro na API: ${response.status}`;
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    console.log(`Resposta API (${endpoint}):`, data);
    return data;
  } catch (error: any) { // Tipando o erro como any para acessar propriedades
    console.error(`Falha ao chamar API ${endpoint}:`, error);
    
    // Se for um erro de timeout, rede ou qualquer outro, usamos dados locais
    console.log('Usando dados locais como fallback');
    return useFallbackData(endpoint);
  }
};

// Função para usar dados locais como fallback
const useFallbackData = (endpoint: string) => {
  console.log(`Usando dados locais para ${endpoint}`);
  
  // Verificamos se estamos no navegador
  if (typeof window === 'undefined') {
    console.log('Não estamos no navegador, retornando dados vazios');
    return endpoint === '' ? [] : { success: true };
  }
  
  const localCoupons = getLocalCoupons();
  
  // Endpoint vazio - listagem de cupons
  if (endpoint === '') {
    return Object.values(localCoupons);
  }
  
  // Verificação de cupom
  if (endpoint.includes('verify/')) {
    const code = endpoint.split('verify/')[1];
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
  
  // Outros endpoints
  return { success: true };
};

// Função para persistir localmente no localStorage
const persistLocalCoupons = (coupons: { [key: string]: Coupon }) => {
  try {
    // Verificamos se estamos no navegador
    if (typeof window === 'undefined') {
      console.log('persistLocalCoupons: Não estamos no navegador, ignorando');
      return;
    }
    
    localStorage.setItem('orthosais_coupons', JSON.stringify(coupons));
  } catch (err) {
    console.error('Erro ao salvar cupons localmente:', err);
  }
};

// Função para recuperar cupons do localStorage
export const getLocalCoupons = (): { [key: string]: Coupon } => {
  try {
    // Verificamos se estamos no navegador
    if (typeof window === 'undefined') {
      console.log('getLocalCoupons: Não estamos no navegador, retornando objeto vazio');
      return {};
    }
    
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
    
    // Armazenamos também localmente
    const localCoupons = getLocalCoupons();
    localCoupons[c.id] = c;
    persistLocalCoupons(localCoupons);
    
    return result.id || c.id;
  } catch (error) {
    console.error('Erro ao adicionar cupom:', error);
    
    // Em caso de erro, salvamos apenas localmente
    const localCoupons = getLocalCoupons();
    localCoupons[c.id] = c;
    persistLocalCoupons(localCoupons);
    
    return c.id;
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
    console.error('Erro ao buscar cupons da API:', error);
    
    // Em caso de falha, retornamos os cupons salvos localmente
    console.warn('Usando cupons armazenados localmente');
    const localCoupons = getLocalCoupons();
    return Object.values(localCoupons);
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
    console.error('Erro ao deletar cupom:', error);
    
    // Em caso de erro, tentamos remover apenas localmente
    const localCoupons = getLocalCoupons();
    delete localCoupons[id];
    persistLocalCoupons(localCoupons);
    
    return true;
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
    console.error('Erro ao atualizar cupom:', error);
    
    // Em caso de erro, atualizamos apenas localmente
    const localCoupons = getLocalCoupons();
    localCoupons[c.id] = c;
    persistLocalCoupons(localCoupons);
    
    return true;
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
    console.error('Erro ao verificar cupom:', error);
    
    // Em caso de falha, verificamos nos cupons locais
    console.warn('Usando verificação local');
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
};

export const incrementCouponUse = async (id: string): Promise<boolean> => {
  try {
    await fetchAPI(`/${id}/use`, {
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
    console.error('Erro ao incrementar uso do cupom:', error);
    
    // Em caso de erro, incrementamos apenas localmente
    const localCoupons = getLocalCoupons();
    if (localCoupons[id]) {
      localCoupons[id].uses += 1;
      persistLocalCoupons(localCoupons);
    }
    
    return true;
  }
}; 
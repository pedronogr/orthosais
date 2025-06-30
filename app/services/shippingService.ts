// Serviço de Logística & Frete usando IndexedDB

import { MELHOR_ENVIO } from '../config/constants';

export interface Shipment {
  id: string; // order id or tracking id
  carrier: string;
  trackingCode: string;
  status: 'posted' | 'in_transit' | 'delivered' | 'delayed';
  slaDays: number; // prazo contratado
  createdAt: number;
  updatedAt: number;
}

export interface FreteRule {
  id: string;
  region: string; // ex: SP, RJ, Nordeste
  minWeight: number;
  maxWeight: number;
  price: number;
  carrier: string;
}

const DB_NAME = 'orthosais_db';
const SHIP_STORE = 'shipments';
const FRETE_STORE = 'freteRules';
const DB_VERSION = 5;

// API do Melhor Envio
const MELHOR_ENVIO_API_URL = MELHOR_ENVIO.SANDBOX 
  ? MELHOR_ENVIO.BASE_URL 
  : MELHOR_ENVIO.PRODUCTION_URL;

interface ShippingQuote {
  id: string;
  name: string;
  price: number;
  custom_price?: number;
  discount?: number;
  currency: string;
  delivery_time: number;
  company: {
    name: string;
    picture: string;
  };
}

interface ShippingCalculationRequest {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  products: {
    id: string;
    width: number;
    height: number;
    length: number;
    weight: number;
    insurance_value: number;
    quantity: number;
  }[];
}

// Credenciais do Melhor Envio (guarde em variáveis de ambiente em produção)
const MELHOR_ENVIO_CLIENT_ID = '6425';
const MELHOR_ENVIO_CLIENT_SECRET = '9p4sjO3I3t1jyMxIHjn7oFMfexJBpVF2fFtdh6fY';

// Importar função de autenticação do Melhor Envio
import { getAccessToken as getMelhorEnvioToken } from './melhorEnvioAuth';

// Função para obter token de acesso
async function getAccessToken(): Promise<string> {
  try {
    // Utiliza o serviço de autenticação do Melhor Envio
    return await getMelhorEnvioToken();
  } catch (error) {
    console.error('Erro ao obter token do Melhor Envio:', error);
    // Retorna um token de demonstração (isso não funciona em ambiente real)
    return 'DEMO_TOKEN_PARA_DESENVOLVIMENTO';
  }
}

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB não disponível neste ambiente'));
      return;
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(SHIP_STORE)) {
        const s = db.createObjectStore(SHIP_STORE, { keyPath: 'id' });
        s.createIndex('status', 'status', { unique: false });
        s.createIndex('carrier', 'carrier', { unique: false });
        s.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
      if (!db.objectStoreNames.contains(FRETE_STORE)) {
        const f = db.createObjectStore(FRETE_STORE, { keyPath: 'id' });
        f.createIndex('region', 'region', { unique: false });
        f.createIndex('carrier', 'carrier', { unique: false });
      }
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
  });
};

// CRUD Shipments
export const addShipment = async (s: Shipment): Promise<string> => {
  if (typeof window === 'undefined') {
    throw new Error('Função disponível apenas no cliente');
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([SHIP_STORE], 'readwrite');
    tx.objectStore(SHIP_STORE).add(s);
    tx.oncomplete = () => {
      db.close();
      res(s.id);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const getAllShipments = async (): Promise<Shipment[]> => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([SHIP_STORE], 'readonly');
    const req = tx.objectStore(SHIP_STORE).getAll();
    req.onsuccess = () => res(req.result as Shipment[]);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

export const updateShipment = async (s: Shipment): Promise<boolean> => {
  if (typeof window === 'undefined') {
    throw new Error('Função disponível apenas no cliente');
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([SHIP_STORE], 'readwrite');
    tx.objectStore(SHIP_STORE).put(s);
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const deleteShipment = async (id: string): Promise<boolean> => {
  if (typeof window === 'undefined') {
    throw new Error('Função disponível apenas no cliente');
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([SHIP_STORE], 'readwrite');
    tx.objectStore(SHIP_STORE).delete(id);
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

// CRUD Frete Rules
export const addFreteRule = async (r: FreteRule): Promise<string> => {
  if (typeof window === 'undefined') {
    throw new Error('Função disponível apenas no cliente');
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([FRETE_STORE], 'readwrite');
    tx.objectStore(FRETE_STORE).add(r);
    tx.oncomplete = () => {
      db.close();
      res(r.id);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const getAllFreteRules = async (): Promise<FreteRule[]> => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([FRETE_STORE], 'readonly');
    const req = tx.objectStore(FRETE_STORE).getAll();
    req.onsuccess = () => res(req.result as FreteRule[]);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

export const deleteFreteRule = async (id: string): Promise<boolean> => {
  if (typeof window === 'undefined') {
    throw new Error('Função disponível apenas no cliente');
  }
  
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([FRETE_STORE], 'readwrite');
    tx.objectStore(FRETE_STORE).delete(id);
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

// Função para calcular opções de frete
export async function calculateShipping(
  postalCodeOrigin: string,
  postalCodeDestination: string,
  products: any[]
): Promise<ShippingQuote[]> {
  try {
    const token = await getAccessToken();

    // Preparando dados para a API
    const data: ShippingCalculationRequest = {
      from: {
        postal_code: postalCodeOrigin
      },
      to: {
        postal_code: postalCodeDestination
      },
      products: products.map(product => ({
        id: product.id,
        width: product.width || 11,
        height: product.height || 4,
        length: product.length || 16,
        weight: product.weight || 0.3,
        insurance_value: product.price || 10.00,
        quantity: product.quantity || 1
      }))
    };

    // Fazendo a requisição para a API
    const response = await fetch(`${MELHOR_ENVIO_API_URL}/api/v2/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erro ao calcular frete: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao calcular opções de frete:', error);
    throw error;
  }
}

// Função para gerar etiqueta de frete
export async function generateShippingLabel(shippingData: any): Promise<any> {
  try {
    const token = await getAccessToken();
    
    const response = await fetch(`${MELHOR_ENVIO_API_URL}/api/v2/me/shipment/generate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(shippingData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao gerar etiqueta: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao gerar etiqueta de frete:', error);
    throw error;
  }
}

// Função para rastrear encomenda
export async function trackShipment(trackingCode: string): Promise<any> {
  try {
    const response = await fetch(`${MELHOR_ENVIO_API_URL}/api/v2/me/shipment/tracking`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: trackingCode })
    });

    if (!response.ok) {
      throw new Error(`Erro ao rastrear encomenda: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao rastrear encomenda:', error);
    throw error;
  }
} 
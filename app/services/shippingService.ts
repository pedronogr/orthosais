// Serviço de Logística & Frete usando IndexedDB

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

export interface ShippingOption {
  id: string;
  carrier: string;
  service: string;
  price: number;
  days: number;
}

const DB_NAME = 'orthosais_db';
const SHIP_STORE = 'shipments';
const FRETE_STORE = 'freteRules';
const DB_VERSION = 5;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
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

// Calcular frete baseado no CEP e peso
export const calculateShippingByCep = async (cep: string, weight: number): Promise<ShippingOption[]> => {
  try {
    // Obter o estado do CEP usando a API ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    const state = data.uf;
    
    // Buscar regras de frete do banco de dados
    const freteRules = await getAllFreteRules();
    
    // Se não houver regras no banco, usar valores padrão
    if (freteRules.length === 0) {
      return getDefaultShippingOptions(state, weight);
    }
    
    // Filtrar regras aplicáveis com base na região e peso
    const applicableRules = freteRules.filter(rule => {
      // Verificar se a regra se aplica ao estado ou região
      const isRegionMatch = 
        rule.region === state || 
        (rule.region === 'Sudeste' && ['SP', 'RJ', 'MG', 'ES'].includes(state)) ||
        (rule.region === 'Sul' && ['PR', 'SC', 'RS'].includes(state)) ||
        (rule.region === 'Nordeste' && ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'].includes(state)) ||
        (rule.region === 'Norte' && ['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'].includes(state)) ||
        (rule.region === 'Centro-Oeste' && ['MT', 'MS', 'GO', 'DF'].includes(state)) ||
        rule.region === 'Brasil';
      
      // Verificar se o peso está dentro dos limites
      const isWeightInRange = weight >= rule.minWeight && weight <= rule.maxWeight;
      
      return isRegionMatch && isWeightInRange;
    });
    
    // Se não houver regras aplicáveis, usar valores padrão
    if (applicableRules.length === 0) {
      return getDefaultShippingOptions(state, weight);
    }
    
    // Converter regras em opções de frete
    const options = applicableRules.map(rule => {
      // Calcular dias com base na distância (simulado)
      let days = 3; // Padrão
      
      if (['SP', 'RJ', 'MG'].includes(state)) {
        days = 2; // Sudeste mais rápido
      } else if (['AM', 'RR', 'AP', 'AC'].includes(state)) {
        days = 7; // Norte mais demorado
      }
      
      // Adicionar variação por transportadora
      if (rule.carrier === 'Expresso') {
        days = Math.max(1, days - 1);
      } else if (rule.carrier === 'Econômico') {
        days = days + 2;
      }
      
      return {
        id: `${rule.carrier}-${rule.id}`,
        carrier: rule.carrier,
        service: rule.carrier === 'Expresso' ? 'Entrega Rápida' : 'Entrega Padrão',
        price: rule.price,
        days
      };
    });
    
    // Ordenar por preço
    return options.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    // Retornar opções padrão em caso de erro
    return [
      {
        id: 'padrao-1',
        carrier: 'Transportadora Padrão',
        service: 'Entrega Padrão',
        price: 15.90,
        days: 5
      }
    ];
  }
};

// Função auxiliar para gerar opções de frete padrão
const getDefaultShippingOptions = (state: string, weight: number): ShippingOption[] => {
  // Preço base
  let basePrice = 15.90;
  
  // Ajustar com base no peso
  if (weight > 1) {
    basePrice += (weight - 1) * 5;
  }
  
  // Ajustar com base na região
  if (['SP', 'RJ', 'MG'].includes(state)) {
    basePrice *= 0.9; // 10% mais barato para Sudeste
  } else if (['AM', 'RR', 'AP', 'AC'].includes(state)) {
    basePrice *= 1.5; // 50% mais caro para Norte distante
  }
  
  // Calcular dias com base na região
  let standardDays = 3;
  let expressDays = 1;
  
  if (['SP', 'RJ', 'MG'].includes(state)) {
    standardDays = 2;
    expressDays = 1;
  } else if (['PR', 'SC', 'RS', 'ES', 'GO', 'DF'].includes(state)) {
    standardDays = 3;
    expressDays = 2;
  } else if (['AM', 'RR', 'AP', 'AC'].includes(state)) {
    standardDays = 7;
    expressDays = 4;
  } else {
    standardDays = 5;
    expressDays = 3;
  }
  
  return [
    {
      id: 'expresso-1',
      carrier: 'Transportadora Expressa',
      service: 'Entrega Expressa',
      price: basePrice * 1.8, // 80% mais caro para entrega expressa
      days: expressDays
    },
    {
      id: 'padrao-1',
      carrier: 'Transportadora Padrão',
      service: 'Entrega Padrão',
      price: basePrice,
      days: standardDays
    },
    {
      id: 'economico-1',
      carrier: 'Transportadora Econômica',
      service: 'Entrega Econômica',
      price: basePrice * 0.8, // 20% mais barato para entrega econômica
      days: standardDays + 3
    }
  ];
}; 
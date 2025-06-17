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
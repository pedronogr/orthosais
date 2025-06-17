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

const DB_NAME = 'orthosais_db';
const STORE_NAME = 'coupons';
const DB_VERSION = 5;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const s = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        s.createIndex('code', 'code', { unique: true });
        s.createIndex('expiresAt', 'expiresAt', { unique: false });
      }
    };
    req.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      // Se por algum motivo a store ainda não existe (primer uso após serviços anteriores), faz upgrade manual
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const newVersion = db.version + 1;
        db.close();
        const req2 = indexedDB.open(DB_NAME, newVersion);
        req2.onupgradeneeded = (ev) => {
          const db2 = (ev.target as IDBOpenDBRequest).result;
          if (!db2.objectStoreNames.contains(STORE_NAME)) {
            const s = db2.createObjectStore(STORE_NAME, { keyPath: 'id' });
            s.createIndex('code', 'code', { unique: true });
            s.createIndex('expiresAt', 'expiresAt', { unique: false });
          }
        };
        req2.onsuccess = (ev) => res((ev.target as IDBOpenDBRequest).result);
        req2.onerror = (ev) => rej((ev.target as IDBRequest).error);
      } else {
        res(db);
      }
    };
  });
};

export const addCoupon = async (c: Coupon): Promise<string> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    tx.objectStore(STORE_NAME).add(c);
    tx.oncomplete = () => {
      db.close();
      res(c.id);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => res(req.result as Coupon[]);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

export const deleteCoupon = async (id: string): Promise<boolean> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const updateCoupon = async (c: Coupon): Promise<boolean> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    tx.objectStore(STORE_NAME).put(c);
    tx.oncomplete = () => { db.close(); res(true); };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
}; 
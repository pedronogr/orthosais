// Serviço de Pagamentos & Repasses

export interface Transaction {
  id: string; // código do pagamento/pedido
  orderId: string;
  amount: number;
  method: 'pix' | 'boleto' | 'cartao';
  status: 'pending' | 'paid' | 'refunded' | 'chargeback';
  createdAt: number;
}

const DB_NAME = 'orthosais_db';
const STORE_NAME = 'transactions';
const DB_VERSION = 5;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const s = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        s.createIndex('status', 'status', { unique: false });
        s.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    req.onsuccess = (e) => res((e.target as IDBOpenDBRequest).result);
  });
};

export const addTransaction = async (t: Transaction): Promise<string> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    tx.objectStore(STORE_NAME).add(t);
    tx.oncomplete = () => {
      db.close();
      res(t.id);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => res(req.result as Transaction[]);
    req.onerror = (e) => rej((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

export const updateTransaction = async (t: Transaction): Promise<boolean> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    tx.objectStore(STORE_NAME).put(t);
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
};

// Ações específicas
export const refundTransaction = async (id: string): Promise<boolean> => {
  const db = await initDB();
  return new Promise((res, rej) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => {
      const t = req.result as Transaction;
      if (!t) {
        res(false);
        return;
      }
      t.status = 'refunded';
      store.put(t);
    };
    tx.oncomplete = () => {
      db.close();
      res(true);
    };
    tx.onerror = (e) => rej((e.target as IDBRequest).error);
  });
}; 
// Serviço para gerenciar usuários usando IndexedDB

export interface User {
  id: string; // UUID
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'manager' | 'seller' | 'customer';
  status: 'active' | 'blocked';
  kycVerified: boolean;
  createdAt: number;
}

const DB_NAME = 'orthosais_db';
const STORE_NAME = 'usuarios';
const DB_VERSION = 5; // incremento de versão para criar store de usuários

// Inicializar/abrir banco
export const initUserDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.error('IndexedDB não suportado. Usuários não serão persistidos.');
      reject('IndexedDB não suportado');
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (evt) => {
      reject((evt.target as IDBRequest).error);
    };

    request.onupgradeneeded = (evt) => {
      const db = (evt.target as IDBOpenDBRequest).result;

      // Se a store ainda não existir, cria
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('email', 'email', { unique: true });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('role', 'role', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Garantir que a store de produtos também exista quando o DB for criado do zero
      if (!db.objectStoreNames.contains('produtos')) {
        const productStore = db.createObjectStore('produtos', { keyPath: 'id' });
        productStore.createIndex('category', 'category', { unique: false });
        productStore.createIndex('status', 'status', { unique: false });
        productStore.createIndex('destaque', 'destaque', { unique: false });
        productStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = (evt) => {
      resolve((evt.target as IDBOpenDBRequest).result);
    };
  });
};

// Adicionar usuário
export const addUser = async (user: Omit<User, 'createdAt'>): Promise<string> => {
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const userWithDate: User = { ...user, createdAt: Date.now() } as User;
    const req = store.add(userWithDate);
    req.onsuccess = () => resolve(userWithDate.id);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Buscar todos usuários
export const getAllUsers = async (): Promise<User[]> => {
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result as User[]);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Buscar por ID
export const getUserById = async (id: string): Promise<User | null> => {
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Atualizar usuário
export const updateUser = async (user: User): Promise<boolean> => {
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(user);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Deletar usuário
export const deleteUser = async (id: string): Promise<boolean> => {
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Bloquear / Desbloquear
export const toggleBlockUser = async (id: string): Promise<boolean> => {
  const user = await getUserById(id);
  if (!user) return false;
  const newStatus = user.status === 'active' ? 'blocked' : 'active';
  return updateUser({ ...user, status: newStatus });
};

// Reset de senha (placeholder)
export const resetUserPassword = async (id: string): Promise<boolean> => {
  // Em um sistema real, dispararia e-mail ou integração externa.
  console.log(`Senha do usuário ${id} resetada (simulado)`);
  return true;
}; 
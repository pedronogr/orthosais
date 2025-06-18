// Serviço para gerenciar usuários usando IndexedDB e Netlify Functions

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

// Função para obter o token de autenticação
const getAuthToken = (): string | null => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter token de autenticação:', error);
    return null;
  }
};

// Adicionar usuário
export const addUser = async (user: Omit<User, 'createdAt'>): Promise<string> => {
  try {
    // Tentar adicionar usuário via Netlify Function
    const authToken = getAuthToken();
    if (authToken) {
      const response = await fetch('/.netlify/functions/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'addUser',
          user: {
            ...user,
            created_at: new Date().toISOString()
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        return result.user.id;
      }
    }
  } catch (error) {
    console.error('Erro ao adicionar usuário via API, usando IndexedDB como fallback:', error);
  }

  // Fallback para IndexedDB
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

// Obter todos os usuários
export const getAllUsers = async (): Promise<User[]> => {
  try {
    // Tentar obter usuários via Netlify Function
    const authToken = getAuthToken();
    if (authToken) {
      const response = await fetch('/.netlify/functions/users', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (!result.isLocalData) {
          return result.users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role || 'customer',
            status: user.status || 'active',
            kycVerified: user.kyc_verified || false,
            createdAt: new Date(user.created_at).getTime()
          }));
        }
      }
    }
  } catch (error) {
    console.error('Erro ao obter usuários via API, usando IndexedDB como fallback:', error);
  }

  // Fallback para IndexedDB
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
};

// Obter usuário por ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    // Tentar obter usuário via Netlify Function
    const authToken = getAuthToken();
    if (authToken) {
      const response = await fetch(`/.netlify/functions/users?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.user && !result.isLocalData) {
          const user = result.user;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role || 'customer',
            status: user.status || 'active',
            kycVerified: user.kyc_verified || false,
            createdAt: new Date(user.created_at).getTime()
          };
        }
      }
    }
  } catch (error) {
    console.error('Erro ao obter usuário via API, usando IndexedDB como fallback:', error);
  }

  // Fallback para IndexedDB
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
  try {
    // Tentar atualizar usuário via Netlify Function
    const authToken = getAuthToken();
    if (authToken) {
      const response = await fetch('/.netlify/functions/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'updateUser',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            kyc_verified: user.kycVerified
          }
        })
      });

      if (response.ok) {
        return true;
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário via API, usando IndexedDB como fallback:', error);
  }

  // Fallback para IndexedDB
  const db = await initUserDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(user);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => {
      console.error('Erro ao atualizar usuário no IndexedDB:', e);
      reject((e.target as IDBRequest).error);
    };
    tx.oncomplete = () => db.close();
  });
};

// Excluir usuário
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    // Tentar excluir usuário via Netlify Function
    const authToken = getAuthToken();
    if (authToken) {
      const response = await fetch('/.netlify/functions/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'deleteUser',
          id
        })
      });

      if (response.ok) {
        return true;
      }
    }
  } catch (error) {
    console.error('Erro ao excluir usuário via API, usando IndexedDB como fallback:', error);
  }

  // Fallback para IndexedDB
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

// Alternar bloqueio de usuário
export const toggleBlockUser = async (id: string): Promise<boolean> => {
  try {
    const user = await getUserById(id);
    if (!user) return false;
    
    user.status = user.status === 'active' ? 'blocked' : 'active';
    return await updateUser(user);
  } catch (error) {
    console.error('Erro ao alternar bloqueio do usuário:', error);
    return false;
  }
};

// Reset de senha (placeholder)
export const resetUserPassword = async (id: string): Promise<boolean> => {
  // Em um sistema real, dispararia e-mail ou integração externa.
  console.log(`Senha do usuário ${id} resetada (simulado)`);
  return true;
}; 
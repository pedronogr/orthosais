// Serviço para gerenciar produtos usando IndexedDB para persistência
// Isso garante que os dados não sejam perdidos entre recarregamentos ou reinicializações do servidor

// Interface para o produto
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  oldPrice?: number;
  status?: string;
  estoque?: number;
  destaque?: boolean;
  createdAt?: number;
}

// Nome do banco de dados e da store
const DB_NAME = 'orthosais_db';
const STORE_NAME = 'produtos';
const DB_VERSION = 5;

// Função para inicializar o banco de dados
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // Verificar se IndexedDB está disponível
    if (!window.indexedDB) {
      console.error("Seu navegador não suporta IndexedDB. Os produtos não serão persistidos.");
      reject("IndexedDB não suportado");
      return;
    }

    // Abrir ou criar o banco de dados
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    // Lidar com erros
    request.onerror = (event) => {
      console.error("Erro ao abrir o banco de dados:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };

    // Configurar o banco de dados quando for criado ou atualizado
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Criar object store para produtos se não existir
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        
        // Criar índices para busca rápida
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('destaque', 'destaque', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        
        console.log("Object store de produtos criada com sucesso");
      }

      // Garantir que store de usuários exista
      if (!db.objectStoreNames.contains('usuarios')) {
        const userStore = db.createObjectStore('usuarios', { keyPath: 'id' });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('status', 'status', { unique: false });
        userStore.createIndex('role', 'role', { unique: false });
        userStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    // Sucesso ao abrir o banco de dados
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("Banco de dados aberto com sucesso");
      resolve(db);
    };
  });
};

// Função para adicionar um produto
export const addProduct = async (product: Product): Promise<string> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      // Adicionar timestamp de criação
      const productWithTimestamp = {
        ...product,
        createdAt: Date.now()
      };
      
      // Iniciar transação
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Adicionar produto
      const request = store.add(productWithTimestamp);
      
      request.onsuccess = () => {
        console.log(`Produto ${product.id} adicionado com sucesso`);
        resolve(product.id);
      };
      
      request.onerror = (event) => {
        console.error("Erro ao adicionar produto:", (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      // Fechar a conexão quando a transação for concluída
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};

// Função para obter todos os produtos
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        console.error("Erro ao obter produtos:", (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    // Se houver erro, retornar array vazio
    return [];
  }
};

// Função para obter um produto pelo ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = (event) => {
        console.error(`Erro ao obter produto ${id}:`, (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(`Erro ao obter produto ${id}:`, error);
    return null;
  }
};

// Função para atualizar um produto
export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(product);
      
      request.onsuccess = () => {
        console.log(`Produto ${product.id} atualizado com sucesso`);
        resolve(true);
      };
      
      request.onerror = (event) => {
        console.error(`Erro ao atualizar produto ${product.id}:`, (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(`Erro ao atualizar produto:`, error);
    return false;
  }
};

// Função para excluir um produto
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        console.log(`Produto ${id} excluído com sucesso`);
        resolve(true);
      };
      
      request.onerror = (event) => {
        console.error(`Erro ao excluir produto ${id}:`, (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(`Erro ao excluir produto:`, error);
    return false;
  }
};

// Função para obter produtos por categoria
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('category');
      const request = index.getAll(category);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        console.error(`Erro ao obter produtos da categoria ${category}:`, (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(`Erro ao obter produtos por categoria:`, error);
    return [];
  }
};

// Função para obter produtos ativos
export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('status');
      const request = index.getAll('ativo');
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        console.error("Erro ao obter produtos ativos:", (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Erro ao obter produtos ativos:", error);
    return [];
  }
};

// Função para migrar dados do localStorage para IndexedDB (para compatibilidade)
export const migrateFromLocalStorage = async (): Promise<boolean> => {
  try {
    // Verificar se há dados no localStorage
    const storedProducts = localStorage.getItem('produtos_site');
    
    if (!storedProducts) {
      return true; // Não há dados para migrar
    }
    
    // Parsear os produtos
    const products: Product[] = JSON.parse(storedProducts);
    
    // Adicionar cada produto ao IndexedDB
    for (const product of products) {
      await addProduct(product);
    }
    
    // Limpar localStorage após migração bem-sucedida
    localStorage.removeItem('produtos_site');
    
    console.log("Migração de produtos do localStorage para IndexedDB concluída com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao migrar produtos do localStorage:", error);
    return false;
  }
}; 
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipo para os itens do carrinho
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc?: string;
}

// Tipo para o usuário
export interface User {
  id: string;
  name: string;
  email: string;
}

// Tipo para o contexto da aplicação
interface AppContextType {
  // Autenticação
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Carrinho
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

// Criando o contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  // Estado para autenticação
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para o carrinho
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    // Carregar usuário
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
    
    // Carregar carrinho
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Erro ao carregar dados do carrinho:', error);
      }
    }
  }, []);
  
  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Funções de autenticação
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validação de credenciais específicas
      // Apenas estas credenciais serão aceitas
      if (email === 'pedro@admin.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Pedro Admin',
          email: email
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      // Usuário comum para teste
      if (email === 'cliente@teste.com' && password === 'cliente123') {
        const userData = {
          id: '2',
          name: 'Cliente Teste',
          email: email
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Em um cenário real, aqui faria uma chamada à API
      if (name && email && password) {
        const userData = {
          id: Date.now().toString(),
          name: name,
          email: email
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  // Funções do carrinho
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      // Verificar se o produto já está no carrinho
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Atualizar a quantidade se já existir
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Adicionar novo item se não existir
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    // Não abrir mais o carrinho lateral automaticamente
    // setIsCartOpen(true);
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcular quantidade total de itens
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Alternar visibilidade do carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const value = {
    // Autenticação
    user,
    isAuthenticated,
    login,
    register,
    logout,
    
    // Carrinho
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
    isCartOpen,
    toggleCart
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}; 
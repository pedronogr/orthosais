"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

export default function HeaderActions() {
  const { user, isAuthenticated, logout, cartItemsCount } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  
  // Verificar se o usuário é administrador
  const isAdmin = isAuthenticated && user?.email === 'pedro@admin.com';
  
  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const goToCart = () => {
    router.push('/carrinho');
  };
  
  return (
    <div className="flex items-center space-x-4">
      {/* Botão de Admin - visível apenas para administradores */}
      {isAdmin && (
        <Link 
          href="/admin" 
          className="bg-secondary hover:bg-secondary-dark text-white text-sm font-medium px-3 py-1 rounded-md transition-colors"
        >
          Dashboard Admin
        </Link>
      )}
      
      {/* Carrinho */}
      <button 
        onClick={goToCart}
        className="text-gray-600 hover:text-primary relative"
        aria-label="Carrinho de compras"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItemsCount}
          </span>
        )}
      </button>
      
      {/* Usuário (Login/Cadastro ou Menu do Usuário) */}
      {isAuthenticated ? (
        <div className="relative">
          <button 
            onClick={toggleUserMenu}
            className="flex items-center space-x-1 text-gray-700 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden md:inline text-sm font-medium">
              {user?.name.split(' ')[0]}
            </span>
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link 
                href="/minha-conta"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Minha Conta
              </Link>
              <Link 
                href="/meus-pedidos"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Meus Pedidos
              </Link>
              {isAdmin && (
                <Link 
                  href="/admin"
                  className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Painel Administrativo
                </Link>
              )}
              <button 
                onClick={() => {
                  logout();
                  setUserMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={handleAuthClick}
          className="flex items-center space-x-1 text-gray-700 hover:text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="hidden md:inline text-sm font-medium">
            Entrar
          </span>
        </button>
      )}
      
      {/* Modal de Autenticação */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
} 
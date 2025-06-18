"use client";

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAppContext();
  
  if (!isOpen) return null;
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    if (!email || !password) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }
    
    try {
      const success = await register(name, email, password);
      if (success) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('Cadastro realizado com sucesso! Por favor, use as credenciais de teste para fazer login.');
        setActiveTab('login');
      } else {
        setError('Este email já está cadastrado ou não foi possível criar a conta');
      }
    } catch (err) {
      setError('Ocorreu um erro ao criar a conta');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md">
        {/* Header */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('login');
              setError('');
              setSuccessMessage('');
            }}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('register');
              setError('');
              setSuccessMessage('');
            }}
          >
            Cadastro
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 text-sm">
              {successMessage}
            </div>
          )}
          
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="********"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition disabled:opacity-70"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-sm text-primary hover:underline"
                >
                  Não tem uma conta? Cadastre-se
                </button>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 text-blue-700 text-xs rounded-md">
                <p className="font-semibold mb-1">Credenciais para teste:</p>
                <p>Admin: pedro@admin.com / admin123</p>
                <p>Cliente: cliente@teste.com / cliente123</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Seu nome"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="********"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="********"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition disabled:opacity-70"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-sm text-primary hover:underline"
                >
                  Já tem uma conta? Faça login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
} 
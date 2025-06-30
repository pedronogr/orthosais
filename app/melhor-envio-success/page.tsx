'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MelhorEnvioSuccessPage() {
  useEffect(() => {
    // Aqui poderíamos fazer alguma integração adicional
    // Por exemplo, atualizar algum estado da aplicação
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-16 container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Integração Concluída!</h1>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">
            A integração com o Melhor Envio foi realizada com sucesso. Agora você pode utilizar os serviços de envio em seu carrinho.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link 
              href="/produtos" 
              className="w-full py-2 bg-amber-600 text-white rounded-md text-center font-medium hover:bg-amber-700 transition-colors"
            >
              Ver Produtos
            </Link>
            
            <Link 
              href="/carrinho" 
              className="w-full py-2 border border-amber-600 text-amber-600 rounded-md text-center font-medium hover:bg-amber-50 transition-colors"
            >
              Ir para o Carrinho
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
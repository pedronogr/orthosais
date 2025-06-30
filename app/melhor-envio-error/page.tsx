'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAuthorizationUrl } from '../services/melhorEnvioAuth';

// Indicar ao Next.js para renderizar esta página apenas no cliente
export const dynamic = 'force-dynamic';
// Isso desativa o prerender estático para esta rota
export const dynamicParams = true;

// Componente de fallback enquanto o conteúdo carrega
const ErrorContentLoading = () => {
  return (
    <div className="py-16 container mx-auto px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
        <p className="text-center text-gray-600">Carregando informações...</p>
      </div>
    </div>
  );
};

// Componente separado que usa o hook useSearchParams
const ErrorContent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error') || 'Erro desconhecido na integração com o Melhor Envio';
  const authUrl = getAuthorizationUrl();
  
  return (
    <div className="py-16 container mx-auto px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Erro na Integração</h1>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-700 text-sm">
            {errorMessage}
          </p>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          Ocorreu um erro durante a integração com o Melhor Envio. 
          Você pode tentar novamente ou entrar em contato com o suporte.
        </p>
        
        <div className="flex flex-col space-y-3">
          <a 
            href={authUrl}
            className="w-full py-2 bg-amber-600 text-white rounded-md text-center font-medium hover:bg-amber-700 transition-colors"
          >
            Tentar Novamente
          </a>
          
          <Link 
            href="/"
            className="w-full py-2 border border-gray-300 text-gray-600 rounded-md text-center font-medium hover:bg-gray-50 transition-colors"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Componente principal da página
export default function MelhorEnvioErrorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<ErrorContentLoading />}>
        <ErrorContent />
      </Suspense>
      <Footer />
    </main>
  );
} 
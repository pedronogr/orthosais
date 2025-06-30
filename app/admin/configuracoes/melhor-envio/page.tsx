'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { getAuthorizationUrl, hasValidToken, clearTokens } from '../../../services/melhorEnvioAuth';

// Indicar ao Next.js para renderizar esta página apenas no cliente
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Componente de loading
const ConfigLoading = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
    </div>
  );
};

// Componente principal de configuração
const ConfigContent = () => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [origin, setOrigin] = useState<string>('');
  
  useEffect(() => {
    // Verificar se já temos um token válido
    const checkToken = async () => {
      const hasToken = hasValidToken();
      setIsAuthorized(hasToken);
      setAuthUrl(getAuthorizationUrl());
      
      if (typeof window !== 'undefined') {
        setOrigin(window.location.origin);
      }
      
      setLoading(false);
    };
    
    checkToken();
  }, []);
  
  const handleRevokeAccess = () => {
    clearTokens();
    setIsAuthorized(false);
  };
  
  const handleCopyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${origin}/api/melhor-envio/callback`);
    }
  };
  
  if (loading) {
    return <ConfigLoading />;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuração do Melhor Envio</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Status da Integração</h2>
        
        <div className={`rounded-md p-4 mb-6 ${isAuthorized ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${isAuthorized ? 'bg-green-100' : 'bg-gray-100'}`}>
              {isAuthorized ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${isAuthorized ? 'text-green-800' : 'text-gray-800'}`}>
                {isAuthorized ? 'Integração Ativa' : 'Integração Não Configurada'}
              </h3>
              <div className="mt-1 text-sm">
                <p className={isAuthorized ? 'text-green-700' : 'text-gray-600'}>
                  {isAuthorized 
                    ? 'Sua loja está integrada ao Melhor Envio. Você pode calcular fretes e gerar etiquetas.'
                    : 'Você precisa autorizar a integração com o Melhor Envio para calcular fretes e gerar etiquetas.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {!isAuthorized ? (
          <div>
            <p className="text-gray-600 mb-4">
              Para integrar com o Melhor Envio, você precisa autorizar nossa aplicação a acessar sua conta.
              Clique no botão abaixo para iniciar o processo.
            </p>
            
            <a 
              href={authUrl}
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
            >
              Autorizar Melhor Envio
            </a>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Sua integração com o Melhor Envio está ativa. Você pode revogar o acesso a qualquer momento.
            </p>
            
            <button 
              onClick={handleRevokeAccess}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Revogar Acesso
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Informações de Configuração</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">URL de Redirecionamento</h3>
            <div className="mt-1 flex items-center">
              <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-grow">
                {origin ? `${origin}/api/melhor-envio/callback` : 'Carregando...'}
              </code>
              <button
                onClick={handleCopyUrl}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                title="Copiar URL"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Use esta URL para configurar o redirecionamento OAuth no painel do Melhor Envio.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700">Client ID</h3>
            <p className="mt-1 text-sm bg-gray-100 px-3 py-2 rounded">6425</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700">Client Secret</h3>
            <p className="mt-1 text-sm bg-gray-100 px-3 py-2 rounded">••••••••••••••••••••••••••••••</p>
            <p className="mt-1 text-xs text-gray-500">
              Por segurança, não exibimos o Client Secret completo.
            </p>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-600">
              <strong>Nota:</strong> Em um ambiente de produção, as credenciais do Melhor Envio devem ser armazenadas
              em variáveis de ambiente seguras e não diretamente no código.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página principal
export default function MelhorEnvioConfigPage() {
  return (
    <Suspense fallback={<ConfigLoading />}>
      <ConfigContent />
    </Suspense>
  );
} 
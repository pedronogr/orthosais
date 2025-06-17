"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Sempre obrigatório
    analytics: true,
    marketing: true,
    functional: true
  });
  
  useEffect(() => {
    // Verifica se o usuário já deu consentimento
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);
  
  const handleAcceptAll = () => {
    // Salva consentimento com todas as opções
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }));
    setShowBanner(false);
  };
  
  const handleAcceptSelected = () => {
    // Salva consentimento apenas com as opções selecionadas
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowBanner(false);
  };
  
  const handlePreferenceChange = (cookieType: 'essential' | 'analytics' | 'marketing' | 'functional') => {
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      {!showPreferences ? (
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sua privacidade é importante</h3>
              <p className="text-gray-600 text-sm">
                Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                Ao clicar em "Aceitar todos", você concorda com o nosso uso de cookies conforme descrito em nossa{' '}
                <Link href="/politica-de-cookies" className="text-primary underline">
                  Política de Cookies
                </Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Personalizar
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-medium"
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Configurações de Cookies</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-gray-700">Cookies Essenciais</p>
                <p className="text-sm text-gray-500">Necessários para o funcionamento básico do site. Não podem ser desativados.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={true} 
                  disabled 
                  className="w-10 h-5 bg-gray-300 rounded-full appearance-none cursor-not-allowed checked:bg-gray-400"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-gray-700">Cookies Analíticos</p>
                <p className="text-sm text-gray-500">Nos ajudam a entender como os visitantes interagem com o site.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.analytics} 
                  onChange={() => handlePreferenceChange('analytics')}
                  className="w-10 h-5 bg-gray-300 rounded-full appearance-none cursor-pointer transition-colors duration-200 focus:outline-none checked:bg-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-gray-700">Cookies de Marketing</p>
                <p className="text-sm text-gray-500">Usados para rastrear visitantes em sites e exibir anúncios relevantes.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.marketing} 
                  onChange={() => handlePreferenceChange('marketing')}
                  className="w-10 h-5 bg-gray-300 rounded-full appearance-none cursor-pointer transition-colors duration-200 focus:outline-none checked:bg-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-gray-700">Cookies Funcionais</p>
                <p className="text-sm text-gray-500">Permitem recursos avançados e personalização.</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.functional} 
                  onChange={() => handlePreferenceChange('functional')}
                  className="w-10 h-5 bg-gray-300 rounded-full appearance-none cursor-pointer transition-colors duration-200 focus:outline-none checked:bg-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowPreferences(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
            >
              Voltar
            </button>
            <button
              onClick={handleAcceptSelected}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-medium"
            >
              Salvar preferências
            </button>
          </div>
          
          <p className="mt-4 text-xs text-gray-500">
            Para mais informações sobre como utilizamos cookies, visite nossa{' '}
            <Link href="/politica-de-cookies" className="text-primary underline">
              Política de Cookies
            </Link>.
          </p>
        </div>
      )}
    </div>
  );
} 
"use client";

import React from 'react';
import Link from 'next/link';

export default function ConfiguracoesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/configuracoes/fretes" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-4 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Configurações de Frete</h2>
            </div>
            <p className="text-gray-600">
              Configure regras de frete por região, peso e transportadora para cálculo automático.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/configuracoes/pagamentos" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Métodos de Pagamento</h2>
            </div>
            <p className="text-gray-600">
              Gerencie os métodos de pagamento disponíveis e suas configurações.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/configuracoes/emails" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Modelos de Email</h2>
            </div>
            <p className="text-gray-600">
              Configure os modelos de email para notificações e comunicações.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/configuracoes/seo" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">SEO & Metadados</h2>
            </div>
            <p className="text-gray-600">
              Configurações de SEO, metadados e tags para melhorar o ranqueamento.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/configuracoes/integracao" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Integrações</h2>
            </div>
            <p className="text-gray-600">
              Configure integrações com serviços externos e APIs.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/configuracoes/sistema" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Configurações do Sistema</h2>
            </div>
            <p className="text-gray-600">
              Configurações gerais do sistema, backup e manutenção.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
} 
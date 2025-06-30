"use client";

import React from 'react';
import Link from 'next/link';

export default function LogisticaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestão de Logística</h1>
      
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
        
        <Link href="/admin/logistica/rastreamento" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Rastreamento de Pedidos</h2>
            </div>
            <p className="text-gray-600">
              Acompanhe o status de entrega dos pedidos e gerencie rastreamentos.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/logistica/transportadoras" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Transportadoras</h2>
            </div>
            <p className="text-gray-600">
              Gerencie transportadoras parceiras e seus serviços.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/logistica/etiquetas" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Etiquetas de Envio</h2>
            </div>
            <p className="text-gray-600">
              Gere e imprima etiquetas de envio para pedidos.
            </p>
          </div>
        </Link>
        
        <Link href="/admin/logistica/relatorios" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold ml-4">Relatórios</h2>
            </div>
            <p className="text-gray-600">
              Visualize relatórios de desempenho logístico e custos.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
} 
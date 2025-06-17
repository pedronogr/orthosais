import React from 'react';
import Link from 'next/link';

export default function ProductInfo() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Informações Importantes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Qualidade */}
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <svg 
                  className="w-8 h-8 text-primary mr-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
                <h3 className="text-xl font-bold text-primary">Qualidade Garantida</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Todos os nossos produtos são desenvolvidos seguindo rigorosos padrões de qualidade 
                e passam por testes extensivos para garantir sua eficácia e segurança.
              </p>
              <p className="text-gray-700">
                Utilizamos matérias-primas de alta qualidade e processos de fabricação que atendem 
                às exigências das principais normas e regulamentações do setor farmacêutico.
              </p>
            </div>
            
            {/* Como Adquirir */}
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <svg 
                  className="w-8 h-8 text-secondary mr-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                <h3 className="text-xl font-bold text-secondary">Como Adquirir</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Os produtos da Orthosais Farma podem ser encontrados em farmácias e drogarias 
                selecionadas em todo o Brasil.
              </p>
              <p className="text-gray-700 mb-6">
                Para mais informações sobre pontos de venda ou para realizar pedidos diretamente, 
                entre em contato com nossa equipe comercial.
              </p>
              <Link 
                href="/contato" 
                className="inline-flex items-center bg-secondary text-white px-6 py-2 rounded-md font-medium hover:bg-secondary-hover transition-colors duration-300"
              >
                FALE COM NOSSA EQUIPE
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Componente separado para usar o hook dentro do Suspense
function ProdutosContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODOS');
  
  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);
  
  const products = [
    {
      name: "OrthoVit Complex",
      description: "Suplemento vitamínico com fórmula exclusiva para proteção e fortalecimento do sistema imunológico.",
      price: 39.90,
      imageSrc: "/images/product1.svg",
      category: "Linha Proteção"
    },
    {
      name: "OrthoProtect Plus",
      description: "Cápsulas de proteção avançada com combinação de ingredientes naturais para promover saúde e bem-estar.",
      price: 45.90,
      imageSrc: "/images/product2.svg",
      category: "Linha Proteção"
    },
    {
      name: "OrthoDefense 30 cápsulas",
      description: "Suplemento com probióticos e prebióticos que auxiliam na proteção da flora intestinal e fortalecimento das defesas naturais.",
      price: 32.50,
      imageSrc: "/images/product3.svg",
      category: "Linha Vida"
    },
    {
      name: "OrthoVital Cálcio",
      description: "Suplemento de cálcio com vitamina D para fortalecimento dos ossos e prevenção da osteoporose.",
      price: 28.90,
      imageSrc: "/images/product1.svg",
      category: "Linha Saúde"
    },
    {
      name: "OrthoImmune Zinco",
      description: "Suplemento de zinco para fortalecimento do sistema imunológico e proteção contra infecções.",
      price: 24.50,
      imageSrc: "/images/product2.svg",
      category: "Linha Proteção"
    },
    {
      name: "OrthoSleep Melatonina",
      description: "Suplemento de melatonina para auxiliar no sono e combater a insônia.",
      price: 35.90,
      imageSrc: "/images/product3.svg",
      category: "Linha Vida"
    },
    {
      name: "OrthoOmega 3",
      description: "Suplemento de ômega 3 para saúde cardiovascular e cerebral.",
      price: 42.90,
      imageSrc: "/images/product1.svg",
      category: "Linha Saúde"
    },
    {
      name: "OrthoCollagen Premium",
      description: "Colágeno hidrolisado com vitamina C para saúde da pele, cabelos e articulações.",
      price: 56.90,
      imageSrc: "/images/product2.svg",
      category: "Linha Especializada"
    },
    {
      name: "OrthoDetox Plus",
      description: "Suplemento detox com ingredientes naturais para auxiliar na eliminação de toxinas do organismo.",
      price: 38.50,
      imageSrc: "/images/product3.svg",
      category: "Linha Especializada"
    }
  ];

  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const normalizeText = (text: string) => {
      return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '');
    };
    
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedName = normalizeText(product.name);
    const normalizedDescription = normalizeText(product.description);
    const normalizedCategory = normalizeText(product.category);
    
    const matchesSearch = normalizedSearch === '' || 
                          normalizedName.includes(normalizedSearch) || 
                          normalizedDescription.includes(normalizedSearch) ||
                          normalizedCategory.includes(normalizedSearch);
                          
    const matchesCategory = activeCategory === 'TODOS' || product.category.toUpperCase() === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Nossos Produtos</h1>
            {queryParam ? (
              <p className="text-lg mb-6">
                Resultados da busca para: <span className="font-semibold">"{queryParam}"</span>
              </p>
            ) : (
              <p className="text-lg mb-6">
                Conheça nossa linha completa de produtos farmacêuticos de alta qualidade, 
                desenvolvidos para proteção e promoção da saúde.
              </p>
            )}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-800"
              />
              <svg 
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className={`px-6 py-2 rounded-md font-medium transition ${activeCategory === 'TODOS' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary hover:bg-gray-100'}`}
              onClick={() => handleCategoryClick('TODOS')}
            >
              TODOS
            </button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`px-6 py-2 rounded-md font-medium transition ${activeCategory === category.toUpperCase() ? 'bg-primary text-white' : 'bg-white text-primary border border-primary hover:bg-gray-100'}`}
                onClick={() => handleCategoryClick(category.toUpperCase())}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={index}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  imageSrc={product.imageSrc}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500">Tente alterar os filtros ou termos da busca.</p>
            </div>
          )}
        </div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Informações Importantes</h2>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Qualidade Garantida</h3>
              <p className="text-gray-700 mb-4">
                Todos os nossos produtos são desenvolvidos seguindo rigorosos padrões de qualidade 
                e passam por testes extensivos para garantir sua eficácia e segurança.
              </p>
              <p className="text-gray-700">
                Utilizamos matérias-primas de alta qualidade e processos de fabricação que atendem 
                às exigências das principais normas e regulamentações do setor farmacêutico.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-secondary mb-4">Como Adquirir Nossos Produtos</h3>
              <p className="text-gray-700 mb-4">
                Os produtos da Orthosais Farma podem ser encontrados em farmácias e drogarias 
                selecionadas em todo o Brasil.
              </p>
              <p className="text-gray-700 mb-6">
                Para mais informações sobre pontos de venda ou para realizar pedidos diretamente, 
                entre em contato conosco.
              </p>
              <Link href="/contato">
                <a className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition">
                  Fale Conosco
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function ProdutosPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-12">Carregando produtos...</div>}>
      <ProdutosContent />
    </Suspense>
  );
}
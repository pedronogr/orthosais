"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ProductInfo from '../components/ProductInfo';
import { getAllProducts, migrateFromLocalStorage } from '../services/productService';
import type { Product } from '../services/productService';

// Componente separado para usar o hook useSearchParams
function ProdutosContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Usar o parâmetro da URL como termo de busca inicial
  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);
  
  // Dados dos produtos pré-definidos
  const defaultProducts: Product[] = [
    {
      id: "viscomove",
      name: "VISCOMOVE",
      price: 159.90,
      imageSrc: "/images/viscomove.png",
      category: "Linha Vida",
      description: "Suplemento articular para saúde das articulações."
    },
    {
      id: "flandor",
      name: "FLANDOR 500mg",
      price: 159.90,
      imageSrc: "/images/flandor.png",
      category: "Linha Vida",
      description: "Anti-inflamatório para alívio da dor e tratamento de inflamações."
    },
    {
      id: "cientific-synovial",
      name: "CIENTIFIC SYNOVIAL",
      price: 2499.90,
      imageSrc: "/images/cientificsy.png",
      category: "Linha Vida",
      description: "Viscossuplementação para tratamento da osteoartrite."
    },
    {
      id: "viscolive-ss",
      name: "VISCOLIVE SS",
      price: 189.99,
      imageSrc: "/images/viscolivess.png",
      category: "Linha Vida",
      description: "Suplemento articular para saúde das articulações."
    },
    {
      id: "ortrical",
      name: "ORTRICAL",
      price: 52.90,
      imageSrc: "/images/ortrical.png",
      category: "Linha Vida",
      description: "Suplemento de cálcio para saúde óssea."
    },
    {
      id: "allmag",
      name: "ALLMAG",
      price: 86.49,
      imageSrc: "/images/allmag.png",
      category: "Linha Vida",
      description: "Suplemento de magnésio para saúde muscular e cardiovascular."
    }
  ];

  // Carregar produtos pré-definidos e do IndexedDB
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Primeiro, migrar dados do localStorage para IndexedDB (se existirem)
        await migrateFromLocalStorage();
        
        // Obter produtos do IndexedDB
        const dbProducts = await getAllProducts();
        
        // Filtrar apenas produtos ativos
        const activeDbProducts = dbProducts.filter(p => !p.status || p.status === 'ativo');
        
        // Combinar com os produtos padrão
        const allProducts = [...defaultProducts, ...activeDbProducts];
        
        setProducts(allProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        // Em caso de erro, usar apenas os produtos padrão
        setProducts(defaultProducts);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Categorias únicas
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filtragem de produtos
  const filteredProducts = products.filter(product => {
    // Busca mais abrangente - normaliza texto e remove acentos
    const normalizeText = (text: string) => {
      return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s]/g, ''); // Remove caracteres especiais
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

  // Mostrar estado de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Filtros e Busca */}
      <ProductFilters 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard 
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      imageSrc={product.imageSrc}
                    />
                  </div>
                ))}
              </div>
              
              {queryParam && (
                <div className="text-center mt-8 text-gray-600">
                  <p>Mostrando {filteredProducts.length} resultados para "{queryParam}"</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg 
                  className="w-16 h-16 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Não encontramos produtos que correspondam à sua busca.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('TODOS');
                  }}
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Informações Adicionais */}
      <ProductInfo />

      <Footer />
    </main>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ProdutosContent />
    </Suspense>
  );
} 
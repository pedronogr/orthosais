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
      description: "SUPLEMENTO ALIMENTAR EM COMPRIMIDOS Cartonagem contendo frasco plástico com 30 comprimidos 1,2 g cada.",
      price: 159.90,
      imageSrc: "/images/viscomove.png",
      category: "Linha Vida"
    },
    {
      id: "flandor",
      name: "FLANDOR 500mg",
      description: "O que é o Flandor Curcumin C3 Complex®? Curcumin C3 Complex® é uma formulação patenteada de curcumina, o composto ativo encontrado na cúrcuma (Curcuma longa), conhecido por suas propriedades antioxidantes e anti-inflamatórias. Quais os benefícios do Flandor Curcumin C3 Complex®? Poder antioxidante: Protege as células contra danos causados pelos radicais livres. Ação Anti-inflamatória: Reduz a inflamação, aliviando dores articulares como na osteoartrite. Saúde do Coração: Ajuda a manter níveis saudáveis de colesterol, protegendo contra doenças cardiovasculares. Estímulo Cognitivo: Melhora a função cerebral, auxiliando na memória e na prevenção de doenças neurodegenerativas. Suporte à Imunidade: Contribui para fortalecer o sistema imunológico, protegendo o corpo contra agentes patogênicos. O CURCUMIN C3 COMPLEX® OFERECE UMA ABORDAGEM NATURAL E EFICAZ PARA PROMOVER A SAÚDE E O BEM-ESTAR GERAL.",
      price: 159.90,
      imageSrc: "/images/flandor.png",
      category: "Linha Vida"
    },
    {
      id: "cientific-synovial",
      name: "CIENTIFIC SYNOVIAL",
      description: "É uma solução injetável de ácido hialurônico, utilizada para o tratamento de doenças articulares, como a osteoartrite, visando melhorar a mobilidade e reduzir a dor. É uma forma de viscossuplementação, onde a solução é injetada na articulação para substituir ou complementar o líquido sinovial natural. Como funciona: Restauração da Viscosidade: O Cientific Synovial é composto por ácido hialurônico reticulado, que tem maior viscosidade do que o ácido hialurônico natural, restaurando a viscosidade do líquido sinovial. Lubrificação: A solução lubrifica as articulações, reduzindo o atrito entre as superfícies articulares e melhorando a mobilidade. Redução da Dor: Ao reduzir o atrito e melhorar a lubrificação, o Cientific Synovial pode ajudar a aliviar a dor causada pela inflamação e desgaste das articulações. Proteção das Articulações: A solução ajuda a proteger as articulações de danos, pois atua como um amortecedor e lubrificante, reduzindo o impacto nas superfícies articulares. Indicações: Osteoartrite: O Cientific Synovial é frequentemente usado no tratamento da osteoartrite do joelho, ombro, quadril, tornozelo, mãos e pés. Outras Patologias: Pode ser utilizado em outras condições que afetam as articulações, como periartrite do ombro. Composição: Ácido Hialurônico Reticulado: É o principal componente, com alto peso molecular e viscosidade, garantindo maior durabilidade e eficácia. Tampão de Fosfato: Ajuda a manter o pH da solução em um nível adequado. Cloreto de Sódio e Água para Injetáveis: Complementam a solução, garantindo sua estabilidade e segurança. Importante: O Cientific Synovial é uma solução injetável que deve ser administrada por um profissional de saúde qualificado.",
      price: 2499.90,
      imageSrc: "/images/cientificsy.png",
      category: "Linha Vida"
    },
    {
      id: "viscolive-ss",
      name: "VISCOLIVE SS",
      description: "Cartonagem contendo um sachê de 500 g + informativo. Recomendação de uso: Número máximo de porções diárias: 1 porção de 20 g (2 colheres medida) por dia. Composição: Colágeno, BCAA, Vitaminas e Minerais. Precauções e Advertências: Consumir este produto conforme a recomendação de ingestão diária constante na embalagem. NÃO CONTEM GLÚTEN. Este produto não deve ser ingerido por gestantes, lactantes e crianças, sem orientação do nutricionista.",
      price: 189.99,
      imageSrc: "/images/viscolivess.png",
      category: "Linha Vida"
    },
    {
      id: "ortrical",
      name: "ORTRICAL",
      description: "SUPLEMENTO ALIMENTAR DE CÁLCIO & VITAMINA D3 EM COMPRIMIDOS Cartonagem com Pote Plástico contendo 60 Comprimidos de 1,4 g (Peso Líq. 84 g) + informativo. Recomendação de uso: Ingerir 2 cápsulas ao dia. N° Máximo de porções diárias: 2 cápsulas por dia. Composição: Cloreto de Magnésio e Óxido de Magnésio. Precauções e Advertências: Consumir este produto conforme a recomendação de ingestão diária constante na embalagem. NÃO CONTEM GLÚTEN. Este produto não deve ser ingerido por gestantes, lactantes e crianças, sem orientação do nutricionista.",
      price: 52.90,
      imageSrc: "/images/ortrical.png",
      category: "Linha Vida"
    },
    {
      id: "allmag",
      name: "ALLMAG",
      description: "SUPLEMENTO ALIMENTAR DE MAGNÉSIO E VITAMINAS B6 EM CÁPSULAS Cartonagem com Pote Plástico contendo 60 cápsulas de 620 mg (Peso Líq. 37 g) + informativo. Recomendação de uso: Ingerir 1 a 2 cápsulas ao dia, ou a critério do médico ou nutricionista. N° Máximo de porções diárias: 2 cápsulas por dia. Composição: Óxido de Magnésio, Cloreto de Magnésio e Vitamina B6. Precauções e Advertências: Consumir este produto conforme a recomendação de ingestão diária constante na embalagem. NÃO CONTEM GLÚTEN. Este produto não deve ser ingerido por gestantes, lactantes e crianças, sem orientação do nutricionista.",
      price: 86.49,
      imageSrc: "/images/allmag.png",
      category: "Linha Vida"
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
  const categories = [...new Set(products.map(product => product.category))];
  
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
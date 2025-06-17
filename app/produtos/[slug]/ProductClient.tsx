"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RelatedProducts from '../../components/RelatedProducts';
import ProductReviews from '../../components/ProductReviews';
import ProductSafety from '../../components/ProductSafety';
import ProductFAQ from '../../components/ProductFAQ';
import PromotionBanner from '../../components/PromotionBanner';
import GuaranteeBanner from '../../components/GuaranteeBanner';
import BenefitsBanner from '../../components/BenefitsBanner';
import TestimonialsBanner from '../../components/TestimonialsBanner';
import { useAppContext } from '../../context/AppContext';

interface ProductClientProps {
  product: {
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    oldPrice?: number;
    imageSrc: string;
    category: string;
    features: string[];
    specifications: Record<string, string>;
    reviews: Array<{
      id: number;
      user: {
        name: string;
        avatar: string;
      };
      rating: number;
      date: string;
      comment: string;
    }>;
    safetyInfo: {
      warnings: string[];
      contraindications: string[];
      sideEffects: string[];
      storage: string;
      shelfLife: string;
    };
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const router = useRouter();
  const { addToCart } = useAppContext();

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Adicionar o produto ao carrinho com a quantidade selecionada
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.slug,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc
      });
    }
    
    // Redirecionar para a página de carrinho
    router.push('/carrinho');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-primary">Produtos</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="relative aspect-square">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Price */}
              <div className="mb-8">
                {product.oldPrice && (
                  <span className="text-gray-500 line-through mr-3">
                    R$ {product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg 
                      className="w-5 h-5 text-primary mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-gray-600 hover:text-primary"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 text-center border-x py-2"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-primary"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-hover transition-colors duration-300"
                >
                  Adicionar ao Carrinho
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 font-medium ${
                      activeTab === 'description'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    Descrição
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`pb-4 font-medium ${
                      activeTab === 'specifications'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    Especificações
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'description' ? (
                  <div className="whitespace-pre-line text-gray-700">
                    {product.longDescription}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-gray-500">{key}</span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromotionBanner
        title="Compre 2 Leve 3"
        description="Na compra de 2 unidades do OrthoVit Complex, leve a terceira grátis. Promoção por tempo limitado!"
        ctaText="Aproveitar Agora"
        ctaLink="/produtos"
        imageSrc="/images/promotion.jpg"
        backgroundColor="bg-secondary"
      />

      <GuaranteeBanner
        title="Nossa Garantia de Qualidade"
        description="Comprometidos com sua satisfação e bem-estar"
        features={[
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Qualidade Garantida",
            description: "Produtos testados e aprovados pelos mais altos padrões de qualidade"
          },
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Entrega Rápida",
            description: "Entrega em todo o Brasil com rastreamento em tempo real"
          },
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            ),
            title: "Pagamento Seguro",
            description: "Diversas formas de pagamento com total segurança"
          }
        ]}
      />

      <BenefitsBanner
        title="Benefícios do OrthoVit Complex"
        description="Descubra como nosso produto pode transformar sua saúde"
        benefits={[
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ),
            title: "Sistema Imunológico",
            description: "Fortalece suas defesas naturais contra doenças"
          },
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: "Energia Vital",
            description: "Aumenta sua disposição e vitalidade diária"
          },
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Saúde Completa",
            description: "Cuidado integral com seu bem-estar"
          },
          {
            icon: (
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Resultados Rápidos",
            description: "Efeitos visíveis em poucas semanas"
          }
        ]}
      />

      <TestimonialsBanner
        title="O que nossos clientes dizem"
        description="Histórias reais de pessoas que transformaram sua saúde com o OrthoVit Complex"
        testimonials={[
          {
            id: 1,
            name: "Maria S.",
            role: "Cliente desde 2023",
            avatar: "/images/avatar1.jpg",
            content: "Comecei a tomar o OrthoVit Complex há 3 meses e a diferença na minha imunidade foi impressionante. Não fiquei doente uma única vez neste período!",
            rating: 5
          },
          {
            id: 2,
            name: "João P.",
            role: "Cliente desde 2024",
            avatar: "/images/avatar2.jpg",
            content: "Sempre tive problemas com falta de energia. Desde que comecei a tomar o OrthoVit Complex, minha disposição melhorou muito. Recomendo!",
            rating: 5
          },
          {
            id: 3,
            name: "Ana O.",
            role: "Cliente desde 2023",
            avatar: "/images/avatar3.jpg",
            content: "O atendimento é excelente e o produto é de alta qualidade. Já estou no meu terceiro frasco e não pretendo parar de usar.",
            rating: 4
          }
        ]}
      />

      <ProductReviews 
        productId={product.slug}
        reviews={product.reviews}
      />

      {/* Informações de Segurança */}
      <ProductSafety 
        safetyInfo={product.safetyInfo}
      />

      {/* Perguntas Frequentes */}
      <ProductFAQ 
        faqs={product.faqs}
      />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductSlug={product.slug}
        category={product.category}
        products={[]}
      />

      <Footer />
    </main>
  );
} 
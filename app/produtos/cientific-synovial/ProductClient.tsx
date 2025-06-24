"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BenefitsBanner from '../../components/BenefitsBanner';
import GuaranteeBanner from '../../components/GuaranteeBanner';
import ProductSafety from '../../components/ProductSafety';
import ProductFAQ from '../../components/ProductFAQ';
import RelatedProducts from '../../components/RelatedProducts';
import CertificationsSection from '../../components/CertificationsSection';
import { useAppContext } from '../../context/AppContext';

export default function ProductClient() {
  // Dados do produto para os componentes
  const safetyInfo = {
    warnings: [
      "Mantenha fora do alcance de crianças",
      "Não exceda a dose recomendada",
      "Este produto não é um medicamento",
      "Consulte um médico antes de usar se estiver grávida ou amamentando"
    ],
    contraindications: [
      "Hipersensibilidade a qualquer componente da fórmula",
      "Pessoas com alergia a crustáceos (fonte de glucosamina)",
      "Pacientes com distúrbios de coagulação sem supervisão médica"
    ],
    sideEffects: [
      "Em raros casos, pode causar desconforto gastrointestinal",
      "Pode causar sonolência em pessoas sensíveis",
      "Em caso de reações alérgicas, suspenda o uso e consulte um médico"
    ],
    storage: "Conservar em local seco e fresco (15–30 °C), protegido da luz e umidade. Manter fora do alcance de crianças.",
    shelfLife: "24 meses a partir da data de fabricação."
  };

  const faqs = [
    {
      question: "Como age a combinação de Glucosamina e Condroitina?",
      answer: "A Glucosamina e a Condroitina são componentes naturais da cartilagem. A Glucosamina ajuda na formação e reparo da cartilagem, enquanto a Condroitina auxilia na retenção de água e elasticidade. Juntas, oferecem suporte à saúde articular e mobilidade."
    },
    {
      question: "O que é MSM e qual seu benefício?",
      answer: "MSM (Metilsulfonilmetano) é uma fonte natural de enxofre, elemento essencial para a formação de tecidos conectivos. Ele auxilia na redução do desconforto articular e trabalha em sinergia com a Glucosamina e Condroitina."
    },
    {
      question: "Para que serve o Ácido Hialurônico nesta fórmula?",
      answer: "O Ácido Hialurônico é um componente do líquido sinovial das articulações, atuando como lubrificante e amortecedor. Sua presença na fórmula contribui para a viscosidade do líquido articular e conforto durante os movimentos."
    },
    {
      question: "Quanto tempo leva para sentir os resultados?",
      answer: "Os resultados podem variar de pessoa para pessoa, mas geralmente são observados benefícios após 4-6 semanas de uso contínuo e regular."
    },
    {
      question: "Posso tomar junto com outros medicamentos?",
      answer: "Recomendamos consultar seu médico antes de usar o Cientific Synovial em conjunto com outros medicamentos, especialmente anticoagulantes, pois pode haver interações."
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Cientific Synovial",
    "image": "https://www.orthosais.com.br/images/cientificsy.png",
    "description": "Suplemento premium para saúde articular com Glucosamina, Condroitina, MSM e Ácido Hialurônico. Apoio à manutenção da cartilagem e mobilidade.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/cientific-synovial",
      "priceCurrency": "BRL",
      "price": "2499.90",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "124"
    }
  };

  return (
    <>
      {/* Esquema de dados estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Custom Header for Cientific Synovial */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Cientific Synovial<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Suporte Articular Avançado
          </span>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-amber-600">Produtos</Link>
            <span className="mx-2">/</span>
            <span className="text-amber-600">Cientific Synovial</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/cientificsy.png"
                alt="Frasco de Cientific Synovial"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Suporte Articular Avançado
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 2.499,90
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Frasco com 60 cápsulas
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>Glucosamina + Condroitina + MSM + Ácido Hialurônico</li>
                <li>Apoio à manutenção da cartilagem e mobilidade</li>
                <li>Cápsulas concentradas para conforto diário</li>
                <li>Frasco econômico com 60 cápsulas</li>
                <li>Fórmula completa para saúde articular</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/carrinho"
                className="inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Adicionar ao carrinho
              </Link>
              
              <a
                href="#informacoes"
                className="inline-block text-center bg-white border border-amber-600 font-medium py-3 px-8 rounded-md transition-all duration-300"
                style={{ 
                  backgroundColor: 'white',
                  color: 'var(--amber-600)',
                  borderColor: 'var(--amber-600)',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {e.currentTarget.style.color = 'var(--amber-600)'}}
                onMouseOut={(e) => {e.currentTarget.style.color = 'var(--amber-600)'}}
              >
                Ver mais informações
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Produto */}
      <BenefitsBanner
        title="Benefícios do Cientific Synovial"
        description="Conheça as vantagens exclusivas do nosso suplemento para saúde articular"
        benefits={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Fórmula Completa",
            description: "Combinação ideal de Glucosamina, Condroitina, MSM e Ácido Hialurônico para suporte articular completo"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Ação Prolongada",
            description: "Cápsulas de liberação controlada para manutenção dos níveis ativos por mais tempo"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Qualidade Premium",
            description: "Ingredientes de alta pureza e biodisponibilidade, garantindo máxima eficácia"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Tecnologia Avançada",
            description: "Processo de fabricação que preserva a integridade e potência dos compostos ativos"
          }
        ]}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o Cientific Synovial</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O Cientific Synovial é um suplemento alimentar premium desenvolvido especificamente para oferecer suporte completo à saúde das articulações e tecidos conectivos.</p>
              
              <p className="mt-4">Nossa fórmula exclusiva combina quatro componentes essenciais para a manutenção da cartilagem e mobilidade articular: Sulfato de Glucosamina, Sulfato de Condroitina, Metilsulfonilmetano (MSM) e Ácido Hialurônico.</p>
              
              <p className="mt-4">Cada ingrediente foi selecionado com base em evidências científicas e combinados em proporções ideais para maximizar a sinergia entre eles, oferecendo um suporte articular completo e eficaz.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Indicações</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Suporte para conforto e mobilidade articular</li>
                <li>Manutenção da saúde da cartilagem</li>
                <li>Auxílio na lubrificação das articulações</li>
                <li>Suporte para praticantes de atividades físicas</li>
                <li>Apoio à qualidade de vida em idades avançadas</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Modo de Uso</h4>
              <p>Ingerir 2 cápsulas ao dia, preferencialmente após refeições ou conforme orientação de profissional de saúde.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Composição</h4>
              <p>Cada dose (2 cápsulas) contém:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>1500 mg Sulfato de Glucosamina (vegetal)</li>
                <li>1200 mg Sulfato de Condroitina</li>
                <li>500 mg Metilsulfonilmetano (MSM)</li>
                <li>40 mg Ácido Hialurônico</li>
              </ul>
              <p className="mt-2">Excipientes: celulose microcristalina, estearato de magnésio vegetal e dióxido de silício coloidal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <GuaranteeBanner
        title="Nossa Garantia de Qualidade"
        description="Compromisso com a excelência em cada frasco"
        features={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Garantia de Pureza",
            description: "Ingredientes testados e certificados, livres de contaminantes"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Controle Rigoroso",
            description: "Produção sob normas BPF (Boas Práticas de Fabricação)"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Satisfação Garantida",
            description: "30 dias de garantia ou seu dinheiro de volta"
          }
        ]}
      />

      {/* Certificações */}
      <CertificationsSection 
        title="Certificações e Garantias"
        description="O Cientific Synovial é produzido seguindo os mais rigorosos padrões de qualidade"
      />

      {/* Segurança do Produto */}
      <ProductSafety safetyInfo={safetyInfo} />

      {/* FAQ */}
      <ProductFAQ faqs={faqs} />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductSlug="cientific-synovial"
        category="Linha Saúde"
        products={[
          {
            slug: "flandor",
            name: "FLANDOR",
            description: "Suplemento anti-inflamatório e antioxidante de alta potência com 95% de curcuminoides ativos.",
            price: 159.90,
            imageSrc: "/images/flandor.png",
            category: "Linha Saúde"
          },
          {
            slug: "viscomove",
            name: "VISCOMOVE",
            description: "Suplemento para saúde articular com colágeno tipo II não-desnaturado.",
            price: 139.90,
            imageSrc: "/images/viscomove.png",
            category: "Linha Saúde"
          },
          {
            slug: "viscolivess",
            name: "VISCOLIVESS",
            description: "Suplemento de ômega 3 de alta pureza para saúde cardiovascular e articular.",
            price: 89.90,
            imageSrc: "/images/viscolivess.png",
            category: "Linha Saúde"
          }
        ]}
      />
    </>
  );
} 
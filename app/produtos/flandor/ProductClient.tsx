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
  // Obter o contexto da aplicação
  const { addToCart } = useAppContext();
  
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
      "Pacientes com problemas de coagulação",
      "Pessoas com cálculos biliares"
    ],
    sideEffects: [
      "Em raros casos, pode causar desconforto gastrointestinal",
      "Pode interagir com anticoagulantes",
      "Em caso de reações alérgicas, suspenda o uso e consulte um médico"
    ],
    storage: "Manter em local seco e arejado, longe da luz solar direta e temperaturas acima de 30°C.",
    shelfLife: "24 meses a partir da data de fabricação."
  };

  const faqs = [
    {
      question: "O que é a curcumina?",
      answer: "A curcumina é o principal composto ativo da cúrcuma (Curcuma longa), responsável pela maioria dos efeitos benéficos à saúde, incluindo propriedades anti-inflamatórias, antioxidantes e de suporte ao sistema imunológico."
    },
    {
      question: "Qual a diferença do Flandor para outros suplementos de curcumina?",
      answer: "O Flandor contém Curcumin C3 Complex®, uma formulação patenteada com 95% de curcuminoides ativos e maior biodisponibilidade, garantindo absorção superior em comparação com suplementos convencionais."
    },
    {
      question: "Como devo tomar o Flandor?",
      answer: "Recomenda-se tomar 1 cápsula de 500mg, duas vezes ao dia, preferencialmente após as refeições, ou conforme orientação do profissional de saúde."
    },
    {
      question: "Quanto tempo leva para sentir os efeitos?",
      answer: "Os resultados podem variar de pessoa para pessoa, mas geralmente são observados benefícios após 2-3 semanas de uso contínuo."
    },
    {
      question: "Posso tomar junto com outros medicamentos?",
      answer: "Recomendamos consultar seu médico antes de usar o Flandor em conjunto com outros medicamentos, especialmente anticoagulantes, pois pode haver interações."
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "FLANDOR 500mg",
    "image": "https://www.orthosais.com.br/images/flandor.png",
    "description": "Suplemento anti-inflamatório e antioxidante de alta potência com 95% de curcuminoides ativos.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/flandor",
      "priceCurrency": "BRL",
      "price": "159.90",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "86"
    }
  };

  return (
    <>
      {/* Esquema de dados estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Custom Header for Flandor */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            FLANDOR<sup className="align-super text-sm">®</sup> 500 mg
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Curcumin C3 Complex<sup className="align-super">®</sup>
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
            <span className="text-amber-600">Flandor 500mg</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/flandor.png"
                alt="Frasco de Flandor 500 mg"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Suplemento anti-inflamatório e antioxidante de alta potência
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 159,90
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Frasco com 90 cápsulas
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>95% de curcuminoides ativos</li>
                <li>Suporte à saúde articular e cardiovascular</li>
                <li>Ação antioxidante superior</li>
                <li>Biodisponibilidade aumentada</li>
                <li>Frasco econômico com 90 cápsulas</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: "flandor",
                    name: "FLANDOR 500mg",
                    price: 159.90,
                    imageSrc: "/images/flandor.png"
                  });
                }}
                className="inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Adicionar ao carrinho
              </button>
              
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
        title="Benefícios do Flandor 500mg"
        description="Conheça as vantagens exclusivas do nosso suplemento anti-inflamatório"
        benefits={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: "Potente Anti-inflamatório",
            description: "Ajuda a reduzir inflamações no corpo, contribuindo para a saúde articular e alívio de desconfortos"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Ação Antioxidante",
            description: "Combate os radicais livres, retardando o envelhecimento celular e protegendo o corpo contra estresse oxidativo"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Suporte Cardiovascular",
            description: "Contribui para a saúde do sistema circulatório, auxiliando na manutenção dos níveis saudáveis de colesterol"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Biodisponibilidade Superior",
            description: "Formulação patenteada que garante maior absorção dos compostos ativos para resultados mais efetivos"
          }
        ]}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o Flandor 500mg</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O Flandor 500mg é um suplemento alimentar à base de curcumina, o composto ativo da cúrcuma (Curcuma longa), conhecida por suas propriedades anti-inflamatórias e antioxidantes.</p>
              
              <p className="mt-4">Nossa fórmula exclusiva contém Curcumin C3 Complex®, uma formulação patenteada com 95% de curcuminoides ativos, incluindo curcumina, demetoxicurcumina e bisdemetoxicurcumina, os compostos responsáveis pelos principais benefícios da cúrcuma.</p>
              
              <p className="mt-4">Diferentemente de outros suplementos de curcumina disponíveis no mercado, o Flandor 500mg foi desenvolvido para garantir máxima absorção, oferecendo biodisponibilidade superior para resultados efetivos.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Indicações</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Suporte para desconfortos articulares</li>
                <li>Auxílio na redução de processos inflamatórios</li>
                <li>Proteção antioxidante</li>
                <li>Suporte ao sistema imunológico</li>
                <li>Manutenção da saúde cardiovascular</li>
                <li>Apoio à função digestiva</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Modo de Uso</h4>
              <p>Tomar 1 cápsula de 500mg, duas vezes ao dia, preferencialmente após as refeições, ou conforme orientação do profissional de saúde.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Composição</h4>
              <p>Cada cápsula contém: 500mg de extrato padronizado de Curcuma longa (Curcumin C3 Complex®) contendo 95% de curcuminoides. Excipientes: celulose microcristalina, estearato de magnésio vegetal e dióxido de silício coloidal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <GuaranteeBanner
        title="Nossa Garantia de Qualidade"
        description="Compromisso com a excelência em cada cápsula"
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
        description="O Flandor 500mg é produzido seguindo os mais rigorosos padrões de qualidade"
      />

      {/* Segurança do Produto */}
      <ProductSafety safetyInfo={safetyInfo} />

      {/* FAQ */}
      <ProductFAQ faqs={faqs} />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductSlug="flandor"
        category="Linha Saúde"
        products={[
          {
            slug: "cientific-synovial",
            name: "Cientific Synovial",
            description: "Suplemento premium para saúde articular com Glucosamina, Condroitina, MSM e Ácido Hialurônico.",
            price: 2499.90,
            imageSrc: "/images/cientificsy.png",
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
            name: "VISCOLIVE SS",
            description: "Suplemento de ômega 3 de alta pureza para saúde cardiovascular e articular.",
            price: 189.90,
            imageSrc: "/images/viscolivess.png",
            category: "Linha Saúde"
          }
        ]}
      />
    </>
  );
}

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
      "Vitamina K pode antagonizar anticoagulantes (ex.: varfarina)",
      "Diabéticos devem monitorar ingestão proteica"
    ],
    contraindications: [
      "Hipersensibilidade a qualquer componente da fórmula",
      "Fenilcetonúricos (contém aminoácidos essenciais)",
      "Gestantes, lactantes e menores de 18 anos sem orientação profissional",
      "Insuficiência renal ou hepática grave sem avaliação médica"
    ],
    sideEffects: [
      "Possíveis reações leves: distensão abdominal, sabor residual, náusea",
      "Trato gastrointestinal: plenitude, diarreia leve",
      "Dermatológicos: prurido ou erupção em indivíduos sensíveis ao colágeno"
    ],
    storage: "Manter o sachê fechado em local seco e fresco (15–30 °C), protegido de luz e umidade. Após aberto, consumir em até 60 dias.",
    shelfLife: "24 meses a partir da data de fabricação."
  };

  const faqs = [
    {
      question: "Como o colágeno hidrolisado atua nas articulações?",
      answer: "O colágeno hidrolisado fornece peptídeos bioativos que estimulam condroblastos (células da cartilagem) a produzirem mais matriz extracelular. Isso contribui para a manutenção da integridade e função das articulações, especialmente quando associado aos outros componentes da fórmula."
    },
    {
      question: "Qual a função dos BCAAs neste suplemento?",
      answer: "Os BCAAs (Leucina, Isoleucina e Valina) são aminoácidos essenciais que sinalizam via mTORc1 para estimular a síntese proteica muscular. Além disso, fornecem substrato para a construção de proteínas, complementando a ação do colágeno e contribuindo para o suporte à massa muscular."
    },
    {
      question: "Por que a vitamina C está presente na fórmula?",
      answer: "A vitamina C é um cofator essencial da enzima prolil-hidroxilase, necessária para a maturação adequada do colágeno. Sem vitamina C suficiente, o colágeno não consegue formar sua estrutura helicoidal tripla estável, comprometendo sua função nos tecidos."
    },
    {
      question: "Como devo tomar o Viscolive SS?",
      answer: "Misture 1 porção (20 g = 2 colheres-medida) em 250 mL de água, suco ou iogurte, 1 vez ao dia. O produto também pode ser adicionado a preparações mornas (abaixo de 60 °C) sem perda de atividade."
    },
    {
      question: "Quanto tempo leva para observar resultados?",
      answer: "Os resultados podem variar de pessoa para pessoa, mas geralmente são observados benefícios após 4-8 semanas de uso contínuo e regular, especialmente quando associado a uma dieta equilibrada e atividade física."
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "VISCOLIVE SS",
    "image": "https://www.orthosais.com.br/images/viscolivess.png",
    "description": "Suplemento premium com colágeno hidrolisado, BCAAs e complexo vitamínico-mineral para saúde articular, muscular, óssea e dermatológica.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/viscolivess",
      "priceCurrency": "BRL",
      "price": "189.90",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "98"
    }
  };

  return (
    <>
      {/* Esquema de dados estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Custom Header for Viscolive SS */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            VISCOLIVE SS<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Colágeno + BCAA + Vitaminas & Minerais
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
            <span className="text-amber-600">Viscolive SS</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/viscolivess.png"
                alt="Embalagem de Viscolive SS"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Suporte Completo para Articulações, Músculos e Pele
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 189,90
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Sachê com 500g (25 porções)
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>17,5g de colágeno hidrolisado (tipos I e II) por dose</li>
                <li>2040mg de BCAAs (leucina, isoleucina e valina)</li>
                <li>Complexo de vitaminas C, D₃ e K (K₁ + K₂)</li>
                <li>Minerais essenciais: magnésio e zinco</li>
                <li>Sachê econômico com 25 porções</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: "viscolivess",
                    name: "VISCOLIVE SS",
                    price: 189.90,
                    imageSrc: "/images/viscolivess.png"
                  });
                }}
                className="inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Adicionar ao carrinho
              </button>
              
              <Link
                href="/produtos/viscolivess"
                className="inline-block text-center bg-white border border-amber-600 text-amber-600 font-medium py-3 px-8 rounded-md hover:bg-amber-50 transition-all duration-300"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Produto */}
      <BenefitsBanner
        title="Benefícios do Viscolive SS"
        description="Conheça as vantagens exclusivas do nosso suplemento multifuncional"
        benefits={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Saúde Articular",
            description: "Peptídeos de colágeno estimulam condroblastos para manutenção da cartilagem e função articular"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Suporte Muscular",
            description: "BCAAs sinalizam via mTORc1 e fornecem substrato proteico para manutenção da massa muscular"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Saúde Óssea",
            description: "Vitaminas D e K regulam o metabolismo do cálcio, enquanto o magnésio e zinco participam de reações enzimáticas essenciais"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Benefícios Dermatológicos",
            description: "Colágeno e vitamina C contribuem para a saúde da pele, cabelos e unhas"
          }
        ]}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o Viscolive SS</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O Viscolive SS é um suplemento alimentar premium desenvolvido especificamente para oferecer suporte completo à saúde articular, muscular, óssea e dermatológica.</p>
              
              <p className="mt-4">Nossa fórmula exclusiva combina colágeno hidrolisado (tipos I e II), BCAAs (leucina, isoleucina e valina), vitaminas (C, D₃ e K) e minerais essenciais (magnésio e zinco) em proporções cientificamente embasadas.</p>
              
              <p className="mt-4">Cada componente foi selecionado com base em evidências científicas e combinados para maximizar a sinergia entre eles, oferecendo um suporte multifuncional completo.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Indicações</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Manutenção da função articular e cartilaginosa</li>
                <li>Suporte à massa muscular</li>
                <li>Saúde óssea e conectiva</li>
                <li>Benefícios dermatológicos (pele, cabelos, unhas)</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Modo de Uso</h4>
              <p>Misturar 1 porção (20 g = 2 colheres-medida) em 250 mL de água, suco ou iogurte, 1 vez ao dia. Pode ser adicionado a preparações mornas (abaixo de 60 °C) sem perda de atividade.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Composição</h4>
              <p>Cada porção (20 g) contém:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>17,5 g colágeno hidrolisado (tipos I e II)</li>
                <li>840 mg L-leucina</li>
                <li>600 mg L-isoleucina</li>
                <li>600 mg L-valina</li>
                <li>45 mg vitamina C (45% VD)</li>
                <li>5 µg vitamina D₃ (200 UI - 33% VD)</li>
                <li>65 µg vitamina K (K₁ + K₂) (54% VD)</li>
                <li>36 mg magnésio (9% VD)</li>
                <li>6 mg zinco (55% VD)</li>
              </ul>
              <p className="mt-2">Excipiente: dióxido de silício. NÃO CONTÉM GLÚTEN.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Informação Nutricional</h4>
              <p>Valor energético: 71 kcal (4% VD)</p>
              <p>Proteínas totais: 17,7 g (35% VD)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <GuaranteeBanner
        title="Nossa Garantia de Qualidade"
        description="Compromisso com a excelência em cada sachê"
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
        description="O Viscolive SS é produzido seguindo os mais rigorosos padrões de qualidade"
      />

      {/* Segurança do Produto */}
      <ProductSafety safetyInfo={safetyInfo} />

      {/* FAQ */}
      <ProductFAQ faqs={faqs} />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductId="viscolivess"
        suggestedProducts={[
          {
            id: "cientific-synovial",
            name: "Cientific Synovial",
            description: "Suplemento premium para saúde articular com Glucosamina, Condroitina, MSM e Ácido Hialurônico.",
            price: 2499.90,
            imageSrc: "/images/cientificsy.png",
            category: "Linha Saúde"
          },
          {
            id: "flandor",
            name: "FLANDOR",
            description: "Suplemento anti-inflamatório e antioxidante de alta potência com 95% de curcuminoides ativos.",
            price: 159.90,
            imageSrc: "/images/flandor.png",
            category: "Linha Saúde"
          },
          {
            id: "viscomove",
            name: "VISCOMOVE",
            description: "Suplemento para saúde articular com colágeno tipo II não-desnaturado.",
            price: 139.90,
            imageSrc: "/images/viscomove.png",
            category: "Linha Saúde"
          }
        ]}
      />
    </>
  );
} 
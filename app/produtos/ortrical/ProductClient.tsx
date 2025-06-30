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
      "Em caso de hipercalcemia, hipermagnesemia ou hiperparatireoidismo, consulte um médico antes do uso",
      "Uso concomitante de anticoagulantes cumarínicos requer monitoração de INR"
    ],
    contraindications: [
      "Hipersensibilidade a qualquer componente da fórmula",
      "Menores de 19 anos sem indicação profissional",
      "Portadores de insuficiência renal grave sem acompanhamento médico"
    ],
    sideEffects: [
      "Em raros casos, pode causar desconforto gastrointestinal",
      "Sensação de plenitude, flatulência ou fezes amolecidas (< 3%)",
      "Raros: prurido, urticária ou dor abdominal moderada"
    ],
    storage: "Conservar em local seco e fresco (15–30 °C), ao abrigo de luz e umidade.",
    shelfLife: "Vide data impressa no frasco."
  };

  const faqs = [
    {
      question: "Por que o cálcio citrato-malato é melhor que outras formas?",
      answer: "O cálcio citrato-malato possui alta biodisponibilidade e sua absorção é independente do pH gástrico, o que o torna mais eficaz que outras formas de cálcio, especialmente em pessoas com baixa acidez estomacal ou idosos."
    },
    {
      question: "Qual a função da vitamina K₂ nesta fórmula?",
      answer: "A vitamina K₂ (MK-7) ativa proteínas importantes como a osteocalcina e a proteína Gla da matriz, que direcionam o cálcio para os ossos e previnem sua deposição nas artérias, complementando a ação da vitamina D₃."
    },
    {
      question: "Posso tomar ORTRICAL junto com medicamentos anticoagulantes?",
      answer: "A vitamina K₂ pode interferir com anticoagulantes cumarínicos como a varfarina. Se você utiliza estes medicamentos, consulte seu médico antes de usar o ORTRICAL, pois pode ser necessário monitorar o INR."
    },
    {
      question: "O ORTRICAL pode ser utilizado na pós-menopausa?",
      answer: "Sim. O ORTRICAL oferece suporte à mineralização óssea adequada durante a pós-menopausa, período em que há maior risco de perda óssea. Recomenda-se orientação profissional para adequação da dosagem."
    },
    {
      question: "Quanto tempo leva para sentir os resultados?",
      answer: "Por se tratar de um suplemento para saúde óssea, os resultados de manutenção da densidade mineral óssea são cumulativos e de longo prazo, sendo recomendado o uso contínuo conforme orientação profissional."
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ORTRICAL",
    "image": "https://www.orthosais.com.br/images/ortrical.png",
    "description": "Suplemento alimentar com cálcio citrato-malato, magnésio bisglicinato, vitamina D₃ e vitamina K₂ para manutenção da densidade mineral óssea.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/ortrical",
      "priceCurrency": "BRL",
      "price": "189.90",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "92"
    }
  };

  return (
    <>
      {/* Esquema de dados estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Custom Header for ORTRICAL */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            ORTRICAL<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Saúde Óssea Avançada
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
            <span className="text-amber-600">ORTRICAL</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/ortrical.png"
                alt="Frasco de ORTRICAL"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Saúde Óssea Completa
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 189,90
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Frasco com 60 comprimidos revestidos
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>Cálcio Citrato-Malato + Magnésio Bisglicinato + Vitamina D₃ + Vitamina K₂</li>
                <li>Manutenção da densidade mineral óssea</li>
                <li>Suporte à mineralização óssea adequada</li>
                <li>Equilíbrio eletrolítico e funcionamento normal de músculos e nervos</li>
                <li>Fórmula completa para saúde óssea</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: "ortrical",
                    name: "ORTRICAL",
                    price: 189.90,
                    imageSrc: "/images/ortrical.png"
                  });
                }}
                className="inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Adicionar ao carrinho
              </button>
              
              <a
                href="#informacoes"
                className="inline-block text-center bg-white border border-amber-600 text-amber-600 font-medium py-3 px-8 rounded-md hover:bg-amber-50 transition-all duration-300"
              >
                Ver mais informações
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Produto */}
      <BenefitsBanner
        title="Benefícios do ORTRICAL"
        description="Conheça as vantagens exclusivas do nosso suplemento para saúde óssea"
        benefits={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Fórmula Completa",
            description: "Combinação ideal de nutrientes essenciais para saúde óssea: cálcio de alta absorção, magnésio, vitaminas D₃ e K₂"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Alta Biodisponibilidade",
            description: "Cálcio citrato-malato com absorção superior, independente do pH gástrico, ideal para todas as idades"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Sinergia Perfeita",
            description: "Vitamina K₂ (MK-7) direciona o cálcio para os ossos e não para as artérias, complementando a ação da vitamina D₃"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Fórmula Equilibrada",
            description: "Proporção ideal de cálcio, magnésio, boro e manganês para otimizar a mineralização óssea"
          }
        ]}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o ORTRICAL</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O ORTRICAL é um suplemento alimentar premium desenvolvido especificamente para oferecer suporte completo à saúde óssea e manutenção da densidade mineral óssea em adultos e idosos.</p>
              
              <p className="mt-4">Nossa fórmula exclusiva combina componentes essenciais para a saúde óssea: Cálcio Citrato-Malato, Magnésio Bisglicinato, Vitamina D₃, Vitamina K₂ (MK-7), complementados por boro e manganês quelados.</p>
              
              <p className="mt-4">Cada ingrediente foi selecionado com base em evidências científicas e combinados em proporções ideais para maximizar a sinergia entre eles, oferecendo um suporte ósseo completo e eficaz.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Indicações</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Manutenção da densidade mineral óssea e prevenção da perda óssea em adultos e idosos</li>
                <li>Suporte à mineralização óssea adequada durante gestação, lactação e pós-menopausa (sob orientação profissional)</li>
                <li>Equilíbrio eletrolítico e funcionamento normal de músculos e nervos</li>
                <li>Suporte para praticantes de atividades físicas e desportistas</li>
                <li>Apoio à saúde óssea em períodos de maior demanda de minerais</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Modo de Uso</h4>
              <p>Ingerir 2 comprimidos ao dia (juntos ou fracionados), preferencialmente junto às refeições principais, ou conforme orientação de médico ou nutricionista.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Composição</h4>
              <p>Cada dose (2 comprimidos) contém:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>600 mg de cálcio elementar (a partir de cálcio citrato-malato)</li>
                <li>300 mg de magnésio elementar (bisglicinato quelado)</li>
                <li>50 µg (2.000 UI) de vitamina D₃ (colecalciferol)</li>
                <li>90 µg de vitamina K₂ (menaquinona-7)</li>
                <li>2 mg de boro (quelato)</li>
                <li>1 mg de manganês (quelato)</li>
              </ul>
              <p className="mt-2">Excipientes: celulose microcristalina, dióxido de silício, estearato de magnésio vegetal. NÃO CONTÉM GLÚTEN.</p>
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
        description="O ORTRICAL é produzido seguindo os mais rigorosos padrões de qualidade"
      />

      {/* Segurança do Produto */}
      <ProductSafety safetyInfo={safetyInfo} />

      {/* FAQ */}
      <ProductFAQ faqs={faqs} />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductId="ortrical"
        title="Produtos Relacionados"
        suggestedProducts={[
          {
            id: "cientific-synovial",
            name: "Cientific Synovial",
            description: "Suplemento premium para saúde articular com Glucosamina, Condroitina, MSM e Ácido Hialurônico.",
            price: 199.90,
            imageSrc: "/images/cientificsy.png",
            category: "Linha Saúde"
          },
          {
            id: "viscomove",
            name: "VISCOMOVE",
            description: "Suplemento para saúde articular com colágeno tipo II não-desnaturado.",
            price: 139.90,
            imageSrc: "/images/viscomove.png",
            category: "Linha Saúde"
          },
          {
            id: "viscolivess",
            name: "VISCOLIVESS",
            description: "Suplemento de ômega 3 de alta pureza para saúde cardiovascular e articular.",
            price: 89.90,
            imageSrc: "/images/viscolivess.png",
            category: "Linha Saúde"
          },
          {
            id: "flandor",
            name: "FLANDOR",
            description: "Suplemento anti-inflamatório e antioxidante de alta potência com 95% de curcuminoides ativos.",
            price: 159.90,
            imageSrc: "/images/flandor.png",
            category: "Linha Saúde"
          }
        ]}
      />
    </>
  );
}
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
      "Produto não é medicamento; não exceder a recomendação diária",
      "Suspender o uso em caso de reações adversas (náusea, prurido)",
      "Manter fora do alcance de crianças",
      "NÃO CONTÉM GLÚTEN"
    ],
    contraindications: [
      "Hipersensibilidade a qualquer componente da fórmula",
      "Gestantes, lactantes e menores de 19 anos sem orientação profissional",
      "Portadores de insuficiência renal ou hepática graves devem consultar médico",
      "Pacientes usando anticoagulantes cumarínicos: monitorar INR devido ao conteúdo de boro"
    ],
    sideEffects: [
      "Gastrointestinais leves: distensão, gases, diarreia (< 2 %)",
      "Reações cutâneas de hipersensibilidade são raras",
      "Relatos de cefaleia leve em indivíduos sensíveis a MSM"
    ],
    storage: "Armazenar em local seco e fresco (15–30 °C), protegido de luz e umidade. Não utilizar se o lacre estiver violado.",
    shelfLife: "Validade: vide data impressa no frasco."
  };

  const faqs = [
    {
      question: "Como o MSM atua na saúde articular?",
      answer: "O MSM (Metilsulfonilmetano) é uma fonte orgânica de enxofre que participa da síntese de colágeno e tem ação antioxidante. O enxofre é essencial para a formação de tecidos conectivos e contribui para a redução do desconforto articular."
    },
    {
      question: "Qual a diferença do Colágeno Tipo II não hidrolisado?",
      answer: "O Colágeno Tipo II não hidrolisado fornece peptídeos que modulam a resposta imune através de um mecanismo chamado tolerância oral. Diferente do colágeno hidrolisado, sua estrutura preservada permite estimular diretamente os condrócitos (células da cartilagem)."
    },
    {
      question: "Para que serve o Ácido Hialurônico nesta fórmula?",
      answer: "O Ácido Hialurônico aumenta a viscosidade do líquido sinovial e reduz o atrito articular. É um componente natural do líquido sinovial que atua como lubrificante e amortecedor nas articulações."
    },
    {
      question: "Qual a importância do Boro para as articulações?",
      answer: "O Boro é um mineral traço que auxilia no metabolismo de cálcio, magnésio e vitamina D, favorecendo a saúde óssea e articular. Estudos sugerem que ele contribui para a redução de marcadores inflamatórios associados ao desconforto articular."
    },
    {
      question: "Quanto tempo leva para observar resultados?",
      answer: "Os resultados podem variar de pessoa para pessoa, mas geralmente são observados benefícios após 4-6 semanas de uso contínuo e regular, especialmente quando associado a uma alimentação equilibrada e atividade física adequada."
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "VISCOMOVE",
    "image": "https://www.orthosais.com.br/images/viscomove.png",
    "description": "Suplemento alimentar premium para saúde articular com MSM, Colágeno Tipo II não hidrolisado, Ácido Hialurônico e Boro para manutenção da mobilidade e conforto articular.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/viscomove",
      "priceCurrency": "BRL",
      "price": "139.90",
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

      {/* Custom Header for VISCOMOVE */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            VISCOMOVE<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Suporte Completo para Articulações
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
            <span className="text-amber-600">VISCOMOVE</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/viscomove.png"
                alt="Frasco de VISCOMOVE"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Saúde Articular e Mobilidade
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 139,90
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Frasco com 30 comprimidos de 1,2g
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>MSM (500mg) + Colágeno Tipo II não hidrolisado (40mg)</li>
                <li>Ácido Hialurônico (80mg) + Boro (2mg)</li>
                <li>Suporte à saúde da cartilagem e líquido sinovial</li>
                <li>Auxílio à manutenção da mobilidade e conforto articular</li>
                <li>Fórmula completa de alta absorção</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: "viscomove",
                    name: "VISCOMOVE",
                    price: 139.90,
                    imageSrc: "/images/viscomove.png"
                  });
                }}
                className="inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              >
                Adicionar ao carrinho
              </button>
              
              <Link
                href="/produtos/viscomove"
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
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Produto */}
      <BenefitsBanner
        title="Benefícios do VISCOMOVE"
        description="Conheça as vantagens exclusivas do nosso suplemento para saúde articular"
        benefits={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            title: "Suporte à Cartilagem",
            description: "MSM e Colágeno Tipo II contribuem para a manutenção da integridade da cartilagem articular"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Lubrificação Articular",
            description: "Ácido Hialurônico aumenta a viscosidade do líquido sinovial e reduz o atrito entre as articulações"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Saúde Óssea",
            description: "Boro auxilia no metabolismo de cálcio, magnésio e vitamina D, favorecendo a estrutura óssea"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Ação Antioxidante",
            description: "MSM possui propriedades antioxidantes que ajudam a combater o estresse oxidativo nas articulações"
          }
        ]}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o VISCOMOVE</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O VISCOMOVE é um suplemento alimentar premium desenvolvido especificamente para oferecer suporte completo à saúde articular, contribuindo para a manutenção da mobilidade e conforto nas atividades diárias.</p>
              
              <p className="mt-4">Nossa fórmula exclusiva combina quatro ingredientes ativos essenciais: MSM (metilsulfonilmetano), Colágeno Tipo II não hidrolisado, Ácido Hialurônico e Boro, cada um desempenhando um papel específico na saúde das articulações.</p>
              
              <p className="mt-4">Cada componente foi selecionado com base em evidências científicas e combinados em proporções ideais para maximizar a sinergia entre eles, oferecendo um suporte articular completo.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Indicações</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Auxílio à manutenção da mobilidade e conforto articular</li>
                <li>Contribui para integridade da cartilagem e líquido sinovial</li>
                <li>Suporte à saúde óssea em adultos e idosos</li>
                <li>Apoio à qualidade de vida em idades avançadas</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Modo de Uso</h4>
              <p>Ingerir 1 comprimido ao dia, preferencialmente junto à principal refeição, ou conforme orientação de médico/nutricionista.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Composição</h4>
              <p>Cada comprimido (1,2 g) contém:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>MSM (metilsulfonilmetano): 500 mg</li>
                <li>Colágeno Tipo II não hidrolisado: 40 mg</li>
                <li>Ácido Hialurônico: 80 mg</li>
                <li>Boro (quelato): 2 mg</li>
              </ul>
              <p className="mt-2">Excipientes: celulose microcristalina, estearato de magnésio vegetal, dióxido de silício. NÃO CONTÉM GLÚTEN.</p>
              
              <h4 className="text-xl font-semibold mt-6 mb-4">Informação Nutricional</h4>
              <p>Valor energético: 5 kcal (0% VD)</p>
              <p>Proteínas totais: 0,6 g (1% VD)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <GuaranteeBanner
        title="Nossa Garantia de Qualidade"
        description="Compromisso com a excelência em cada comprimido"
        features={[
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Ingredientes Premium",
            description: "Matérias-primas selecionadas e testadas para garantir pureza e potência"
          },
          {
            icon: (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            ),
            title: "Produção Controlada",
            description: "Fabricação seguindo rigorosos padrões de qualidade e boas práticas"
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
        description="O VISCOMOVE é produzido seguindo os mais rigorosos padrões de qualidade"
      />

      {/* Segurança do Produto */}
      <ProductSafety safetyInfo={safetyInfo} />

      {/* FAQ */}
      <ProductFAQ faqs={faqs} />

      {/* Produtos Relacionados */}
      <RelatedProducts 
        currentProductSlug="viscomove"
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
            slug: "flandor",
            name: "FLANDOR",
            description: "Suplemento anti-inflamatório e antioxidante de alta potência com 95% de curcuminoides ativos.",
            price: 159.90,
            imageSrc: "/images/flandor.png",
            category: "Linha Saúde"
          },
          {
            slug: "viscolivess",
            name: "VISCOLIVE SS",
            description: "Suplemento com colágeno hidrolisado, BCAAs e complexo vitamínico-mineral para saúde articular, muscular e óssea.",
            price: 189.90,
            imageSrc: "/images/viscolivess.png",
            category: "Linha Saúde"
          }
        ]}
      />
    </>
  );
} 
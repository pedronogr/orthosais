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
      "Gestantes, lactantes e menores de 19 anos somente com acompanhamento profissional"
    ],
    contraindications: [
      "Hipersensibilidade a qualquer componente da fórmula",
      "Insuficiência renal grave (clearance creatinina < 30 mL/min) sem orientação médica",
      "Pacientes em uso de antibióticos tetraciclinas ou bisfosfonatos devem espaçar 2 h entre as doses"
    ],
    sideEffects: [
      "Pode ocorrer efeito laxativo leve em doses elevadas",
      "Gastrointestinais: fezes amolecidas, cólica leve (≤ 3%)",
      "Raros: sonolência ou tontura passageira em indivíduos sensíveis"
    ],
    storage: "Conservar em local seco e fresco (15–30 °C), protegido da luz e umidade. Não utilizar se o lacre de segurança estiver violado.",
    shelfLife: "Verificar data de validade no frasco."
  };

  const faqs = [
    {
      question: "Para que serve o Magnésio Bisglicinato?",
      answer: "O Magnésio Bisglicinato é uma forma quelada de magnésio com alta biodisponibilidade, que atua como cofator de mais de 300 enzimas envolvidas na produção de ATP, contração muscular e transmissão nervosa. Ele contribui para o equilíbrio eletrolítico, redução de cansaço e fadiga, e oferece suporte à síntese proteica, metabolismo energético e saúde óssea."
    },
    {
      question: "O que significa Bisglicinato Quelado?",
      answer: "Bisglicinato Quelado significa que o magnésio está ligado a duas moléculas de glicina, formando um complexo estável. Esta forma é mais bem absorvida pelo organismo e causa menos efeitos colaterais gastrointestinais comparada a outras formas de magnésio."
    },
    {
      question: "Por que ALLMAG contém Vitamina B6?",
      answer: "A Vitamina B6 foi adicionada à fórmula porque potencializa a absorção do magnésio pelo organismo e participa da síntese de neurotransmissores importantes para a função nervosa. Esta combinação aumenta a eficácia do suplemento."
    },
    {
      question: "Quanto tempo leva para sentir os benefícios?",
      answer: "Os resultados podem variar de pessoa para pessoa. Alguns benefícios como relaxamento muscular podem ser percebidos em poucos dias, enquanto outros efeitos metabólicos podem levar algumas semanas de uso regular e contínuo."
    },
    {
      question: "Posso tomar ALLMAG junto com outros suplementos ou medicamentos?",
      answer: "É recomendável consultar um profissional de saúde antes de combinar suplementos. No caso de medicamentos, especialmente antibióticos da classe das tetraciclinas ou bisfosfonatos, deve-se respeitar um intervalo de pelo menos 2 horas entre as doses."
    }
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Alta Biodisponibilidade",
      description: "Forma quelada com glicina que garante melhor absorção e aproveitamento pelo organismo"
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Conforto Digestivo",
      description: "Menor efeito laxativo comparado a outras formas de magnésio disponíveis no mercado"
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Sinergia com Vitamina B6",
      description: "Combinação ideal que potencializa a absorção do magnésio e a síntese de neurotransmissores"
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Qualidade Superior",
      description: "Matérias-primas de alta pureza e procedência, garantindo eficácia e segurança"
    }
  ];

  const guarantees = [
    {
      title: "Qualidade Certificada",
      description: "Suplemento produzido seguindo rigorosos padrões de qualidade e pureza",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Melhor Biodisponibilidade",
      description: "Forma quelada que garante absorção superior e melhor aproveitamento",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Conforto Digestivo",
      description: "Formulação que minimiza efeitos gastrointestinais indesejáveis",
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const suggestedProducts = [
    {
      id: "viscomove",
      name: "VISCOMOVE",
      description: "Suplemento articular para saúde das articulações.",
      price: 159.90,
      imageSrc: "/images/viscomove.png"
    },
    {
      id: "ortrical",
      name: "ORTRICAL",
      description: "Suplemento de cálcio para saúde óssea.",
      price: 52.90,
      imageSrc: "/images/ortrical.png"
    },
    {
      id: "cientific-synovial",
      name: "CIENTIFIC SYNOVIAL",
      description: "Viscossuplementação para tratamento da osteoartrite.",
      price: 2499.90,
      imageSrc: "/images/cientificsy.png"
    }
  ];

  // Esquema de dados estruturados para o produto
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ALLMAG",
    "image": "https://www.orthosais.com.br/images/allmag.png",
    "description": "Suplemento de Magnésio Bisglicinato Quelado com Vitamina B6. Auxiliar na manutenção de funções musculares e neurológicas normais.",
    "brand": {
      "@type": "Brand",
      "name": "Orthosais"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.orthosais.com.br/produtos/allmag",
      "priceCurrency": "BRL",
      "price": "86.49",
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

      {/* Custom Header for ALLMAG */}
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            ALLMAG<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">
            Magnésio Bisglicinato Quelado + Vitamina B6
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
            <span className="text-amber-600">ALLMAG</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/allmag.png"
                alt="Frasco de ALLMAG"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Magnésio Bisglicinato Quelado + Vitamina B6
            </h2>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-amber-600">
                R$ 86,49
              </span>
              <span className="text-gray-500 text-sm ml-2">
                Frasco com 120 cápsulas de 500 mg
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>500 mg Magnésio Bisglicinato Quelado (150 mg Mg elementar)</li>
                <li>1,4 mg Vitamina B6 (100% VD)</li>
                <li>Alta biodisponibilidade e menor efeito laxativo</li>
                <li>Frasco econômico com 120 cápsulas</li>
                <li>Fórmula completa para saúde muscular e neurológica</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: "allmag",
                    name: "ALLMAG",
                    price: 86.49,
                    imageSrc: "/images/allmag.png"
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
        title="Benefícios do ALLMAG"
        description="Conheça as vantagens exclusivas do nosso suplemento de magnésio"
        benefits={benefits}
      />

      {/* Informações do Produto */}
      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Sobre o ALLMAG</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O ALLMAG é um suplemento alimentar premium desenvolvido com Magnésio Bisglicinato Quelado e Vitamina B6, destinado a auxiliar na manutenção de funções musculares e neurológicas normais.</p>
              
              <p className="mt-4">Cada cápsula contém 500 mg de Magnésio Bisglicinato Quelado (fornecendo 150 mg de magnésio elementar, equivalente a 58% do valor diário recomendado) e 1,4 mg de Vitamina B6 (cloridrato de piridoxina, 100% do valor diário recomendado).</p>
              
              <p className="mt-4">A forma quelada do magnésio com glicina aumenta significativamente sua absorção e reduz os efeitos gastrointestinais indesejáveis comuns em outras formas de magnésio, como óxido ou citrato.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Indicações</h3>
            <div className="prose max-w-none text-gray-700">
              <ul className="space-y-2">
                <li>Auxiliar na manutenção de funções musculares e neurológicas normais</li>
                <li>Contribuir para o equilíbrio eletrolítico e redução de cansaço e fadiga</li>
                <li>Suporte à síntese proteica, metabolismo energético e saúde óssea</li>
                <li>Complementação da dieta para pessoas com ingestão insuficiente de magnésio</li>
                <li>Suporte durante períodos de maior demanda metabólica ou estresse físico</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Como Funciona</h3>
            <div className="prose max-w-none text-gray-700">
              <p>O magnésio é um mineral essencial que atua como cofator em mais de 300 enzimas envolvidas em diversos processos bioquímicos no corpo humano:</p>
              
              <ul className="mt-4 space-y-2">
                <li>Produção de energia: participa do metabolismo de carboidratos e da síntese de ATP</li>
                <li>Contração muscular: regula a ativação dos filamentos de actina e miosina</li>
                <li>Transmissão nervosa: equilibra a excitabilidade neuronal e a liberação de neurotransmissores</li>
                <li>Formação óssea: necessário para a mineralização adequada dos ossos</li>
                <li>Síntese proteica: essencial para a produção de proteínas estruturais e enzimáticas</li>
              </ul>
              
              <p className="mt-4">A Vitamina B6 adicionada potencializa a absorção do magnésio e participa da síntese de neurotransmissores importantes como serotonina, dopamina e GABA, complementando a ação do magnésio na função neurológica.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Posologia e Modo de Usar</h3>
            <div className="prose max-w-none text-gray-700">
              <p>Ingerir 1 cápsula, 1–2 vezes ao dia, com água, preferencialmente junto às refeições. Não mastigar as cápsulas.</p>
              
              <p className="mt-4 text-sm italic">Se você esquecer de tomar uma dose: tome assim que lembrar; se faltarem menos de 6 horas para a próxima dose, pule a dose esquecida; não tome dose dupla para compensar.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Informações Nutricionais</h3>
            <div className="prose max-w-none text-gray-700">
              <p className="font-medium">Informações por cápsula de 500 mg:</p>
              
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">Nutrientes</th>
                    <th className="p-2 text-right border">Quantidade</th>
                    <th className="p-2 text-right border">% VD*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Valor energético</td>
                    <td className="p-2 text-right border">2 kcal</td>
                    <td className="p-2 text-right border">0%</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Magnésio elementar</td>
                    <td className="p-2 text-right border">150 mg</td>
                    <td className="p-2 text-right border">58%</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Vitamina B6</td>
                    <td className="p-2 text-right border">1,4 mg</td>
                    <td className="p-2 text-right border">100%</td>
                  </tr>
                </tbody>
              </table>
              
              <p className="mt-2 text-sm">* Percentual de valores diários com base em uma dieta de 2.000 kcal.</p>
              <p className="mt-2 text-sm">Excipientes: gelatina, água purificada, dióxido de silício; NÃO CONTÉM GLÚTEN</p>
            </div>
          </div>
        </div>
      </section>

      {/* Segurança do Produto */}
      <ProductSafety
        warnings={safetyInfo?.warnings || []}
        contraindications={safetyInfo?.contraindications || []}
        sideEffects={safetyInfo?.sideEffects || []}
        storage={safetyInfo?.storage || ''}
        shelfLife={safetyInfo?.shelfLife || ''}
      />

      {/* FAQ - Perguntas Frequentes */}
      <ProductFAQ
        title="Perguntas Frequentes sobre ALLMAG"
        description="Tire suas dúvidas sobre nosso suplemento de magnésio"
        faqs={faqs || []}
      />

      {/* Garantias */}
      <GuaranteeBanner
        title="Garantias ALLMAG"
        guarantees={guarantees || []}
      />

      {/* Certificações */}
      <CertificationsSection />

      {/* Produtos Relacionados */}
      <RelatedProducts
        currentProductId="allmag"
        suggestedProducts={suggestedProducts || []}
      />
    </>
  );
} 
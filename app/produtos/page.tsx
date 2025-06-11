import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function ProdutosPage() {
  // Dados dos produtos
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
      oldPrice: 52.90,
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
      oldPrice: 49.90,
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

  // Categorias únicas
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Nossos Produtos</h1>
            <p className="text-lg mb-0">
              Conheça nossa linha completa de produtos farmacêuticos de alta qualidade, 
              desenvolvidos para proteção e promoção da saúde.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filtros */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-hover">TODOS</button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                className="bg-white text-primary border border-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100"
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
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
        </div>
      </section>
      
      {/* Informações Adicionais */}
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
                entre em contato com nossa equipe comercial.
              </p>
              <Link href="/contato" className="inline-block bg-secondary text-white px-6 py-2 rounded-md font-medium hover:bg-secondary-hover">
                FALE COM NOSSA EQUIPE
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
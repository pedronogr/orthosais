import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import PromoBanner from './components/PromoBanner';
import ValueCard from './components/ValueCard';
import CertificationsSection from './components/CertificationsSection';
import TestimonialsSection from './components/TestimonialsSection';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageSrc: string;
  category: string;
}

export default function Home() {
  // Dados dos produtos
  const products: Product[] = [];

  const newProducts: Product[] = [
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
      description: "Formulação patenteada de curcumina com propriedades antioxidantes e anti-inflamatórias.",
      price: 159.90,
      imageSrc: "/images/flandor.png",
      category: "Linha Vida"
    },
    {
      id: "viscolive-ss",
      name: "VISCOLIVE SS",
      description: "SUPLEMENTO ALIMENTAR DE COLÁGENO, BCAA, VITAMINAS E MINERAIS",
      price: 189.90,
      imageSrc: "/images/viscolivess.png",
      category: "Linha Vida"
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[500px] relative overflow-hidden">
          <Image 
            src="/images/banner.svg" 
            alt="Orthosais Farma - Portas abertas para a Proteção a VIDA" 
            fill 
            priority
            className="object-cover"
          />
          {/* Overlay com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/40 to-secondary/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
                Proteção e Qualidade para sua Vida
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow">
                Produtos farmacêuticos de alta qualidade, desenvolvidos com tecnologia e inovação
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Link 
                  href="/produtos" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white/10"
                  style={{ color: '#fff', opacity: 1, filter: 'none' }}
                >
                  CONHEÇA NOSSOS PRODUTOS
                </Link>
                <Link 
                  href="/sobre" 
                  className="bg-white/90 hover:bg-white text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-primary/10 mx-2"
                  style={{ color: '#e53e3e', opacity: 1, filter: 'none' }}
                >
                  SAIBA MAIS
                </Link>
              </div>
            </div>
          </div>
          {/* Curva decorativa na base do banner */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none" style={{height: '60px'}}>
            <svg viewBox="0 0 500 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0,0 C150,60 350,0 500,60 L500,60 L0,60 Z" fill="#fff" fillOpacity="0.95" />
            </svg>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">SOBRE A ORTHOSAIS FARMA</h2>
            <p className="text-lg mb-8">
              A Orthosais Farma com mais de um ano no mercado brasileiro, possui uma missão bem definida: 
              oferecer aos nossos clientes produtos de extrema qualidade, voltados para a PROTEÇÃO a VIDA, 
              com diferenciais farmacêuticos adaptados a nossa população.
            </p>
            <p className="text-lg mb-8">
              Sempre atenta as necessidades do mercado, dispomos de uma equipe técnica, 
              voltada a pesquisa e inovação tecnológica.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/sobre" 
                className="bg-white/90 hover:bg-white text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-primary/10 mx-2"
                style={{ color: '#e53e3e', opacity: 1, filter: 'none' }}
              >
                SAIBA MAIS
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Valores Institucionais */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard 
              title="EXCELÊNCIA FARMACÊUTICA"
              description="Desenvolvemos produtos com os mais elevados padrões de qualidade, seguindo rigorosos protocolos farmacêuticos e regulatórios para garantir eficácia e segurança."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
              borderColor="border-secondary"
              bgColor="bg-white"
              textColor="text-gray-700"
            />
            <ValueCard 
              title="INOVAÇÃO TECNOLÓGICA"
              description="Investimos continuamente em pesquisa científica para o desenvolvimento de formulações inovadoras que atendam às necessidades específicas da população brasileira."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              borderColor="border-primary"
              bgColor="bg-white"
              textColor="text-gray-700"
            />
            <ValueCard 
              title="RESPONSABILIDADE CORPORATIVA"
              description="Comprometemo-nos com práticas éticas de negócio, transparência em todas as operações e responsabilidade social, contribuindo para o avanço da saúde pública brasileira."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              borderColor="border-secondary"
              bgColor="bg-white"
              textColor="text-gray-700"
            />
            <ValueCard 
              title="COMPROMISSO COM RESULTADOS"
              description="Focamos no desenvolvimento de soluções farmacêuticas eficazes, cientificamente comprovadas, que fazem diferença real na saúde e qualidade de vida das pessoas."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              borderColor="border-primary"
              bgColor="bg-white"
              textColor="text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">NOSSOS PRODUTOS</h2>
          <p className="text-center text-secondary font-medium mb-10">Soluções farmacêuticas de alta qualidade</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newProducts.map((product, index) => (
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
          <div className="text-center mt-10">
            <Link href="/produtos" className="inline-block bg-secondary text-white px-8 py-3 rounded-md font-medium hover:bg-secondary-hover"
              style={{ color: '#fff', opacity: 1, filter: 'none' }}>
              VER TODOS OS PRODUTOS
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Linhas de Produtos */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">NOSSAS LINHAS DE PRODUTOS</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produtos" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover" style={{ color: '#fff', opacity: 1, filter: 'none' }}>LINHA PROTEÇÃO</Link>
            <Link href="/produtos" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary-hover" style={{ color: '#fff', opacity: 1, filter: 'none' }}>LINHA VIDA</Link>
            <Link href="/produtos" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover" style={{ color: '#fff', opacity: 1, filter: 'none' }}>LINHA SAÚDE</Link>
            <Link href="/produtos" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary-hover" style={{ color: '#fff', opacity: 1, filter: 'none' }}>LINHA ESPECIALIZADA</Link>
          </div>
        </div>
      </section>
      
      {/* Certificações e Reconhecimentos */}
      <CertificationsSection />

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">ENTRE EM CONTATO</h2>
            <p className="text-lg mb-8">
              A Orthosais Farma é uma porta moderna e segura para buscar sempre soluções 
              a proteção em produtos farmacêuticos. Entre em contato conosco.
            </p>
            <Link href="/contato" className="inline-block bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-hover" style={{ color: '#fff', opacity: 1, filter: 'none' }}>
              FALE CONOSCO
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

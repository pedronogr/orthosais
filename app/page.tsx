import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import PromoBanner from './components/PromoBanner';

export default function Home() {
  // Dados dos produtos
  const products = [
    {
      name: "OrthoVit Complex",
      description: "Suplemento vitamínico com fórmula exclusiva para proteção e fortalecimento do sistema imunológico.",
      price: 39.90,
      imageSrc: "/images/product1.svg"
    },
    {
      name: "OrthoProtect Plus",
      description: "Cápsulas de proteção avançada com combinação de ingredientes naturais para promover saúde e bem-estar.",
      price: 45.90,
      oldPrice: 52.90,
      imageSrc: "/images/product2.svg"
    },
    {
      name: "OrthoDefense 30 cápsulas",
      description: "Suplemento com probióticos e prebióticos que auxiliam na proteção da flora intestinal e fortalecimento das defesas naturais.",
      price: 32.50,
      imageSrc: "/images/product3.svg"
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[400px] relative">
          <Image 
            src="/images/banner.svg" 
            alt="Orthosais Farma - Portas abertas para a Proteção a VIDA" 
            fill 
            priority
            className="object-cover"
          />
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
              <Link href="/sobre" className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-hover mx-2">
                SAIBA MAIS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">NOSSOS PRODUTOS</h2>
          <p className="text-center text-secondary font-medium mb-10">Soluções farmacêuticas de alta qualidade</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="text-center mt-10">
            <Link href="/produtos" className="inline-block bg-secondary text-white px-8 py-3 rounded-md font-medium hover:bg-secondary-hover">
              VER TODOS OS PRODUTOS
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">NOSSOS DIFERENCIAIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Diferencial 1 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos desenvolvidos com os mais altos padrões de qualidade e segurança.</p>
            </div>
            
            {/* Diferencial 2 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Pesquisa e Inovação</h3>
              <p className="text-gray-600">Equipe técnica dedicada à pesquisa contínua e desenvolvimento de soluções inovadoras.</p>
            </div>
            
            {/* Diferencial 3 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Adaptados à População</h3>
              <p className="text-gray-600">Produtos desenvolvidos especificamente para atender às necessidades da população brasileira.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Linhas de Produtos */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">NOSSAS LINHAS DE PRODUTOS</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produtos" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover">LINHA PROTEÇÃO</Link>
            <Link href="/produtos" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary-hover">LINHA VIDA</Link>
            <Link href="/produtos" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover">LINHA SAÚDE</Link>
            <Link href="/produtos" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary-hover">LINHA ESPECIALIZADA</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">ENTRE EM CONTATO</h2>
            <p className="text-lg mb-8">
              A Orthosais Farma é uma porta moderna e segura para buscar sempre soluções 
              a proteção em produtos farmacêuticos. Entre em contato conosco.
            </p>
            <Link href="/contato" className="inline-block bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-hover">
              FALE CONOSCO
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobrePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Sobre a Orthosais Farma</h1>
            <p className="text-lg mb-0">
              Conheça nossa história, missão e compromisso com a saúde e bem-estar.
            </p>
          </div>
        </div>
      </section>
      
      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa História</h2>
            <p className="text-lg mb-6">
              A Orthosais Farma com mais de um ano no mercado brasileiro, nasceu com um propósito claro: 
              oferecer produtos farmacêuticos de extrema qualidade, voltados para a proteção à vida, 
              com diferenciais adaptados à população brasileira.
            </p>
            <p className="text-lg mb-6">
              Fundada por profissionais com vasta experiência no setor farmacêutico, a Orthosais 
              surgiu da percepção de que o mercado precisava de produtos que realmente atendessem 
              às necessidades específicas dos brasileiros, considerando nossa diversidade genética, 
              cultural e ambiental.
            </p>
            <p className="text-lg mb-6">
              Desde o início, investimos em pesquisa e desenvolvimento, contando com uma equipe 
              técnica altamente qualificada, dedicada à inovação tecnológica e à criação de 
              soluções farmacêuticas eficazes e seguras.
            </p>
          </div>
        </div>
      </section>
      
      {/* Nossa Missão */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa Missão</h2>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary mb-8">
              <p className="text-xl italic text-gray-700">
                "Oferecer aos nossos clientes produtos de extrema qualidade, voltados para a PROTEÇÃO a VIDA, 
                com diferenciais farmacêuticos adaptados a nossa população."
              </p>
            </div>
            <p className="text-lg mb-6">
              Trabalhamos diariamente para cumprir esta missão, mantendo-nos sempre atentos às necessidades 
              do mercado e às demandas de saúde da população brasileira. Nossa equipe técnica está constantemente 
              pesquisando e desenvolvendo novos produtos e aprimorando os existentes.
            </p>
            <p className="text-lg mb-6">
              Acreditamos que a proteção à vida vai além de simplesmente oferecer medicamentos. Envolve 
              também educação em saúde, prevenção de doenças e promoção do bem-estar integral.
            </p>
          </div>
        </div>
      </section>
      
      {/* Nossos Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-10">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-xl font-bold mb-3 text-primary">Qualidade</h3>
                <p className="text-gray-700">
                  Comprometimento com os mais altos padrões de qualidade em todos os nossos produtos e processos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
                <h3 className="text-xl font-bold mb-3 text-secondary">Inovação</h3>
                <p className="text-gray-700">
                  Busca constante por soluções inovadoras que atendam às necessidades específicas da população.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
                <h3 className="text-xl font-bold mb-3 text-secondary">Ética</h3>
                <p className="text-gray-700">
                  Atuação baseada em princípios éticos e transparentes em todos os nossos relacionamentos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-xl font-bold mb-3 text-primary">Responsabilidade Social</h3>
                <p className="text-gray-700">
                  Compromisso com o bem-estar da sociedade e com a sustentabilidade ambiental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nossa Equipe */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa Equipe</h2>
            <p className="text-lg mb-8">
              A Orthosais Farma conta com uma equipe multidisciplinar de profissionais altamente qualificados, 
              incluindo farmacêuticos, químicos, biólogos, engenheiros e especialistas em controle de qualidade.
            </p>
            <p className="text-lg mb-8">
              Nossa equipe técnica trabalha constantemente em pesquisa e desenvolvimento, buscando 
              inovações e soluções que atendam às necessidades específicas do mercado brasileiro.
            </p>
            <p className="text-lg mb-8">
              Investimos continuamente na capacitação e atualização de nossos colaboradores, 
              garantindo que estejam sempre preparados para oferecer o melhor em produtos e serviços.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Faça Parte da Nossa História</h2>
            <p className="text-lg mb-8">
              A Orthosais Farma é uma porta moderna e segura para buscar sempre soluções 
              a proteção em produtos farmacêuticos. Conheça nossos produtos e serviços.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/produtos" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium">
                NOSSOS PRODUTOS
              </Link>
              <Link href="/contato" className="bg-secondary text-white hover:bg-secondary-hover px-8 py-3 rounded-md font-medium">
                ENTRE EM CONTATO
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
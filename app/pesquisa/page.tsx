import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PesquisaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16" style={{ color: '#fff', opacity: 1, filter: 'none' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Pesquisa e Inovação</h1>
            <p className="text-lg mb-0">
              Comprometidos com o desenvolvimento de soluções inovadoras para a proteção à vida.
            </p>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa Abordagem</h2>
            <p className="text-lg mb-8">
              Na Orthosais Farma, acreditamos que a pesquisa e a inovação são fundamentais para 
              o desenvolvimento de produtos farmacêuticos que realmente façam a diferença na vida 
              das pessoas. Nossa equipe técnica trabalha constantemente para criar soluções que 
              atendam às necessidades específicas da população brasileira.
            </p>
            <p className="text-lg mb-8">
              Investimos continuamente em tecnologia e capacitação, buscando sempre estar na 
              vanguarda do setor farmacêutico e oferecer produtos de extrema qualidade, 
              seguros e eficazes.
            </p>
          </div>
        </div>
      </section>
      
      {/* Research Areas */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-10 text-center">Áreas de Pesquisa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Desenvolvimento de Fórmulas</h3>
                <p className="text-gray-700 mb-4">
                  Nossa equipe de pesquisa trabalha no desenvolvimento de fórmulas exclusivas, 
                  combinando ingredientes ativos de alta qualidade para criar produtos eficazes 
                  e seguros.
                </p>
                <p className="text-gray-700">
                  Utilizamos tecnologias avançadas para garantir a estabilidade, biodisponibilidade 
                  e eficácia dos nossos produtos.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-secondary">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">Estudos de Eficácia</h3>
                <p className="text-gray-700 mb-4">
                  Realizamos estudos para avaliar a eficácia dos nossos produtos, garantindo 
                  que eles atendam às necessidades específicas dos consumidores brasileiros.
                </p>
                <p className="text-gray-700">
                  Nossa abordagem baseada em evidências assegura que nossos produtos ofereçam 
                  benefícios reais e mensuráveis para a saúde.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-secondary">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">Pesquisa de Ingredientes Naturais</h3>
                <p className="text-gray-700 mb-4">
                  Investimos na pesquisa de ingredientes naturais, especialmente da biodiversidade 
                  brasileira, buscando componentes ativos com propriedades benéficas para a saúde.
                </p>
                <p className="text-gray-700">
                  Nossa abordagem sustentável valoriza os recursos naturais do Brasil e contribui 
                  para o desenvolvimento de produtos inovadores.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Controle de Qualidade</h3>
                <p className="text-gray-700 mb-4">
                  Desenvolvemos e aprimoramos continuamente nossos protocolos de controle de qualidade, 
                  garantindo que todos os produtos atendam aos mais altos padrões de segurança e eficácia.
                </p>
                <p className="text-gray-700">
                  Utilizamos equipamentos de última geração e metodologias validadas para assegurar 
                  a consistência e confiabilidade dos nossos produtos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Innovation Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-10 text-center">Processo de Inovação</h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                {/* Item 1 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right md:pr-12">
                      <h3 className="text-xl font-bold text-primary mb-2">Identificação de Necessidades</h3>
                      <p className="text-gray-700">
                        Analisamos as necessidades específicas da população brasileira, identificando 
                        oportunidades para o desenvolvimento de novos produtos.
                      </p>
                    </div>
                    <div className="md:pl-12"></div>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right md:pr-12"></div>
                    <div className="md:pl-12">
                      <h3 className="text-xl font-bold text-secondary mb-2">Pesquisa e Desenvolvimento</h3>
                      <p className="text-gray-700">
                        Nossa equipe técnica trabalha no desenvolvimento de fórmulas, selecionando 
                        ingredientes ativos e realizando testes preliminares.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right md:pr-12">
                      <h3 className="text-xl font-bold text-primary mb-2">Testes e Validação</h3>
                      <p className="text-gray-700">
                        Realizamos testes rigorosos para avaliar a eficácia, segurança e estabilidade 
                        dos produtos em desenvolvimento.
                      </p>
                    </div>
                    <div className="md:pl-12"></div>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right md:pr-12"></div>
                    <div className="md:pl-12">
                      <h3 className="text-xl font-bold text-secondary mb-2">Produção e Controle de Qualidade</h3>
                      <p className="text-gray-700">
                        Implementamos processos de produção seguindo as Boas Práticas de Fabricação e 
                        realizamos controles de qualidade rigorosos.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Item 5 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right md:pr-12">
                      <h3 className="text-xl font-bold text-primary mb-2">Lançamento e Monitoramento</h3>
                      <p className="text-gray-700">
                        Lançamos os produtos no mercado e monitoramos continuamente seu desempenho, 
                        coletando feedback e realizando melhorias quando necessário.
                      </p>
                    </div>
                    <div className="md:pl-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Colabore com Nossa Pesquisa</h2>
            <p className="text-lg mb-8">
              Estamos sempre abertos a parcerias com universidades, centros de pesquisa e profissionais 
              da área da saúde. Se você tem interesse em colaborar com nossos projetos de pesquisa e 
              inovação, entre em contato conosco.
            </p>
            <Link href="/contato" className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
              style={{ color: '#e53e3e', opacity: 1, filter: 'none' }}>
              ENTRE EM CONTATO
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
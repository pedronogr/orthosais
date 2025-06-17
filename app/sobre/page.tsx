import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageLayout from '../PageLayout';
import CertificationsSection from '../components/CertificationsSection';

export default function AboutPage() {
  return (
    <PageLayout 
      title="Nossa História" 
      description="Conheça a trajetória da Orthosais Farma"
      headerImageSrc="/images/about-header.jpg"
    >
      {/* História da Empresa */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Nossa Trajetória</h2>
              <p className="text-gray-700 mb-4">
                Fundada em 2010, a Orthosais Farma nasceu com a missão de desenvolver soluções farmacêuticas inovadoras 
                que realmente façam diferença na vida das pessoas. O que começou como um pequeno laboratório especializado
                em formulações ortopédicas, hoje se transformou em uma empresa de referência no setor farmacêutico brasileiro.
              </p>
              <p className="text-gray-700 mb-4">
                Nossa jornada iniciou-se quando um grupo de farmacêuticos e pesquisadores, liderados pelo Dr. Carlos Mendes, 
                identificou uma lacuna no mercado de medicamentos ortopédicos que realmente atendessem às necessidades específicas 
                dos pacientes brasileiros.
              </p>
              <p className="text-gray-700 mb-6">
                Ao longo dos anos, expandimos nossas linhas de produtos para além da ortopedia, criando soluções para 
                diversas áreas da saúde, sempre mantendo nosso compromisso com a inovação, qualidade e segurança.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-primary">13+</span>
                  <span className="text-sm text-gray-500">Anos no mercado</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-primary">4</span>
                  <span className="text-sm text-gray-500">Linhas de produtos</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-primary">50+</span>
                  <span className="text-sm text-gray-500">Produtos desenvolvidos</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-primary">27</span>
                  <span className="text-sm text-gray-500">Estados atendidos</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/about/company-history.jpg" 
                  alt="História da Orthosais Farma" 
                  width={600} 
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-primary rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">2010</div>
                  <div className="text-sm">Ano de fundação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Nossa Evolução</h2>
          
          <div className="relative">
            {/* Linha central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            
            {/* Item 1 */}
            <div className="relative z-10 mb-12">
              <div className="flex items-center flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-primary mb-2">2010</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Fundação da Orthosais</h4>
                  <p className="text-gray-600">Início das operações com foco em produtos ortopédicos e pesquisa de novas formulações.</p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 bg-white w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center z-10">
                  <div className="bg-primary w-4 h-4 rounded-full"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="relative z-10 mb-12">
              <div className="flex items-center flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 bg-white w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center z-10">
                  <div className="bg-primary w-4 h-4 rounded-full"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left">
                  <h3 className="text-xl font-bold text-primary mb-2">2014</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Lançamento da Linha Proteção</h4>
                  <p className="text-gray-600">Desenvolvimento de produtos focados na prevenção e proteção da saúde.</p>
                </div>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="relative z-10 mb-12">
              <div className="flex items-center flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-primary mb-2">2016</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Expansão Nacional</h4>
                  <p className="text-gray-600">Início da distribuição para todo o território nacional e aumento da capacidade produtiva.</p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 bg-white w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center z-10">
                  <div className="bg-primary w-4 h-4 rounded-full"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="relative z-10 mb-12">
              <div className="flex items-center flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 bg-white w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center z-10">
                  <div className="bg-primary w-4 h-4 rounded-full"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left">
                  <h3 className="text-xl font-bold text-primary mb-2">2019</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Centro de Pesquisa e Inovação</h4>
                  <p className="text-gray-600">Inauguração do centro de pesquisa e desenvolvimento dedicado à inovação farmacêutica.</p>
                </div>
              </div>
            </div>
            
            {/* Item 5 */}
            <div className="relative z-10">
              <div className="flex items-center flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-primary mb-2">2023</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Lançamento da Linha Especializada</h4>
                  <p className="text-gray-600">Desenvolvimento de produtos de alta complexidade para necessidades específicas de saúde.</p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 bg-white w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center z-10">
                  <div className="bg-primary w-4 h-4 rounded-full"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Missão, Visão e Valores (Versão resumida) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Nossos Princípios</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conheça os valores que norteiam nossa atuação e nos impulsionam a buscar a excelência todos os dias.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-4 text-center">Missão</h3>
              <p className="text-gray-700 text-center">
                Desenvolver e fornecer produtos farmacêuticos inovadores e de alta qualidade que melhorem 
                a qualidade de vida das pessoas, contribuindo para uma sociedade mais saudável.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-4 text-center">Visão</h3>
              <p className="text-gray-700 text-center">
                Ser reconhecida como referência em inovação farmacêutica, oferecendo soluções que façam a
                diferença real na saúde e bem-estar, com presença nacional e internacional.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-4 text-center">Valores</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Ética e Integridade</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Inovação Constante</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Excelência em Qualidade</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Responsabilidade Social</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Foco no Cliente</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a href="/sobre/missao-visao-valores" className="inline-flex items-center text-primary font-medium hover:underline">
              Saiba mais sobre nossa missão, visão e valores
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Certificações */}
      <CertificationsSection />
    </PageLayout>
  );
} 
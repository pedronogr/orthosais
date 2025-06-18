"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui iria a lógica para processar a inscrição na newsletter
    alert(`Email ${email} inscrito com sucesso!`);
    setEmail('');
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-10 animate-fade-in">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Receba Novidades e Atualizações</h3>
            <p className="text-white text-opacity-90 mb-6">
              Inscreva-se para receber as últimas notícias sobre produtos, pesquisas e eventos da Orthosais Farma.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Digite seu email aqui..."
                className="flex-grow px-4 py-3 rounded-md text-gray-800 bg-white border-2 border-secondary focus:outline-none focus:border-white focus:ring-2 focus:ring-white shadow-md shadow-red-800 transition-all duration-300"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="py-12 animate-fade-in">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Company Info */}
            <div className="md:col-span-1">
              <div className="mb-6 flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Orthosais Logo" 
                width={55} 
                height={55} 
                className="mr-2 transition-transform duration-300 hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
              <Image 
                src="/images/nome_logo.png" 
                alt="Orthosais Farma" 
                width={190} 
                height={40}
                className="brightness-150 transition-transform duration-300 hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
              <p className="text-gray-300 mb-6 text-sm">
                A Orthosais Farma é uma empresa brasileira dedicada ao desenvolvimento de produtos farmacêuticos de extrema qualidade, focados na proteção à vida.
            </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/orthosais/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all duration-300 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27a8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287a4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07a4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
          </div>
        </div>
        
            {/* Páginas */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-bold mb-4 text-white">Páginas</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-all duration-300">Início</Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-gray-300 hover:text-white transition-all duration-300">Sobre Nós</Link>
                </li>
                <li>
                  <Link href="/produtos" className="text-gray-300 hover:text-white transition-all duration-300">Produtos</Link>
                </li>
                <li>
                  <Link href="/pesquisa" className="text-gray-300 hover:text-white transition-all duration-300">Pesquisa e Inovação</Link>
                </li>
                <li>
                  <Link href="/contato" className="text-gray-300 hover:text-white transition-all duration-300">Contato</Link>
                </li>
                <li>
                  <Link href="/area-profissional" className="text-gray-300 hover:text-white transition-all duration-300">Área do Profissional</Link>
                </li>
              </ul>
            </div>
            
            {/* Linhas de Produtos */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-bold mb-4 text-white">Linhas de Produtos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/produtos/linha-protecao" className="text-gray-300 hover:text-white transition-all duration-300">Linha Proteção</Link>
                </li>
                <li>
                  <Link href="/produtos/linha-vida" className="text-gray-300 hover:text-white transition-all duration-300">Linha Vida</Link>
                </li>
                <li>
                  <Link href="/produtos/linha-saude" className="text-gray-300 hover:text-white transition-all duration-300">Linha Saúde</Link>
                </li>
                <li>
                  <Link href="/produtos/linha-especializada" className="text-gray-300 hover:text-white transition-all duration-300">Linha Especializada</Link>
                </li>
              </ul>
              
              <h4 className="text-lg font-bold mt-6 mb-4 text-white">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-all duration-300">Perguntas Frequentes</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-all duration-300">Blog</Link>
                </li>
                <li>
                  <Link href="/farmacovigilancia" className="text-gray-300 hover:text-white transition-all duration-300">Farmacovigilância</Link>
                </li>
              </ul>
            </div>
            
            {/* Contato e Informações Legais */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
              <div className="space-y-3 mb-6">
                <p className="flex items-start text-gray-300 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Av. Exemplo, 1234<br />Bairro, Cidade - UF, CEP: 00000-000</span>
                </p>
                <p className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(85) 9967-3300</span>
                </p>
                <p className="flex items-center text-gray-300 hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contato@orthosais.com.br</span>
                </p>
              </div>
              
              <h4 className="text-lg font-bold mb-4 text-white">Informações Legais</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  CNPJ: XX.XXX.XXX/0001-XX<br />
                  INDÚSTRIA BRASILEIRA<br />
                  Farmacêutico Responsável:<br />
                  Dr. Nome do Responsável - CRF/XX: XXXXX
                </p>
              </div>
              
              {/* Links Legais */}
              <h4 className="text-lg font-bold mt-6 mb-4 text-white">Informações Legais</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/politica-de-privacidade" className="text-gray-300 hover:text-white transition-all duration-300">Política de Privacidade</Link>
                </li>
                <li>
                  <Link href="/termos-de-uso" className="text-gray-300 hover:text-white transition-all duration-300">Termos de Uso</Link>
                </li>
                <li>
                  <Link href="/politica-de-cookies" className="text-gray-300 hover:text-white transition-all duration-300">Política de Cookies</Link>
                </li>
                <li>
                  <Link href="/farmacovigilancia" className="text-gray-300 hover:text-white transition-all duration-300">Farmacovigilância</Link>
                </li>
              </ul>
              
              {/* Certificações */}
              <div className="mt-6">
                <h4 className="text-lg font-bold mb-3 text-white">Certificações</h4>
                <div className="flex gap-3">
                  <div className="bg-white p-1 rounded-md transition-transform duration-300 hover:scale-105">
                    <Image 
                      src="/images/certificacoes/anvisa.png" 
                      alt="ANVISA" 
                      width={60} 
                      height={30}
                      className="opacity-80"
                    />
                  </div>
                  <div className="bg-white p-1 rounded-md transition-transform duration-300 hover:scale-105">
                    <Image 
                      src="/images/certificacoes/abnt.png" 
                      alt="ABNT" 
                      width={60} 
                      height={30}
                      className="opacity-80"
                    />
                  </div>
                </div>
            </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © {currentYear} Orthosais Farma. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <Link href="/termos-de-uso" className="text-sm text-gray-400 hover:text-white transition-all duration-300">
                  Termos de Uso
                </Link>
                <Link href="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white transition-all duration-300">
                  Política de Privacidade
                </Link>
                <Link href="/lgpd" className="text-sm text-gray-400 hover:text-white transition-all duration-300">
                  LGPD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import HeaderActions from './HeaderActions';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productSubmenuOpen, setProductSubmenuOpen] = useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const productSubmenuRef = useRef<HTMLDivElement>(null);
  const aboutSubmenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Detecta o scroll para alterar a aparência do header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha os dropdowns quando clicado fora deles
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productSubmenuRef.current && !productSubmenuRef.current.contains(event.target as Node)) {
        setProductSubmenuOpen(false);
      }
      if (aboutSubmenuRef.current && !aboutSubmenuRef.current.contains(event.target as Node)) {
        setAboutSubmenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top bar - Informações de Contato */}
      <div className="bg-gray-100 py-1 text-xs hidden md:block animate-fade-in">
        <div className="container flex justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (85) 9967-3300
            </span>
            <span className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contato@orthosais.com.br
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://www.instagram.com/orthosais/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <Link href="/area-profissional" className="text-gray-600 hover:text-primary text-xs font-medium transition-colors">
              Área do Profissional
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navbar */}
      <header className={`w-full sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'shadow-sm py-3'}`}>
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <Image 
                    src="/images/logo.png" 
                    alt="Orthosais Logo" 
                    width={isScrolled ? 40 : 45} 
                    height={isScrolled ? 40 : 45} 
                    priority
                    className="mr-2 transition-all duration-300"
                  />
                  <Image 
                    src="/images/nome_logo.png" 
                    alt="Orthosais Farma" 
                    width={isScrolled ? 140 : 160} 
                    height={isScrolled ? 30 : 35} 
                    priority
                    className="transition-all duration-300"
                  />
                </div>
              </Link>
            </div>
            
            {/* Nav Links */}
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
              <Link href="/" className="nav-link py-2 transition-colors">Início</Link>
              <Link href="/sobre" className="nav-link py-2 transition-colors">Sobre Nós</Link>
              <Link href="/produtos" className="nav-link py-2 transition-colors">Produtos</Link>
              <Link href="/pesquisa" className="nav-link py-2 transition-colors">Pesquisa e Inovação</Link>
              <Link href="/contato" className="nav-link py-2 transition-colors">Contato</Link>
            </nav>
            
            {/* Search and CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-3 z-20 animate-slide-in">
                    <form className="flex items-center" action="/produtos" method="get">
                      <input
                        type="text"
                        name="q"
                        placeholder="Buscar no site..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                      <button type="submit" className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-hover transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Header Actions (Login e Carrinho) */}
              <HeaderActions />
              
              {/* CTA Button */}
              <Link
                href="/contato"
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-md transition-colors shadow"
                style={{ color: '#fff', opacity: 1, filter: 'none' }}
              >
                Fale Conosco
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-600 mr-4 hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Mobile Header Actions */}
              <div className="mr-4">
                <HeaderActions />
              </div>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden p-4 bg-white border-t border-gray-200 animate-slide-in">
            <form className="flex items-center" action="/produtos" method="get">
              <input
                type="text"
                name="q"
                placeholder="Buscar no site..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <button type="submit" className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-hover transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-base font-medium nav-link hover:bg-gray-50 rounded-md transition-colors">
                Início
              </Link>
              <Link href="/sobre" className="block px-3 py-2 text-base font-medium nav-link hover:bg-gray-50 rounded-md transition-colors">
                Sobre Nós
                    </Link>
              <Link href="/produtos" className="block px-3 py-2 text-base font-medium nav-link hover:bg-gray-50 rounded-md transition-colors">
                Produtos
                    </Link>
              <Link href="/pesquisa" className="block px-3 py-2 text-base font-medium nav-link hover:bg-gray-50 rounded-md transition-colors">
                Pesquisa e Inovação
              </Link>
              <Link href="/contato" className="block px-3 py-2 text-base font-medium nav-link hover:bg-gray-50 rounded-md transition-colors">
                Contato
                </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
} 
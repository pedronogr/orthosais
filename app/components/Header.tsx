"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <Image 
                    src="/images/logo.png" 
                    alt="Orthosais Logo" 
                    width={45} 
                    height={45} 
                    priority
                    className="mr-2"
                  />
                  <Image 
                    src="/images/nome_logo.png" 
                    alt="Orthosais Farma" 
                    width={160} 
                    height={35} 
                    priority
                  />
                </div>
              </Link>
            </div>
            {/* Nav Links */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
              <Link href="/" className="hover:text-primary">Início</Link>
              <Link href="/sobre" className="hover:text-primary">Sobre Nós</Link>
              <Link href="/produtos" className="hover:text-primary">Produtos</Link>
              <Link href="/pesquisa" className="hover:text-primary">Pesquisa e Inovação</Link>
              <Link href="/contato" className="hover:text-primary">Contato</Link>
            </nav>
            {/* Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/area-profissional" className="text-sm font-medium text-gray-700 hover:text-primary">Área do Profissional</Link>
              <Link href="/contato" className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary-hover transition">
                Fale Conosco
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="px-4 space-y-3">
              <Link href="/" className="block text-sm font-medium text-gray-700 hover:text-primary">Início</Link>
              <Link href="/sobre" className="block text-sm font-medium text-gray-700 hover:text-primary">Sobre Nós</Link>
              <Link href="/produtos" className="block text-sm font-medium text-gray-700 hover:text-primary">Produtos</Link>
              <Link href="/pesquisa" className="block text-sm font-medium text-gray-700 hover:text-primary">Pesquisa e Inovação</Link>
              <Link href="/contato" className="block text-sm font-medium text-gray-700 hover:text-primary">Contato</Link>
              <div className="pt-3 border-t border-gray-100">
                <Link href="/area-profissional" className="block text-sm font-medium text-gray-700 hover:text-primary mb-3">Área do Profissional</Link>
                <Link href="/contato" className="block bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary-hover transition w-full text-center">
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
} 
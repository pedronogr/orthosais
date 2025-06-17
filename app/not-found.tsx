"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Página não encontrada</h2>
            <p className="text-lg text-gray-600 mb-8">
              A página que você está procurando não existe ou foi movida.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Encontre o que você procura:</h3>
              <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-r-md hover:bg-primary-hover transition"
                >
                  Buscar
                </button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition">
                Voltar para a Página Inicial
              </Link>
              <Link href="/produtos" className="text-primary hover:text-primary-hover underline font-medium">
                Ver Todos os Produtos
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
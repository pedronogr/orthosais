"use client";

import { useState } from 'react';

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange
}: ProductFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-gradient-to-b from-primary to-primary-dark py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center animate-fade-in">
            Nossos Produtos
          </h1>
          
          <p className="text-lg text-white/90 mb-8 text-center animate-fade-in">
            Conheça nossa linha completa de produtos farmacêuticos de alta qualidade, 
            desenvolvidos para proteção e promoção da saúde.
          </p>
          
          {/* Barra de busca */}
          <div className="relative max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-6 py-4 pl-14 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
              />
              <svg 
                className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Filtros de categoria */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
            <button 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === 'TODOS' 
                  ? 'bg-white text-primary shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              onClick={() => onCategoryChange('TODOS')}
            >
              TODOS
            </button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.toUpperCase() 
                    ? 'bg-white text-primary shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => onCategoryChange(category.toUpperCase())}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
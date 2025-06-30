import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export const metadata = {
  title: 'Produtos - Orthosais',
  description: 'Conheça nossa linha completa de produtos para saúde e bem-estar.',
};

export default function ProdutosPage() {
  // Array de produtos
  const produtos = [
    {
      id: 'flandor',
      nome: 'Flandor',
      descricao: 'Suplemento com curcumina de alta biodisponibilidade.',
      preco: 159.90,
      imagem: '/images/flandor.png'
    },
    {
      id: 'viscomove',
      nome: 'Viscomove',
      descricao: 'Suplemento para saúde articular com colágeno tipo II.',
      preco: 139.90,
      imagem: '/images/viscomove.png'
    },
    {
      id: 'viscolivess',
      nome: 'Viscolivess',
      descricao: 'Suplemento de Ômega-3 para saúde cardiovascular.',
      preco: 89.90,
      imagem: '/images/viscolivess.png'
    },
    {
      id: 'allmag',
      nome: 'AllMag',
      descricao: 'Suplemento de magnésio com alta absorção.',
      preco: 79.90,
      imagem: '/images/allmag.png'
    },
    {
      id: 'cientific-synovial',
      nome: 'Cientific Synovial',
      descricao: 'Suplemento para saúde articular completo.',
      preco: 199.90,
      imagem: '/images/cientificsy.png'
    },
    {
      id: 'ortrical',
      nome: 'ORTRICAL',
      descricao: 'Suplemento para saúde óssea com cálcio citrato-malato.',
      preco: 189.90,
      imagem: '/images/ortrical.png'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map(produto => (
              <ProductCard 
                key={produto.id}
                id={produto.id}
                name={produto.nome}
                description={produto.descricao}
                price={produto.preco}
                imageSrc={produto.imagem}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 
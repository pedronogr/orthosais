"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

interface ProductCardProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageSrc?: string;
}

export default function ProductCard({ id, name, description, price, oldPrice, imageSrc }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();
  
  // Gerar um ID único se não for fornecido
  const productId = id || `product-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const { addToCart } = useAppContext();
  
  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name,
      price,
      imageSrc
    });
    
    // Redirecionar para a página de carrinho
    router.push('/carrinho');
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-t-4 border-amber-600 transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 bg-white rounded-md mb-4 relative overflow-hidden group">
        {imageSrc ? (
          <>
            <div className={`absolute inset-0 bg-gray-200 animate-pulse ${isImageLoaded ? 'hidden' : ''}`} />
            <Image 
              src={imageSrc} 
              alt={name} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-contain transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </div>
      
      <h3 className="font-bold mb-2 text-amber-600 text-lg transition-colors duration-300">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          {oldPrice && (
            <p className="text-sm text-gray-500 line-through">R${oldPrice.toFixed(2).replace('.', ',')}</p>
          )}
          <p className="font-bold text-lg text-amber-600">R${price.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Link 
          href={
            productId === 'flandor' ? '/produtos/flandor' : 
            productId === 'viscomove' ? '/produtos/viscomove' :
            productId === 'viscolivess' ? '/produtos/viscolivess' :
            productId === 'allmag' ? '/produtos/allmag' :
            productId === 'cientific-synovial' ? '/produtos/cientific-synovial' :
            productId === 'ortrical' ? '/produtos/ortrical' :
            `/produtos/${productId}`
          }
          className="bg-white border border-amber-600 text-amber-600 px-4 py-2 rounded-md text-sm hover:bg-amber-50 transition-all duration-300 text-center"
        >
          SAIBA MAIS
        </Link>
        <button 
          onClick={handleAddToCart}
          className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm hover:bg-amber-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
} 
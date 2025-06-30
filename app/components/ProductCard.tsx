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
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border-t-4 border-primary transition-all duration-300 animate-fade-in"
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
      
      <h3 className="font-bold mb-2 text-primary text-lg transition-colors duration-300">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          {oldPrice && (
            <p className="text-sm text-gray-500 line-through">R${oldPrice.toFixed(2).replace('.', ',')}</p>
          )}
          <p className="font-bold text-lg text-secondary">R${price.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Link 
          href={
            productId === 'flandor' ? '/produtos/flandor' : 
            productId === 'viscomove' ? '/produtos/viscomove' :
            productId === 'viscolivess' ? '/produtos/viscolivess' :
            productId === 'allmag' ? '/produtos/allmag' :
            `/produtos/${productId}`
          }
          className="bg-white border border-primary text-primary px-4 py-2 rounded-md text-sm hover:bg-gray-50 hover:border-primary-hover hover:text-primary-hover transition-all duration-300 text-center"
        >
          SAIBA MAIS
        </Link>
        <button 
          onClick={handleAddToCart}
          className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md"
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
} 
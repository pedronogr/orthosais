import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageSrc?: string;
  category?: string;
}

interface RelatedProductsProps {
  currentProductId: string;
  suggestedProducts?: Product[];
  title?: string;
}

export default function RelatedProducts({ 
  currentProductId, 
  suggestedProducts = [],
  title = "Produtos Relacionados" 
}: RelatedProductsProps) {
  // Filtrar produtos, excluindo o produto atual
  const filteredProducts = suggestedProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, 3); // Limitar a 3 produtos relacionados

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard 
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                oldPrice={product.oldPrice}
                imageSrc={product.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
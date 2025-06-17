import React from 'react';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  currentProductSlug: string;
  category: string;
  products: Array<{
    slug: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    imageSrc: string;
    category: string;
  }>;
}

export default function RelatedProducts({ currentProductSlug, category, products }: RelatedProductsProps) {
  // Filtrar produtos da mesma categoria, excluindo o produto atual
  const relatedProducts = products
    .filter(product => 
      product.category === category && 
      product.slug !== currentProductSlug
    )
    .slice(0, 3); // Limitar a 3 produtos relacionados

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Produtos Relacionados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product, index) => (
            <div 
              key={product.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard 
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
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageSrc?: string;
}

export default function ProductCard({ name, description, price, oldPrice, imageSrc }: ProductCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
      <div className="h-48 bg-gray-100 rounded-md mb-4 relative overflow-hidden">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={name} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </div>
      <h3 className="font-bold mb-2 text-primary">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div>
          {oldPrice && (
            <p className="text-sm text-gray-500 line-through">R${oldPrice.toFixed(2).replace('.', ',')}</p>
          )}
          <p className="font-bold text-lg text-secondary">R${price.toFixed(2).replace('.', ',')}</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-hover transition">
          SAIBA MAIS
        </button>
      </div>
    </div>
  );
} 
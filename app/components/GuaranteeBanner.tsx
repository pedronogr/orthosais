import React from 'react';

interface GuaranteeFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface GuaranteeBannerProps {
  title: string;
  description: string;
  features: GuaranteeFeature[];
}

export default function GuaranteeBanner({ title, description, features }: GuaranteeBannerProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Selo de Garantia */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-md">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Garantia de satisfação de 30 dias ou seu dinheiro de volta
          </p>
        </div>
      </div>
    </section>
  );
} 
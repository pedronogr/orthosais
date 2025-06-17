import React from 'react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsBannerProps {
  title: string;
  description: string;
  benefits: Benefit[];
}

export default function BenefitsBanner({ title, description, benefits }: BenefitsBannerProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decoração */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 text-center">
            <p className="text-lg font-medium text-gray-700">
              Experimente agora e sinta a diferença!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
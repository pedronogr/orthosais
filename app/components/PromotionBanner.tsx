import React from 'react';
import Link from 'next/link';

interface PromotionBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function PromotionBanner({
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  backgroundColor = 'bg-primary',
  textColor = 'text-white'
}: PromotionBannerProps) {
  return (
    <div className={`${backgroundColor} py-16`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div className={`${textColor} space-y-6`}>
              <h2 className="text-3xl md:text-4xl font-bold">
                {title}
              </h2>
              <p className="text-lg opacity-90">
                {description}
              </p>
              <div>
                <Link
                  href={ctaLink}
                  className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  {ctaText}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Elemento decorativo */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
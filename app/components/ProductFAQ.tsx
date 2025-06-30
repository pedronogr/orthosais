"use client";

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs?: FAQ[];
  title?: string;
  description?: string;
}

export default function ProductFAQ({ faqs = [], title = "Perguntas Frequentes", description }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-gray-600 mb-8">
              {description}
            </p>
          )}

          {faqs && faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-200 ${
                      openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma pergunta frequente disponível no momento.</p>
            </div>
          )}

          {/* Link para Contato */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Não encontrou a resposta que procurava?
            </p>
            <a
              href="/contato"
              className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
            >
              Entre em contato conosco
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
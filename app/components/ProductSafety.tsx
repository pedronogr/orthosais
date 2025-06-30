import React from 'react';

interface ProductSafetyProps {
  safetyInfo?: {
    warnings: string[];
    contraindications: string[];
    sideEffects: string[];
    storage: string;
    shelfLife: string;
  };
  warnings?: string[];
  contraindications?: string[];
  sideEffects?: string[];
  storage?: string;
  shelfLife?: string;
}

export default function ProductSafety({ 
  safetyInfo,
  warnings: propWarnings,
  contraindications: propContraindications,
  sideEffects: propSideEffects,
  storage: propStorage,
  shelfLife: propShelfLife
}: ProductSafetyProps) {
  // Use as propriedades do objeto safetyInfo ou as propriedades individuais
  const warnings = safetyInfo?.warnings || propWarnings || [];
  const contraindications = safetyInfo?.contraindications || propContraindications || [];
  const sideEffects = safetyInfo?.sideEffects || propSideEffects || [];
  const storage = safetyInfo?.storage || propStorage || '';
  const shelfLife = safetyInfo?.shelfLife || propShelfLife || '';

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Informações de Segurança
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Avisos e Contraindicações */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                  Avisos Importantes
                </h3>
                <ul className="space-y-2">
                  {warnings.map((warning, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-primary mr-2">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" 
                    />
                  </svg>
                  Contraindicações
                </h3>
                <ul className="space-y-2">
                  {contraindications.map((contraindication, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-primary mr-2">•</span>
                      {contraindication}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Efeitos Colaterais e Armazenamento */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  Efeitos Colaterais
                </h3>
                <ul className="space-y-2">
                  {sideEffects.map((effect, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-primary mr-2">•</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                  Armazenamento e Validade
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Armazenamento</h4>
                    <p className="text-gray-700">{storage}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prazo de Validade</h4>
                    <p className="text-gray-700">{shelfLife}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso Legal */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 text-center">
              Este produto é um medicamento. Seus resultados podem variar de pessoa para pessoa. 
              Este produto não deve ser utilizado por mulheres grávidas sem orientação médica. 
              Em caso de dúvidas, consulte seu médico ou farmacêutico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
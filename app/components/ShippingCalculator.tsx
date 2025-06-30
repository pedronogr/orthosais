'use client';

import React, { useState } from 'react';
import { calculateShipping } from '../services/shippingService';

interface ShippingCalculatorProps {
  products: any[];
  onSelectShipping?: (option: any) => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ products, onSelectShipping }) => {
  const [postalCode, setPostalCode] = useState<string>('');
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // CEP de origem da loja (fixo)
  const originPostalCode = '04548-000'; // Substituir pelo CEP correto da origem

  // Função para validar CEP
  const isValidCEP = (cep: string): boolean => {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
  };

  // Função para calcular o frete
  const handleCalculateShipping = async () => {
    if (!isValidCEP(postalCode)) {
      setError('Por favor, informe um CEP válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Formata o CEP removendo o hífen
      const formattedCEP = postalCode.replace('-', '');
      
      // Chama o serviço de cálculo de frete
      const options = await calculateShipping(
        originPostalCode.replace('-', ''),
        formattedCEP,
        products
      );
      
      setShippingOptions(options);
    } catch (err) {
      console.error('Erro ao calcular frete:', err);
      setError('Não foi possível calcular o frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para selecionar opção de frete
  const selectShippingOption = (option: any) => {
    if (onSelectShipping) {
      onSelectShipping(option);
    }
  };

  // Função para formatar o CEP enquanto digita
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    
    setPostalCode(value);
  };

  return (
    <div className="mt-6 border rounded-md p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Calcular Frete</h3>
      
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={postalCode}
            onChange={handleCepChange}
            maxLength={9}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          onClick={handleCalculateShipping}
          disabled={loading}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>
      
      {error && (
        <div className="mt-3 text-red-600 text-sm">
          {error}
        </div>
      )}
      
      {shippingOptions.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-800 mb-2">Opções de Entrega</h4>
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <div 
                key={option.id}
                onClick={() => selectShippingOption(option)}
                className="border rounded-md p-3 cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {option.company.picture && (
                      <img 
                        src={option.company.picture} 
                        alt={option.company.name} 
                        className="h-8 w-auto"
                      />
                    )}
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-sm text-gray-600">
                        Entrega em {option.delivery_time} {option.delivery_time === 1 ? 'dia útil' : 'dias úteis'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-700">
                      R$ {(option.price).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        <p>* Prazo de entrega inicia-se a partir da confirmação do pagamento e pode variar conforme a região.</p>
        <p>* Consulte disponibilidade para sua região.</p>
      </div>
    </div>
  );
};

export default ShippingCalculator; 
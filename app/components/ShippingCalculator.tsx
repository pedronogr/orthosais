"use client";

import React, { useState } from 'react';
import { calculateShippingByCep } from '../services/shippingService';

interface ShippingOption {
  id: string;
  carrier: string;
  service: string;
  price: number;
  days: number;
}

interface ShippingCalculatorProps {
  productWeight?: number;
  onSelectShipping?: (option: ShippingOption) => void;
  className?: string;
}

export default function ShippingCalculator({ 
  productWeight = 0.5,
  onSelectShipping,
  className = ""
}: ShippingCalculatorProps) {
  const [cep, setCep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Formatar o CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };

  // Calcular o frete
  const handleCalculateShipping = async () => {
    if (cep.length !== 8) {
      setError('CEP inválido. Digite os 8 números do CEP.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      // Verificar se o CEP é válido usando a API ViaCEP
      const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepData = await cepResponse.json();
      
      if (cepData.erro) {
        setError('CEP não encontrado');
        setShippingOptions([]);
        setIsLoading(false);
        return;
      }

      // Calcular opções de frete
      const options = await calculateShippingByCep(cep, productWeight);
      setShippingOptions(options);
      
      // Se houver opções e callback, selecionar a primeira opção
      if (options.length > 0) {
        setSelectedOption(options[0].id);
        if (onSelectShipping) {
          onSelectShipping(options[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setError('Não foi possível calcular o frete. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Selecionar uma opção de frete
  const handleSelectOption = (option: ShippingOption) => {
    setSelectedOption(option.id);
    if (onSelectShipping) {
      onSelectShipping(option);
    }
  };

  return (
    <div className={`shipping-calculator ${className}`}>
      <div className="mb-4">
        <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
          Calcular Frete e Prazo
        </label>
        <div className="flex">
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={handleCepChange}
            maxLength={8}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Digite seu CEP"
          />
          <button
            type="button"
            onClick={handleCalculateShipping}
            disabled={isLoading || cep.length !== 8}
            className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-hover transition disabled:opacity-70"
          >
            {isLoading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <div className="mt-1 text-xs text-gray-500">
          <a 
            href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Não sei meu CEP
          </a>
        </div>
      </div>

      {shippingOptions.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Opções de Entrega</h4>
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <div 
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedOption === option.id 
                    ? 'border-primary bg-amber-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{option.carrier} - {option.service}</p>
                    <p className="text-sm text-gray-600">
                      Entrega em até {option.days} {option.days === 1 ? 'dia útil' : 'dias úteis'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      R$ {option.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
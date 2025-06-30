"use client";

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FreteRule, addFreteRule, getAllFreteRules, deleteFreteRule } from '../../../services/shippingService';

export default function FreteConfigPage() {
  const [freteRules, setFreteRules] = useState<FreteRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para o formulário
  const [region, setRegion] = useState('');
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(10);
  const [price, setPrice] = useState(15.9);
  const [carrier, setCarrier] = useState('Padrão');
  
  // Carregar regras de frete
  const loadFreteRules = async () => {
    try {
      setIsLoading(true);
      const rules = await getAllFreteRules();
      setFreteRules(rules);
    } catch (err) {
      console.error('Erro ao carregar regras de frete:', err);
      setError('Não foi possível carregar as regras de frete.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadFreteRules();
  }, []);
  
  // Adicionar nova regra
  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!region || minWeight < 0 || maxWeight <= 0 || price <= 0 || !carrier) {
      setError('Por favor, preencha todos os campos corretamente.');
      return;
    }
    
    if (minWeight >= maxWeight) {
      setError('O peso mínimo deve ser menor que o peso máximo.');
      return;
    }
    
    try {
      const newRule: FreteRule = {
        id: uuidv4(),
        region,
        minWeight,
        maxWeight,
        price,
        carrier
      };
      
      await addFreteRule(newRule);
      await loadFreteRules();
      
      // Limpar formulário
      setRegion('');
      setMinWeight(0);
      setMaxWeight(10);
      setPrice(15.9);
      setCarrier('Padrão');
      setError('');
    } catch (err) {
      console.error('Erro ao adicionar regra de frete:', err);
      setError('Não foi possível adicionar a regra de frete.');
    }
  };
  
  // Remover regra
  const handleDeleteRule = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta regra de frete?')) {
      try {
        await deleteFreteRule(id);
        await loadFreteRules();
      } catch (err) {
        console.error('Erro ao excluir regra de frete:', err);
        setError('Não foi possível excluir a regra de frete.');
      }
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações de Frete</h1>
      
      {/* Formulário para adicionar nova regra */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Adicionar Nova Regra de Frete</h2>
        
        <form onSubmit={handleAddRule}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Região/Estado
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="">Selecione...</option>
                <option value="Brasil">Todo o Brasil</option>
                <option value="Sudeste">Região Sudeste</option>
                <option value="Sul">Região Sul</option>
                <option value="Nordeste">Região Nordeste</option>
                <option value="Norte">Região Norte</option>
                <option value="Centro-Oeste">Região Centro-Oeste</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="ES">Espírito Santo</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="BA">Bahia</option>
                <option value="PE">Pernambuco</option>
                <option value="CE">Ceará</option>
                <option value="AM">Amazonas</option>
                <option value="PA">Pará</option>
                <option value="GO">Goiás</option>
                <option value="DF">Distrito Federal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso Mínimo (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={minWeight}
                onChange={(e) => setMinWeight(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso Máximo (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={maxWeight}
                onChange={(e) => setMaxWeight(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transportadora
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="Padrão">Transportadora Padrão</option>
                <option value="Expresso">Transportadora Expressa</option>
                <option value="Econômico">Transportadora Econômica</option>
                <option value="Correios">Correios</option>
                <option value="Jadlog">Jadlog</option>
              </select>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
          >
            Adicionar Regra
          </button>
        </form>
      </div>
      
      {/* Lista de regras */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Regras de Frete Cadastradas</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        ) : freteRules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma regra de frete cadastrada.</p>
            <p className="text-sm mt-2">Adicione regras para personalizar o cálculo de frete.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Região/Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peso (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transportadora
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {freteRules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rule.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rule.minWeight} a {rule.maxWeight} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      R$ {rule.price.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rule.carrier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Dicas */}
      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="text-blue-800 font-medium mb-2">Dicas para configuração de frete</h3>
        <ul className="list-disc pl-5 text-blue-700 text-sm">
          <li className="mb-1">Configure regras específicas por estado para maior precisão.</li>
          <li className="mb-1">Utilize regras por região para cobrir múltiplos estados com configuração similar.</li>
          <li className="mb-1">Crie faixas de peso para produtos leves e pesados com valores diferentes.</li>
          <li className="mb-1">A regra "Todo o Brasil" será usada como fallback quando não houver regra específica.</li>
        </ul>
      </div>
    </div>
  );
} 
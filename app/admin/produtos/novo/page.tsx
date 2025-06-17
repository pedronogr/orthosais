"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addProduct } from '../../../services/productService';

// Componente para adicionar novo produto
export default function NovoProdutoPage() {
  const router = useRouter();
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    subcategoria: '',
    descricao: '',
    preco: '',
    estoque: '',
    status: 'ativo',
    destaque: false,
    imagem: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Opções de categoria
  const categorias = [
    'Linha Saúde',
    'Linha Proteção',
    'Linha Vida',
    'Linha Especializada'
  ];
  
  // Manipular mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Tratamento especial para checkbox
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setSuccess(false);
    
    try {
      // Validação básica
      if (!formData.nome || !formData.categoria || !formData.preco || !formData.estoque) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }
      
      // Criar objeto de produto para salvar
      const novoProduto = {
        id: formData.nome.toLowerCase().replace(/\s+/g, '-'),
        name: formData.nome.toUpperCase(),
        description: formData.descricao,
        price: parseFloat(formData.preco),
        category: formData.categoria,
        imageSrc: formData.imagem || '/images/product1.svg', // Imagem padrão se não fornecida
        status: formData.status,
        estoque: parseInt(formData.estoque),
        destaque: formData.destaque
      };
      
      // Salvar o produto usando o serviço de IndexedDB
      await addProduct(novoProduto);
      
      setSuccess(true);
      
      // Redirecionar para a lista de produtos após salvar
      setTimeout(() => {
        router.push('/admin/produtos');
      }, 1500);
      
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Ocorreu um erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Adicionar Novo Produto</h1>
        
        <Link href="/admin/produtos" className="text-gray-600 hover:text-gray-900 flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para lista
        </Link>
      </div>
      
      {/* Formulário */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {erro && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{erro}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
            <p>Produto adicionado com sucesso! O produto agora está disponível na loja.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome do Produto */}
            <div className="col-span-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Digite o nome do produto"
                required
              />
            </div>
            
            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Subcategoria */}
            <div>
              <label htmlFor="subcategoria" className="block text-sm font-medium text-gray-700 mb-1">
                Subcategoria
              </label>
              <input
                type="text"
                id="subcategoria"
                name="subcategoria"
                value={formData.subcategoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Ex: Articulações, Ossos, etc."
              />
            </div>
            
            {/* Descrição */}
            <div className="col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Descreva o produto..."
              />
            </div>
            
            {/* Preço */}
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                Preço <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
            
            {/* Estoque */}
            <div>
              <label htmlFor="estoque" className="block text-sm font-medium text-gray-700 mb-1">
                Estoque <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="estoque"
                name="estoque"
                value={formData.estoque}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Quantidade em estoque"
                min="0"
                required
              />
            </div>
            
            {/* URL da Imagem */}
            <div className="col-span-2">
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="text"
                id="imagem"
                name="imagem"
                value={formData.imagem}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Em uma implementação real, aqui teria um botão para upload de imagem.
              </p>
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            
            {/* Destaque */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="destaque"
                name="destaque"
                checked={formData.destaque}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="destaque" className="ml-2 block text-sm text-gray-700">
                Produto em destaque
              </label>
            </div>
          </div>
          
          {/* Botões */}
          <div className="mt-8 flex justify-end space-x-3">
            <Link
              href="/admin/produtos"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '../../services/productService';
import type { Product } from '../../services/productService';

// Definição do tipo de produto para o admin
interface Produto {
  id: string;
  nome: string;
  categoria: string;
  subcategoria?: string;
  preco: number;
  estoque: number;
  status: 'ativo' | 'inativo';
  destaque: boolean;
  imagem?: string;
  dataCriacao: string;
}

// Componente de Página de Produtos
export default function ProdutosPage() {
  // Estado para produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [loading, setLoading] = useState(true);

  // Carregar produtos do IndexedDB e combinar com os produtos simulados
  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      
      try {
        // Produtos simulados para demonstração
        const produtosSimulados: Produto[] = [
          {
            id: '1',
            nome: 'Viscomove 30ml',
            categoria: 'Linha Saúde',
            subcategoria: 'Articulações',
            preco: 89.90,
            estoque: 125,
            status: 'ativo',
            destaque: true,
            imagem: '/images/viscomove.png',
            dataCriacao: '2023-06-15'
          },
          {
            id: '2',
            nome: 'Flandor 20mg',
            categoria: 'Linha Proteção',
            subcategoria: 'Anti-inflamatórios',
            preco: 45.50,
            estoque: 78,
            status: 'ativo',
            destaque: true,
            imagem: '/images/flandor.png',
            dataCriacao: '2023-05-20'
          },
          {
            id: '3',
            nome: 'Viscolivess 50ml',
            categoria: 'Linha Vida',
            subcategoria: 'Suplementos',
            preco: 120.00,
            estoque: 42,
            status: 'ativo',
            destaque: false,
            imagem: '/images/viscolivess.png',
            dataCriacao: '2023-07-01'
          },
          {
            id: '4',
            nome: 'Ortrical 30cp',
            categoria: 'Linha Especializada',
            subcategoria: 'Ossos',
            preco: 65.90,
            estoque: 5,
            status: 'inativo',
            destaque: false,
            imagem: '/images/ortrical.png',
            dataCriacao: '2023-04-10'
          },
          {
            id: '5',
            nome: 'Allmag 60cp',
            categoria: 'Linha Saúde',
            subcategoria: 'Minerais',
            preco: 52.90,
            estoque: 89,
            status: 'ativo',
            destaque: true,
            imagem: '/images/allmag.png',
            dataCriacao: '2023-06-01'
          }
        ];
        
        // Buscar produtos do IndexedDB
        const dbProducts = await getAllProducts();
        
        // Converter produtos do IndexedDB para o formato do admin
        const produtosFromDB = dbProducts.map((p: Product) => ({
          id: p.id,
          nome: p.name,
          categoria: p.category,
          subcategoria: '',
          preco: p.price,
          estoque: p.estoque || 0,
          status: (p.status as 'ativo' | 'inativo') || 'ativo',
          destaque: p.destaque || false,
          imagem: p.imageSrc,
          dataCriacao: p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        
        // Combinar produtos simulados com produtos do IndexedDB
        const todosProdutos = [...produtosSimulados, ...produtosFromDB];
        
        setProdutos(todosProdutos);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        // Em caso de erro, usar apenas os produtos simulados
        const produtosSimulados: Produto[] = [
          {
            id: '1',
            nome: 'Viscomove 30ml',
            categoria: 'Linha Saúde',
            subcategoria: 'Articulações',
            preco: 89.90,
            estoque: 125,
            status: 'ativo',
            destaque: true,
            imagem: '/images/viscomove.png',
            dataCriacao: '2023-06-15'
          },
          // ... outros produtos simulados
        ];
        
        setProdutos(produtosSimulados);
      } finally {
        setLoading(false);
      }
    };
    
    carregarProdutos();
  }, []);

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    // Filtro de texto
    const textoMatch = filtro === '' || 
      produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
      (produto.subcategoria && produto.subcategoria.toLowerCase().includes(filtro.toLowerCase()));
    
    // Filtro de categoria
    const categoriaMatch = categoriaFiltro === 'todas' || produto.categoria === categoriaFiltro;
    
    // Filtro de status
    const statusMatch = 
      statusFiltro === 'todos' ||
      (statusFiltro === 'ativos' && produto.status === 'ativo') ||
      (statusFiltro === 'inativos' && produto.status === 'inativo') ||
      (statusFiltro === 'destaque' && produto.destaque) ||
      (statusFiltro === 'estoque_baixo' && produto.estoque < 10);
    
    return textoMatch && categoriaMatch && statusMatch;
  });

  // Ordenar produtos
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'recentes':
        return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
      case 'antigos':
        return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
      case 'nome_asc':
        return a.nome.localeCompare(b.nome);
      case 'nome_desc':
        return b.nome.localeCompare(a.nome);
      case 'preco_asc':
        return a.preco - b.preco;
      case 'preco_desc':
        return b.preco - a.preco;
      case 'estoque_asc':
        return a.estoque - b.estoque;
      case 'estoque_desc':
        return b.estoque - a.estoque;
      default:
        return 0;
    }
  });

  // Categorias únicas para o filtro
  const categorias = ['todas', ...new Set(produtos.map(p => p.categoria))];

  // Função para excluir produto
  const handleExcluirProduto = (produtoId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      // Em uma aplicação real, isso seria uma chamada à API
      setProdutos(produtos.filter(p => p.id !== produtoId));
    }
  };

  // Função para alternar status
  const handleAlternarStatus = (produtoId: string) => {
    setProdutos(produtos.map(p => {
      if (p.id === produtoId) {
        return {
          ...p,
          status: p.status === 'ativo' ? 'inativo' : 'ativo'
        };
      }
      return p;
    }));
  };

  // Formatador de moeda
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gerenciar Produtos</h1>
        
        <Link href="/admin/produtos/novo" className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-md flex items-center shadow-sm">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-white">Adicionar Produto</span>
        </Link>
      </div>
      
      {/* Filtros e Buscas */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">Buscar produtos</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por nome, categoria..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filtro de Categoria */}
          <div className="w-full md:w-48">
            <label htmlFor="categoria" className="sr-only">Filtrar por categoria</label>
            <select
              id="categoria"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={categoriaFiltro}
              onChange={e => setCategoriaFiltro(e.target.value)}
            >
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat === 'todas' ? 'Todas as Categorias' : cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Filtro de Status */}
          <div className="w-full md:w-48">
            <label htmlFor="status" className="sr-only">Filtrar por status</label>
            <select
              id="status"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={statusFiltro}
              onChange={e => setStatusFiltro(e.target.value)}
            >
              <option value="todos">Todos os Status</option>
              <option value="ativos">Ativos</option>
              <option value="inativos">Inativos</option>
              <option value="destaque">Em Destaque</option>
              <option value="estoque_baixo">Estoque Baixo</option>
            </select>
          </div>
          
          {/* Ordenação */}
          <div className="w-full md:w-48">
            <label htmlFor="ordenacao" className="sr-only">Ordenar por</label>
            <select
              id="ordenacao"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={ordenacao}
              onChange={e => setOrdenacao(e.target.value)}
            >
              <option value="recentes">Mais Recentes</option>
              <option value="antigos">Mais Antigos</option>
              <option value="nome_asc">Nome (A-Z)</option>
              <option value="nome_desc">Nome (Z-A)</option>
              <option value="preco_asc">Preço (Menor-Maior)</option>
              <option value="preco_desc">Preço (Maior-Menor)</option>
              <option value="estoque_asc">Estoque (Menor-Maior)</option>
              <option value="estoque_desc">Estoque (Maior-Menor)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabela de Produtos */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : produtosOrdenados.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destaque
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtosOrdenados.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          {produto.imagem ? (
                            <Image
                              src={produto.imagem}
                              alt={produto.nome}
                              fill
                              className="object-cover rounded-md"
                              sizes="40px"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                          <div className="text-sm text-gray-500">ID: {produto.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{produto.categoria}</div>
                      {produto.subcategoria && (
                        <div className="text-sm text-gray-500">{produto.subcategoria}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatarMoeda(produto.preco)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${produto.estoque < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {produto.estoque} unidades
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        produto.status === 'ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {produto.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        produto.destaque 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {produto.destaque ? 'Em destaque' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleAlternarStatus(produto.id)}
                          className={`text-xs px-2 py-1 rounded ${
                            produto.status === 'ativo' 
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                              : 'bg-green-100 hover:bg-green-200 text-green-700'
                          }`}
                        >
                          {produto.status === 'ativo' ? 'Desativar' : 'Ativar'}
                        </button>
                        <Link
                          href={`/admin/produtos/${produto.id}`}
                          className="text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleExcluirProduto(produto.id)}
                          className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filtro || categoriaFiltro !== 'todas' || statusFiltro !== 'todos' ? 
                'Tente ajustar os filtros de busca.' : 
                'Comece adicionando um novo produto ao catálogo.'}
            </p>
            {!filtro && categoriaFiltro === 'todas' && statusFiltro === 'todos' && (
              <div className="mt-6">
                <Link
                  href="/admin/produtos/novo"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Adicionar Produto
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Definição do tipo de pedido
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface Item {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
  total: number;
}

interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Pedido {
  id: string;
  codigo: string;
  cliente: Cliente;
  items: Item[];
  status: 'aguardando_pagamento' | 'pago' | 'enviado' | 'entregue' | 'cancelado' | 'devolvido';
  valorTotal: number;
  valorFrete: number;
  formaPagamento: string;
  dataCriacao: string;
  dataAtualizacao: string;
  endereco: Endereco;
  codigoRastreio?: string;
  observacoes?: string;
}

// Componente de Página de Pedidos
export default function PedidosPage() {
  // Estado para pedidos
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [dataFiltro, setDataFiltro] = useState('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [loading, setLoading] = useState(true);

  // Carregar pedidos (simulado)
  useEffect(() => {
    const carregarPedidos = async () => {
      // Em uma implementação real, isso seria uma chamada à API
      setTimeout(() => {
        const pedidosSimulados: Pedido[] = [
          {
            id: '1',
            codigo: 'ORD-12458',
            cliente: {
              id: '101',
              nome: 'Maria Silva',
              email: 'maria@exemplo.com',
              telefone: '(11) 98765-4321'
            },
            items: [
              {
                id: '1',
                nome: 'Viscomove 30ml',
                quantidade: 2,
                preco: 89.90,
                total: 179.80
              },
              {
                id: '3',
                nome: 'Allmag 60cp',
                quantidade: 1,
                preco: 52.90,
                total: 52.90
              }
            ],
            status: 'pago',
            valorTotal: 262.70,
            valorFrete: 30.00,
            formaPagamento: 'Cartão de Crédito',
            dataCriacao: '2023-07-12T15:45:00',
            dataAtualizacao: '2023-07-12T16:10:00',
            endereco: {
              rua: 'Rua das Flores',
              numero: '123',
              bairro: 'Jardim Primavera',
              cidade: 'São Paulo',
              estado: 'SP',
              cep: '01234-567'
            }
          },
          {
            id: '2',
            codigo: 'ORD-12457',
            cliente: {
              id: '102',
              nome: 'João Santos',
              email: 'joao@exemplo.com',
              telefone: '(11) 91234-5678'
            },
            items: [
              {
                id: '2',
                nome: 'Flandor 20mg',
                quantidade: 3,
                preco: 45.50,
                total: 136.50
              }
            ],
            status: 'enviado',
            valorTotal: 156.50,
            valorFrete: 20.00,
            formaPagamento: 'Boleto Bancário',
            dataCriacao: '2023-07-11T14:15:00',
            dataAtualizacao: '2023-07-11T18:30:00',
            endereco: {
              rua: 'Av. Paulista',
              numero: '1000',
              complemento: 'Apto 45',
              bairro: 'Bela Vista',
              cidade: 'São Paulo',
              estado: 'SP',
              cep: '01310-100'
            },
            codigoRastreio: 'BR123456789'
          },
          {
            id: '3',
            codigo: 'ORD-12456',
            cliente: {
              id: '103',
              nome: 'Ana Oliveira',
              email: 'ana@exemplo.com',
              telefone: '(21) 99876-5432'
            },
            items: [
              {
                id: '3',
                nome: 'Viscolivess 50ml',
                quantidade: 1,
                preco: 120.00,
                total: 120.00
              },
              {
                id: '4',
                nome: 'Ortrical 30cp',
                quantidade: 2,
                preco: 65.90,
                total: 131.80
              }
            ],
            status: 'entregue',
            valorTotal: 281.80,
            valorFrete: 30.00,
            formaPagamento: 'PIX',
            dataCriacao: '2023-07-10T09:20:00',
            dataAtualizacao: '2023-07-13T11:45:00',
            endereco: {
              rua: 'Rua do Comércio',
              numero: '789',
              bairro: 'Centro',
              cidade: 'Rio de Janeiro',
              estado: 'RJ',
              cep: '20010-020'
            },
            codigoRastreio: 'BR987654321'
          },
          {
            id: '4',
            codigo: 'ORD-12455',
            cliente: {
              id: '104',
              nome: 'Carlos Pereira',
              email: 'carlos@exemplo.com',
              telefone: '(31) 98765-1234'
            },
            items: [
              {
                id: '5',
                nome: 'Allmag 60cp',
                quantidade: 3,
                preco: 52.90,
                total: 158.70
              }
            ],
            status: 'cancelado',
            valorTotal: 178.70,
            valorFrete: 20.00,
            formaPagamento: 'Cartão de Débito',
            dataCriacao: '2023-07-08T16:30:00',
            dataAtualizacao: '2023-07-08T17:45:00',
            endereco: {
              rua: 'Av. Brasil',
              numero: '456',
              bairro: 'Santa Efigênia',
              cidade: 'Belo Horizonte',
              estado: 'MG',
              cep: '30130-000'
            }
          },
          {
            id: '5',
            codigo: 'ORD-12454',
            cliente: {
              id: '105',
              nome: 'Fernanda Lima',
              email: 'fernanda@exemplo.com',
              telefone: '(51) 92345-6789'
            },
            items: [
              {
                id: '1',
                nome: 'Viscomove 30ml',
                quantidade: 1,
                preco: 89.90,
                total: 89.90
              },
              {
                id: '2',
                nome: 'Flandor 20mg',
                quantidade: 2,
                preco: 45.50,
                total: 91.00
              },
              {
                id: '4',
                nome: 'Ortrical 30cp',
                quantidade: 1,
                preco: 65.90,
                total: 65.90
              }
            ],
            status: 'aguardando_pagamento',
            valorTotal: 276.80,
            valorFrete: 30.00,
            formaPagamento: 'Boleto Bancário',
            dataCriacao: '2023-07-15T10:00:00',
            dataAtualizacao: '2023-07-15T10:00:00',
            endereco: {
              rua: 'Rua das Palmeiras',
              numero: '321',
              complemento: 'Casa 2',
              bairro: 'Menino Deus',
              cidade: 'Porto Alegre',
              estado: 'RS',
              cep: '90130-205'
            }
          }
        ];
        
        setPedidos(pedidosSimulados);
        setLoading(false);
      }, 800);
    };
    
    carregarPedidos();
  }, []);

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(pedido => {
    // Filtro de texto
    const textoMatch = filtro === '' || 
      pedido.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.cliente.email.toLowerCase().includes(filtro.toLowerCase());
    
    // Filtro de status
    const statusMatch = 
      statusFiltro === 'todos' ||
      pedido.status === statusFiltro;
    
    // Filtro de data
    let dataMatch = true;
    
    if (dataFiltro === 'personalizado') {
      if (dataInicio && dataFim) {
        const dataPedido = new Date(pedido.dataCriacao);
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59);
        
        dataMatch = dataPedido >= inicio && dataPedido <= fim;
      }
    } else if (dataFiltro === 'hoje') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataPedido = new Date(pedido.dataCriacao);
      const diaAtual = new Date();
      diaAtual.setHours(23, 59, 59, 999);
      
      dataMatch = dataPedido >= hoje && dataPedido <= diaAtual;
    } else if (dataFiltro === 'semana') {
      const dataAtual = new Date();
      const inicioSemana = new Date(dataAtual);
      inicioSemana.setDate(dataAtual.getDate() - dataAtual.getDay()); // Domingo como início da semana
      inicioSemana.setHours(0, 0, 0, 0);
      
      const dataPedido = new Date(pedido.dataCriacao);
      
      dataMatch = dataPedido >= inicioSemana;
    } else if (dataFiltro === 'mes') {
      const dataAtual = new Date();
      const inicioMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
      const dataPedido = new Date(pedido.dataCriacao);
      
      dataMatch = dataPedido >= inicioMes;
    }
    
    return textoMatch && statusMatch && dataMatch;
  });

  // Ordenar pedidos
  const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'recentes':
        return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
      case 'antigos':
        return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
      case 'maior_valor':
        return b.valorTotal - a.valorTotal;
      case 'menor_valor':
        return a.valorTotal - b.valorTotal;
      default:
        return 0;
    }
  });

  // Formatador de moeda
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Formatador de data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Texto para status
  const getStatusText = (status: Pedido['status']) => {
    switch (status) {
      case 'aguardando_pagamento':
        return 'Aguardando Pagamento';
      case 'pago':
        return 'Pago';
      case 'enviado':
        return 'Enviado';
      case 'entregue':
        return 'Entregue';
      case 'cancelado':
        return 'Cancelado';
      case 'devolvido':
        return 'Devolvido';
      default:
        return status;
    }
  };

  // Cor para status
  const getStatusColor = (status: Pedido['status']) => {
    switch (status) {
      case 'aguardando_pagamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'pago':
        return 'bg-blue-100 text-blue-800';
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      case 'devolvido':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gerenciar Pedidos</h1>
      </div>
      
      {/* Filtros e Buscas */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">Buscar pedidos</label>
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
                placeholder="Buscar por código, cliente..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
              />
            </div>
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
              <option value="aguardando_pagamento">Aguardando Pagamento</option>
              <option value="pago">Pago</option>
              <option value="enviado">Enviado</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
              <option value="devolvido">Devolvido</option>
            </select>
          </div>
          
          {/* Filtro de Data */}
          <div className="w-full md:w-48">
            <label htmlFor="data" className="sr-only">Filtrar por data</label>
            <select
              id="data"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={dataFiltro}
              onChange={e => setDataFiltro(e.target.value)}
            >
              <option value="todos">Todas as Datas</option>
              <option value="hoje">Hoje</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="personalizado">Personalizado</option>
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
              <option value="maior_valor">Maior Valor</option>
              <option value="menor_valor">Menor Valor</option>
            </select>
          </div>
        </div>
        
        {/* Filtro de Data Personalizado */}
        {dataFiltro === 'personalizado' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                id="dataInicio"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={dataInicio}
                onChange={e => setDataInicio(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <input
                type="date"
                id="dataFim"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={dataFim}
                onChange={e => setDataFim(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Contagem de resultados e exportação */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {pedidosOrdenados.length} {pedidosOrdenados.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
          </p>
          
          <div className="flex space-x-2">
            <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Exportar CSV
            </button>
            <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabela de Pedidos */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <svg className="animate-spin h-8 w-8 mx-auto text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-500">Carregando pedidos...</p>
          </div>
        ) : pedidosOrdenados.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-2 text-gray-500">Nenhum pedido encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidosOrdenados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pedido.codigo}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pedido.items.length} {pedido.items.length === 1 ? 'item' : 'itens'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pedido.cliente.nome}</div>
                      <div className="text-xs text-gray-500">{pedido.cliente.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarData(pedido.dataCriacao)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(pedido.valorTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pedido.status)}`}>
                        {getStatusText(pedido.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <Link href={`/admin/pedidos/${pedido.id}`}>
                          <span className="text-blue-600 hover:text-blue-900">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </span>
                        </Link>

                        <button className="text-indigo-600 hover:text-indigo-900">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>

                        <button className="text-gray-600 hover:text-gray-900">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 
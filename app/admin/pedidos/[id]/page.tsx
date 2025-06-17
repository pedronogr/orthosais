"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Tipos
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

interface StatusHistorico {
  status: string;
  data: string;
  comentario?: string;
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
  statusHistorico: StatusHistorico[];
}

export default function PedidoDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [novoStatus, setNovoStatus] = useState('');
  const [comentario, setComentario] = useState('');
  const [rastreio, setRastreio] = useState('');

  // Carregar dados do pedido (simulado)
  useEffect(() => {
    const carregarPedido = async () => {
      // Em uma implementação real, isso seria uma chamada à API
      setTimeout(() => {
        // Simulação de um pedido específico
        const pedidoSimulado: Pedido = {
          id: id,
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
          },
          statusHistorico: [
            {
              status: 'aguardando_pagamento',
              data: '2023-07-12T15:45:00',
              comentario: 'Pedido criado'
            },
            {
              status: 'pago',
              data: '2023-07-12T16:10:00',
              comentario: 'Pagamento aprovado'
            }
          ]
        };
        
        setPedido(pedidoSimulado);
        setNovoStatus(pedidoSimulado.status);
        setRastreio(pedidoSimulado.codigoRastreio || '');
        setLoading(false);
      }, 800);
    };
    
    carregarPedido();
  }, [id]);

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
  const getStatusText = (status: string) => {
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
  const getStatusColor = (status: string) => {
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

  // Atualizar status do pedido
  const atualizarStatus = () => {
    if (!pedido || novoStatus === pedido.status) return;

    // Em uma aplicação real, aqui faria uma chamada à API
    const novoHistorico: StatusHistorico = {
      status: novoStatus,
      data: new Date().toISOString(),
      comentario: comentario || undefined
    };

    setPedido({
      ...pedido,
      status: novoStatus as any,
      dataAtualizacao: novoHistorico.data,
      statusHistorico: [...pedido.statusHistorico, novoHistorico],
      codigoRastreio: novoStatus === 'enviado' ? rastreio : pedido.codigoRastreio
    });

    setComentario('');
  };

  // Caso ainda esteja carregando
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Caso o pedido não seja encontrado
  if (!pedido) {
    return (
      <div className="text-center my-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Pedido não encontrado</h2>
        <p className="text-gray-500 mb-4">O pedido solicitado não existe ou foi removido.</p>
        <Link href="/admin/pedidos" className="text-primary hover:text-primary-hover">
          Voltar para a lista de pedidos
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/admin/pedidos" className="text-gray-600 hover:text-gray-900 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para pedidos
          </Link>
          <h1 className="text-2xl font-semibold mt-2">
            Pedido {pedido.codigo} 
            <span className={`ml-3 text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(pedido.status)}`}>
              {getStatusText(pedido.status)}
            </span>
          </h1>
        </div>

        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
          
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar Email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna da Esquerda - Detalhes do Pedido */}
        <div className="md:col-span-2 space-y-6">
          {/* Informações do Pedido */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Informações do Pedido</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Data do Pedido</p>
                <p className="font-medium">{formatarData(pedido.dataCriacao)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última Atualização</p>
                <p className="font-medium">{formatarData(pedido.dataAtualizacao)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Forma de Pagamento</p>
                <p className="font-medium">{pedido.formaPagamento}</p>
              </div>
              {pedido.codigoRastreio && (
                <div>
                  <p className="text-sm text-gray-500">Código de Rastreio</p>
                  <p className="font-medium">{pedido.codigoRastreio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Itens do Pedido */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Itens do Pedido</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qtd
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pedido.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatarMoeda(item.preco)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatarMoeda(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      Subtotal:
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {formatarMoeda(pedido.valorTotal - pedido.valorFrete)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      Frete:
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {formatarMoeda(pedido.valorFrete)}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                      Total:
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900">
                      {formatarMoeda(pedido.valorTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Histórico de Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Histórico do Pedido</h2>
            
            <div className="space-y-4">
              {pedido.statusHistorico.map((historico, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`rounded-full h-4 w-4 ${getStatusColor(historico.status)}`}></div>
                    {index < pedido.statusHistorico.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-sm font-medium text-gray-900">
                      {getStatusText(historico.status)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatarData(historico.data)}
                    </div>
                    {historico.comentario && (
                      <div className="mt-1 text-sm text-gray-600">
                        {historico.comentario}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna da Direita - Informações do Cliente e Ações */}
        <div className="space-y-6">
          {/* Cliente */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Cliente</h2>
            
            <div className="space-y-2">
              <p className="font-medium">{pedido.cliente.nome}</p>
              <p className="text-sm text-gray-600">{pedido.cliente.email}</p>
              <p className="text-sm text-gray-600">{pedido.cliente.telefone}</p>
              
              <div className="pt-3 mt-3 border-t">
                <Link href={`/admin/usuarios/${pedido.cliente.id}`} className="text-primary hover:text-primary-hover text-sm font-medium">
                  Ver perfil do cliente
                </Link>
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Endereço de Entrega</h2>
            
            <div className="space-y-1">
              <p>{pedido.endereco.rua}, {pedido.endereco.numero}</p>
              {pedido.endereco.complemento && <p>{pedido.endereco.complemento}</p>}
              <p>{pedido.endereco.bairro}</p>
              <p>
                {pedido.endereco.cidade} - {pedido.endereco.estado}, {pedido.endereco.cep}
              </p>
            </div>
          </div>

          {/* Atualizar Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Atualizar Status</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={novoStatus}
                  onChange={(e) => setNovoStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="aguardando_pagamento">Aguardando Pagamento</option>
                  <option value="pago">Pago</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregue">Entregue</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="devolvido">Devolvido</option>
                </select>
              </div>

              {novoStatus === 'enviado' && (
                <div>
                  <label htmlFor="rastreio" className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Rastreio
                  </label>
                  <input
                    type="text"
                    id="rastreio"
                    value={rastreio}
                    onChange={(e) => setRastreio(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: BR123456789"
                  />
                </div>
              )}

              <div>
                <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">
                  Comentário (opcional)
                </label>
                <textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adicione um comentário sobre a atualização de status..."
                ></textarea>
              </div>

              <button
                onClick={atualizarStatus}
                disabled={novoStatus === pedido.status}
                className={`w-full py-2 px-4 rounded-md ${
                  novoStatus === pedido.status 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                Atualizar Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

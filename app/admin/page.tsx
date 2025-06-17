"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllProducts } from '../services/productService';
import type { Product } from '../services/productService';

// Interface para estatísticas
interface DashboardStats {
  totalProdutos: number;
  produtosAtivos: number;
  produtosInativos: number;
  pedidosPendentes: number;
  pedidosFinalizados: number;
}

// Interface para atividades
interface Atividade {
  tipo: string;
  descricao: string;
  data: string;
  link: string;
}

export default function AdminDashboard() {
  // Estatísticas simuladas para o dashboard
  const [stats, setStats] = useState<DashboardStats>({
    totalProdutos: 0,
    produtosAtivos: 0,
    produtosInativos: 0,
    pedidosPendentes: 0,
    pedidosFinalizados: 0
  });

  // Estado para atividades recentes
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do dashboard
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      
      try {
        // Buscar produtos do IndexedDB
        const produtos = await getAllProducts();
        
        // Atualizar estatísticas com base nos produtos
        const produtosAtivos = produtos.filter(p => !p.status || p.status === 'ativo').length;
        const produtosInativos = produtos.filter(p => p.status === 'inativo').length;
        const totalProdutos = produtosAtivos + produtosInativos + 187; // 187 é o número de produtos simulados
        
        // Atualizar estatísticas
        setStats({
          totalProdutos,
          produtosAtivos: produtosAtivos + 152, // 152 produtos ativos simulados
          produtosInativos: produtosInativos + 35, // 35 produtos inativos simulados
          pedidosPendentes: 24,
          pedidosFinalizados: 1458
        });
        
        // Gerar atividades recentes com base nos produtos do IndexedDB
        const atividadesProdutos = produtos
          .sort((a, b) => {
            // Ordenar por data de criação (mais recentes primeiro)
            const dateA = a.createdAt || 0;
            const dateB = b.createdAt || 0;
            return dateB - dateA;
          })
          .slice(0, 5) // Pegar apenas os 5 mais recentes
          .map(produto => {
            // Formatar data
            const data = produto.createdAt 
              ? new Date(produto.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : new Date().toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
            
            return {
              tipo: 'produto',
              descricao: `Produto adicionado: ${produto.name}`,
              data,
              link: `/admin/produtos/${produto.id}`
            };
          });
        
        // Combinar com atividades simuladas
        const atividadesSimuladas: Atividade[] = [
          { tipo: 'pedido', descricao: 'Novo pedido #12458 - R$ 521,90', data: '12/07/2023 15:45', link: '/admin/pedidos/12458' },
          { tipo: 'pedido', descricao: 'Pedido #12457 - Status: Enviado', data: '11/07/2023 14:15', link: '/admin/pedidos/12457' }
        ];
        
        // Combinar atividades de produtos com atividades simuladas
        const todasAtividades = [...atividadesProdutos, ...atividadesSimuladas]
          .sort((a, b) => {
            // Ordenar por data (mais recentes primeiro)
            // Converter string de data para timestamp para comparação
            const datePartsA = a.data.split(/[\/\s:]/);
            const datePartsB = b.data.split(/[\/\s:]/);
            
            const dateA = new Date(
              parseInt(datePartsA[2]), // ano
              parseInt(datePartsA[1]) - 1, // mês (0-11)
              parseInt(datePartsA[0]), // dia
              parseInt(datePartsA[3]), // hora
              parseInt(datePartsA[4])  // minuto
            ).getTime();
            
            const dateB = new Date(
              parseInt(datePartsB[2]), // ano
              parseInt(datePartsB[1]) - 1, // mês (0-11)
              parseInt(datePartsB[0]), // dia
              parseInt(datePartsB[3]), // hora
              parseInt(datePartsB[4])  // minuto
            ).getTime();
            
            return dateB - dateA;
          })
          .slice(0, 5); // Limitar a 5 atividades
        
        setAtividades(todasAtividades);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        // Em caso de erro, usar dados simulados
        setStats({
          totalProdutos: 187,
          produtosAtivos: 152,
          produtosInativos: 35,
          pedidosPendentes: 24,
          pedidosFinalizados: 1458
        });
        
        setAtividades([
          { tipo: 'pedido', descricao: 'Novo pedido #12458 - R$ 521,90', data: '12/07/2023 15:45', link: '/admin/pedidos/12458' },
          { tipo: 'produto', descricao: 'Produto atualizado: Viscomove 30ml', data: '12/07/2023 11:05', link: '/admin/produtos/25' },
          { tipo: 'pedido', descricao: 'Pedido #12457 - Status: Enviado', data: '11/07/2023 14:15', link: '/admin/pedidos/12457' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, []);

  // Alertas (exemplos)
  const alertas = [
    { tipo: 'estoque', mensagem: '5 produtos com estoque baixo', link: '/admin/produtos?filtro=estoque_baixo' },
    { tipo: 'pedido', mensagem: '12 pedidos aguardando envio', link: '/admin/pedidos?filtro=aguardando_envio' }
  ];

  // Tarefas pendentes (exemplos)
  const tarefas = [
    { titulo: 'Atualizar certificações de produtos', prioridade: 'alta', prazo: '15/07/2023' },
    { titulo: 'Revisar estoque de produtos sazonais', prioridade: 'média', prazo: '20/07/2023' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Produtos</p>
              <h3 className="text-2xl font-semibold mt-2">{stats.totalProdutos}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stats.produtosAtivos} ativos
              </span>
            </div>
            <Link href="/admin/produtos" className="text-sm text-blue-500 hover:underline">Ver detalhes</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pedidos Ativos</p>
              <h3 className="text-2xl font-semibold mt-2">{stats.pedidosPendentes}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {stats.pedidosFinalizados} concluídos
              </span>
            </div>
            <Link href="/admin/pedidos" className="text-sm text-blue-500 hover:underline">Ver detalhes</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Produtos Inativos</p>
              <h3 className="text-2xl font-semibold mt-2">{stats.produtosInativos}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full">
                Requer atenção
              </span>
            </div>
            <Link href="/admin/produtos?filtro=inativos" className="text-sm text-blue-500 hover:underline">Ver detalhes</Link>
          </div>
        </div>
      </div>

      {/* Alertas e Atividades Recentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Alertas */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Alertas</h2>
          
          <div className="space-y-4">
            {alertas.map((alerta, index) => (
              <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alerta.mensagem}</p>
                  <Link href={alerta.link} className="text-xs text-red-600 hover:underline mt-1 inline-block">
                    Verificar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
          
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {atividades.map((atividade, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">{atividade.data}</span>
                    {atividade.tipo === 'produto' && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                        Produto
                      </span>
                    )}
                    {atividade.tipo === 'pedido' && (
                      <span className="ml-2 px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full">
                        Pedido
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{atividade.descricao}</p>
                  <Link href={atividade.link} className="text-xs text-blue-500 hover:underline mt-1 inline-block">
                    Ver detalhes
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tarefas e Atalhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarefas */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tarefas Pendentes</h2>
          
          <div className="space-y-3">
            {tarefas.map((tarefa, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" className="h-4 w-4 text-primary rounded mr-3" />
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{tarefa.titulo}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full mr-2
                      ${tarefa.prioridade === 'alta' ? 'bg-red-50 text-red-600' : 
                        tarefa.prioridade === 'média' ? 'bg-yellow-50 text-yellow-600' : 
                        'bg-green-50 text-green-600'}
                    `}>
                      {tarefa.prioridade}
                    </span>
                    <span className="text-xs text-gray-500">Prazo: {tarefa.prazo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atalhos */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Atalhos</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/produtos/novo" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-700">Novo Produto</span>
            </Link>
            
            <Link href="/admin/pedidos" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Ver Pedidos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
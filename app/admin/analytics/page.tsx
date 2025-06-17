"use client";

import { useEffect, useState } from 'react';
import {
  calcGmv,
  calcTicketMedio,
  getFunnel,
  getCohort,
  type Funnel,
  type CohortRow
} from '../../services/analyticsService';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Line = dynamic(() => import('react-chartjs-2').then((mod: any) => mod.Line as any), {
  ssr: false,
});

export default function AnalyticsPage() {
  const [gmvHoje, setGmvHoje] = useState(0);
  const [ticketMedioHoje, setTicketMedioHoje] = useState(0);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [cohort, setCohort] = useState<CohortRow[]>([]);
  const [gmvSerie, setGmvSerie] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    const today = new Date();
    const startHoje = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const agora = Date.now();

    setGmvHoje(calcGmv(startHoje, agora));
    setTicketMedioHoje(calcTicketMedio(startHoje, agora));
    setFunnel(getFunnel());
    setCohort(getCohort());

    // Série GMV últimos 7 dias
    const labels: string[] = [];
    const data: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const from = d.getTime();
      const to = from + 86400000;
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      data.push(Number(calcGmv(from, to).toFixed(2)));
    }
    setGmvSerie({ labels, data });
  }, []);

  const chartData = {
    labels: gmvSerie.labels,
    datasets: [
      {
        label: 'GMV (R$)',
        data: gmvSerie.data,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,0.2)',
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Painel de Analytics & KPIs</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">GMV (Hoje)</p>
          <h2 className="text-2xl font-semibold mt-2">
            {gmvHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Ticket Médio (Hoje)</p>
          <h2 className="text-2xl font-semibold mt-2">
            {ticketMedioHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h2>
        </div>
        {funnel && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Taxa de Conversão</p>
            <h2 className="text-2xl font-semibold mt-2">
              {((funnel.pedidos / funnel.visitas) * 100).toFixed(2)}%
            </h2>
          </div>
        )}
      </div>

      {/* Gráfico GMV */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">GMV – Últimos 7 dias</h3>
        {typeof window !== 'undefined' && (
          // @ts-ignore: componente de gráfico aceita props dinâmicos
          <Line data={chartData as any} />
        )}
      </div>

      {/* Funil */}
      {funnel && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Funil de Conversão</h3>
          <div className="grid grid-cols-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Visitas</p>
              <p className="text-xl font-semibold">{funnel.visitas}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carrinhos</p>
              <p className="text-xl font-semibold">{funnel.carrinhos}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Checkouts</p>
              <p className="text-xl font-semibold">{funnel.checkouts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pedidos</p>
              <p className="text-xl font-semibold">{funnel.pedidos}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cohort Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Cohort – Últimos 6 meses</h3>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Mês</th>
              <th className="px-4 py-3">Novos Clientes</th>
              <th className="px-4 py-3">Retenção</th>
            </tr>
          </thead>
          <tbody>
            {cohort.map((row) => (
              <tr key={row.mes} className="border-b last:border-0">
                <td className="px-4 py-2">{row.mes}</td>
                <td className="px-4 py-2">{row.novosClientes}</td>
                <td className="px-4 py-2">{row.retenção}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
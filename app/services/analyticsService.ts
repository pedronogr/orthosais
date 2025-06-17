// Serviço de métricas e análises (simulado)

export interface Sale {
  id: string;
  value: number; // valor total do pedido
  createdAt: number;
}

// Gera vendas simuladas para os últimos 180 dias
const gerarVendasSimuladas = (): Sale[] => {
  const hoje = new Date();
  const vendas: Sale[] = [];
  for (let i = 0; i < 1800; i++) {
    const diasAtras = Math.floor(Math.random() * 180);
    const date = new Date(hoje.getTime() - diasAtras * 86400000);
    vendas.push({
      id: crypto.randomUUID(),
      value: Number((Math.random() * 500 + 50).toFixed(2)),
      createdAt: date.getTime()
    });
  }
  return vendas;
};

let vendasCache: Sale[] | null = null;
export const getVendas = (): Sale[] => {
  if (!vendasCache) vendasCache = gerarVendasSimuladas();
  return vendasCache;
};

// GMV (Gross Merchandise Volume) total em intervalo (ms)
export const calcGmv = (from: number, to: number): number => {
  const vendas = getVendas();
  return vendas.filter((v) => v.createdAt >= from && v.createdAt <= to).reduce((acc, v) => acc + v.value, 0);
};

// Ticket médio
export const calcTicketMedio = (from: number, to: number): number => {
  const vendasPeriodo = getVendas().filter((v) => v.createdAt >= from && v.createdAt <= to);
  const total = vendasPeriodo.reduce((acc, v) => acc + v.value, 0);
  return vendasPeriodo.length ? total / vendasPeriodo.length : 0;
};

// Funil de conversão (simulado)
export interface Funnel {
  visitas: number;
  carrinhos: number;
  checkouts: number;
  pedidos: number;
}

export const getFunnel = (): Funnel => {
  const visitas = 10000 + Math.floor(Math.random() * 5000);
  const carrinhos = Math.floor(visitas * 0.15);
  const checkouts = Math.floor(carrinhos * 0.4);
  const pedidos = Math.floor(checkouts * 0.8);
  return { visitas, carrinhos, checkouts, pedidos };
};

// Dados de cohort (clientes por mês – simulado)
export interface CohortRow {
  mes: string; // AAAA-MM
  novosClientes: number;
  retenção: number; // %
}

export const getCohort = (): CohortRow[] => {
  const rows: CohortRow[] = [];
  const date = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
    rows.unshift({
      mes: d.toISOString().substring(0, 7),
      novosClientes: 50 + Math.floor(Math.random() * 150),
      retenção: 40 + Math.floor(Math.random() * 40)
    });
  }
  return rows;
}; 
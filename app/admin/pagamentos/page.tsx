"use client";

import { useEffect, useState } from 'react';
import {
  getAllTransactions,
  addTransaction,
  refundTransaction,
  type Transaction
} from '../../services/paymentService';

export default function PagamentosPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let txs = await getAllTransactions();
      if (txs.length === 0) {
        // gerar mocks
        txs = Array.from({ length: 5 }).map((_, i) => ({
          id: `T${1000 + i}`,
          orderId: `P${2000 + i}`,
          amount: Number((Math.random() * 400 + 50).toFixed(2)),
          method: i % 2 ? 'cartao' : 'pix',
          status: i % 3 ? 'paid' : 'pending',
          createdAt: Date.now() - i * 86400000
        })) as Transaction[];
        for (const t of txs) await addTransaction(t);
      }
      setTransactions(txs);
      setLoading(false);
    };
    load();
  }, []);

  const handleRefund = async (id: string) => {
    if (!confirm('Confirmar estorno desta transação?')) return;
    await refundTransaction(id);
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'refunded' } : t)));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Pagamentos & Repasses</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Transação</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Método</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{t.id}</td>
                  <td className="px-4 py-2">{t.orderId}</td>
                  <td className="px-4 py-2">
                    {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-4 py-2 capitalize">{t.method}</td>
                  <td className="px-4 py-2 capitalize">{t.status}</td>
                  <td className="px-4 py-2 text-right">
                    {t.status === 'paid' && (
                      <button
                        onClick={() => handleRefund(t.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Estornar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
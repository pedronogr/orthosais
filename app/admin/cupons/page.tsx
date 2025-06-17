"use client";

import { useEffect, useState } from 'react';
import {
  getAllCoupons,
  addCoupon,
  deleteCoupon,
  type Coupon
} from '../../services/couponService';

export default function CuponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let cps = await getAllCoupons();
        if (cps.length === 0) {
          cps = [
            {
              id: 'CUPOM10',
              code: 'BEMVINDO10',
              type: 'percent',
              value: 10,
              maxUses: 100,
              uses: 12,
              expiresAt: Date.now() + 30 * 86400000,
              createdAt: Date.now()
            }
          ];
          for (const c of cps) await addCoupon(c);
        }
        setCoupons(cps);
      } catch (e) {
        console.error('Erro ao carregar cupons:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCreate = async () => {
    const code = prompt('Código do cupom');
    if (!code) return;
    const value = Number(prompt('Valor (ex: 10 = 10% ou 10 reais)') || '0');
    const type = window.confirm('Cupom percentual? OK = % | Cancel = R$') ? 'percent' : 'fixed';
    const c: Coupon = {
      id: code,
      code,
      type,
      value,
      maxUses: 100,
      uses: 0,
      expiresAt: Date.now() + 30 * 86400000,
      createdAt: Date.now()
    };
    await addCoupon(c);
    setCoupons((prev) => [...prev, c]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir cupom?')) return;
    await deleteCoupon(id);
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Cupons, Descontos & Campanhas</h1>
        <button onClick={handleCreate} className="bg-primary text-white px-4 py-2 rounded-md">
          Novo Cupom
        </button>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Usos</th>
                <th className="px-4 py-3">Expira</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="px-4 py-2 font-medium">{c.code}</td>
                  <td className="px-4 py-2 capitalize">{c.type === 'percent' ? '%' : 'R$'}</td>
                  <td className="px-4 py-2">{c.value}</td>
                  <td className="px-4 py-2">{c.uses} / {c.maxUses}</td>
                  <td className="px-4 py-2">
                    {new Date(c.expiresAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:underline text-xs"
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
  );
} 
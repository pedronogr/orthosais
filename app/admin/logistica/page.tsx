"use client";

import { useEffect, useState } from 'react';
import {
  getAllShipments,
  addShipment,
  updateShipment,
  deleteShipment,
  getAllFreteRules,
  addFreteRule,
  deleteFreteRule,
  type Shipment,
  type FreteRule
} from '../../services/shippingService';

export default function LogisticaPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [rules, setRules] = useState<FreteRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let ships = await getAllShipments();
        let frules = await getAllFreteRules();

        // Se não houver dados, criar mock
        if (ships.length === 0) {
          const mockShip: Shipment = {
            id: 'P12345',
            carrier: 'Correios',
            trackingCode: 'BR1234567890',
            status: 'in_transit',
            slaDays: 5,
            createdAt: Date.now() - 86400000,
            updatedAt: Date.now()
          };
          await addShipment(mockShip);
          ships = [mockShip];
        }

        if (frules.length === 0) {
          const mockRule: FreteRule = {
            id: (crypto.randomUUID && crypto.randomUUID()) || 'rule1',
            region: 'SP',
            minWeight: 0,
            maxWeight: 30,
            price: 19.9,
            carrier: 'Correios'
          };
          await addFreteRule(mockRule);
          frules = [mockRule];
        }

        setShipments(ships);
        setRules(frules);
      } catch (e) {
        console.error('Erro ao carregar logística:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddRule = async () => {
    const region = prompt('Região (ex: SP)');
    if (!region) return;
    const price = Number(prompt('Preço') || '0');
    const rule: FreteRule = {
      id: (crypto.randomUUID && crypto.randomUUID()) || Math.random().toString(36).substring(2, 9),
      region,
      minWeight: 0,
      maxWeight: 999,
      price,
      carrier: 'Correios'
    };
    await addFreteRule(rule);
    setRules((prev) => [...prev, rule]);
  };

  const handleDeleteRule = async (id: string) => {
    await deleteFreteRule(id);
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Logística & Frete</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          {/* Shipment Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Rastreamento de Envios</h2>
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Pedido</th>
                  <th className="px-4 py-3">Transportadora</th>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="px-4 py-2">{s.id}</td>
                    <td className="px-4 py-2">{s.carrier}</td>
                    <td className="px-4 py-2">{s.trackingCode}</td>
                    <td className="px-4 py-2 capitalize">{s.status.replace('_', ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Frete Rules */}
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Tabelas de Frete</h2>
              <button onClick={handleAddRule} className="bg-primary text-white px-3 py-1 rounded-md">
                Nova Regra
              </button>
            </div>
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Região</th>
                  <th className="px-4 py-3">Peso (kg) Min</th>
                  <th className="px-4 py-3">Peso Max</th>
                  <th className="px-4 py-3">Preço</th>
                  <th className="px-4 py-3">Transportadora</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-4 py-2">{r.region}</td>
                    <td className="px-4 py-2">{r.minWeight}</td>
                    <td className="px-4 py-2">{r.maxWeight}</td>
                    <td className="px-4 py-2">R$ {r.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{r.carrier}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDeleteRule(r.id)}
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
        </>
      )}
    </div>
  );
} 
"use client";

import { useEffect, useState, useCallback } from 'react';
import {
  getAllCoupons,
  addCoupon,
  deleteCoupon,
  type Coupon,
  getLocalCoupons
} from '../../services/couponService';

export default function CuponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCoupons = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando carregamento de cupons...');
      
      const cps = await Promise.race([
        getAllCoupons(),
        new Promise<Coupon[]>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 5000);
        })
      ]);
      
      console.log('Cupons carregados:', cps);
      setCoupons(cps);
      
      if (cps.length === 0) {
        try {
          console.log('Criando cupom padrão...');
          const defaultCoupon = {
            id: 'BEMVINDO10',
            code: 'BEMVINDO10',
            type: 'percent' as const,
            value: 10,
            maxUses: 100,
            uses: 0,
            expiresAt: Date.now() + 30 * 86400000,
            createdAt: Date.now()
          };
          
          await addCoupon(defaultCoupon);
          const updatedCoupons = await getAllCoupons();
          setCoupons(updatedCoupons);
          setSuccess('Cupom padrão criado com sucesso!');
        } catch (err) {
          console.error('Erro ao criar cupom padrão:', err);
          setError(`Não foi possível criar o cupom padrão: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
        }
      }
    } catch (e) {
      console.error('Erro ao carregar cupons:', e);
      
      try {
        const localData = getLocalCoupons();
        const localCoupons = Object.values(localData) as Coupon[];
        console.log('Usando cupons locais:', localCoupons);
        setCoupons(localCoupons);
        
        if (e instanceof Error && e.message === 'Timeout') {
          setError('Tempo limite excedido. Usando dados locais.');
        } else {
          setError(`Erro ao carregar cupons: ${e instanceof Error ? e.message : 'Erro desconhecido'}. Usando dados locais.`);
        }
      } catch (localError) {
        console.error('Erro ao usar cupons locais:', localError);
        setCoupons([]);
        setError('Não foi possível carregar os cupons.');
      }
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const handleCreate = async () => {
    setError(null);
    setSuccess(null);
    
    const code = prompt('Código do cupom (ex: PROMO20)');
    if (!code) return;
    
    const value = Number(prompt('Valor (ex: 10 = 10% ou R$10)') || '0');
    if (isNaN(value) || value <= 0) {
      setError('O valor do cupom deve ser um número positivo');
      return;
    }
    
    const type = window.confirm('Cupom percentual? OK = % | Cancel = R$') ? 'percent' : 'fixed';
    
    try {
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
      await loadCoupons();
      setSuccess(`Cupom ${code} criado com sucesso!`);
    } catch (e) {
      console.error('Erro ao criar cupom:', e);
      setError(`Não foi possível criar o cupom: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
      
      loadCoupons();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir cupom?')) return;
    
    setError(null);
    setSuccess(null);
    
    try {
      await deleteCoupon(id);
      await loadCoupons();
      setSuccess(`Cupom excluído com sucesso!`);
    } catch (e) {
      console.error('Erro ao excluir cupom:', e);
      setError(`Não foi possível excluir o cupom: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
      
      loadCoupons();
    }
  };

  const handleRefresh = () => {
    setSuccess(null);
    setError(null);
    loadCoupons();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Cupons, Descontos & Campanhas</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
          <button 
            onClick={handleCreate} 
            className="bg-primary text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            Novo Cupom
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
          <button onClick={handleRefresh} className="ml-2 underline">
            Tentar novamente
          </button>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
          {success}
        </div>
      )}
      
      {loading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-2">Carregando cupons...</p>
        </div>
      ) : coupons.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Nenhum cupom encontrado.</p>
          <button 
            onClick={handleCreate} 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          >
            Criar Primeiro Cupom
          </button>
        </div>
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
"use client";

import { useEffect, useState, useCallback } from 'react';
import {
  getAllCoupons,
  addCoupon,
  deleteCoupon,
  type Coupon
} from '../../services/couponService';

export default function CuponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Garante que o tempo entre tentativas de loading é suficiente
  const loadCoupons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Adiciona um timestamp para evitar cache
      const timestamp = new Date().getTime();
      const cps = await getAllCoupons();
      console.log(`Cupons carregados (${timestamp}):`, cps);
      setCoupons(cps);
      
      // Se não há cupons, cria um cupom padrão
      if (cps.length === 0) {
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
        
        console.log("Criando cupom padrão:", defaultCoupon);
        const result = await addCoupon(defaultCoupon);
        console.log("Resultado da criação do cupom padrão:", result);
        
        // Recarrega os cupons após criar o padrão
        const updatedCoupons = await getAllCoupons();
        setCoupons(updatedCoupons);
        setSuccess("Cupom padrão criado com sucesso!");
      }
    } catch (e) {
      console.error('Erro ao carregar cupons:', e);
      setError(`Não foi possível carregar os cupons: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
      // Define uma lista vazia se houver erro
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoupons();
    
    // Tenta carregar novamente após 2 segundos se não houver cupons
    // Isso ajuda em casos onde o banco de dados MongoDB Atlas pode estar inicializando
    const timer = setTimeout(() => {
      if (coupons.length === 0 && !loading) {
        console.log("Tentando carregar cupons novamente...");
        loadCoupons();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [loadCoupons, loading, coupons.length]);

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
      // Recarrega todos os cupons para garantir sincronização
      await loadCoupons();
      setSuccess(`Cupom ${code} criado com sucesso!`);
    } catch (e) {
      console.error('Erro ao criar cupom:', e);
      setError(`Não foi possível criar o cupom: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir cupom?')) return;
    
    setError(null);
    setSuccess(null);
    
    try {
      await deleteCoupon(id);
      // Recarrega todos os cupons para garantir sincronização
      await loadCoupons();
      setSuccess(`Cupom excluído com sucesso!`);
    } catch (e) {
      console.error('Erro ao excluir cupom:', e);
      setError(`Não foi possível excluir o cupom: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
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
          <button onClick={handleRefresh} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Atualizar
          </button>
          <button onClick={handleCreate} className="bg-primary text-white px-4 py-2 rounded-md">
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
"use client";

import { useEffect, useState, useRef } from 'react';
import { getAllProducts, updateProduct, addProduct, type Product } from '../../services/productService';

interface CsvProduct {
  id?: string;
  name: string;
  category: string;
  price: number;
  estoque: number;
}

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Carregar produtos periodicamente (simulando tempo real)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const carregar = async () => {
      const dbProducts = await getAllProducts();
      setProdutos(dbProducts);
      setLoading(false);
    };
    carregar();
    interval = setInterval(carregar, 5000); // refresh a cada 5s
    return () => clearInterval(interval);
  }, []);

  // Atualizar quantidade em estoque
  const handleChangeQty = async (id: string, qty: number) => {
    const prod = produtos.find((p) => p.id === id);
    if (!prod) return;
    const updated = { ...prod, estoque: qty } as Product;
    await updateProduct(updated);
    setProdutos((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  // CSV import simples (id,name,category,price,estoque) – separador ; ou ,
  const handleImportCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    const header = lines.shift()?.split(/[,;]/).map((h) => h.trim().toLowerCase());
    if (!header) return;
    const list: CsvProduct[] = lines.map((line) => {
      const cols = line.split(/[,;]/).map((c) => c.trim());
      const obj: any = {};
      header.forEach((h, idx) => (obj[h] = cols[idx]));
      return obj as CsvProduct;
    });
    for (const p of list) {
      const product: Product = {
        id: p.id || crypto.randomUUID(),
        name: p.name,
        category: p.category,
        price: Number(p.price),
        description: '',
        imageSrc: '',
        estoque: Number(p.estoque),
        status: 'ativo'
      } as Product;
      await addProduct(product);
    }
    alert("Importação concluída!");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const lowStockColor = (q?: number) => (q !== undefined && q < 10 ? 'bg-red-50' : '');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Monitoramento de Estoque</h1>
        <div className="space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover"
          >
            Importar CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImportCsv}
          />
        </div>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id} className={`border-b last:border-0 ${lowStockColor(p.estoque)}`}>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="w-24 border rounded-md p-1"
                      value={p.estoque || 0}
                      onChange={(e) => handleChangeQty(p.id, Number(e.target.value))}
                    />
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
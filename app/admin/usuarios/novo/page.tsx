"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '../../../services/userService';

export default function NovoUsuarioPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    kycVerified: false
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addUser({
        id: (crypto.randomUUID && crypto.randomUUID()) || Math.random().toString(36).substring(2, 9),
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role as any,
        status: 'active',
        kycVerified: form.kycVerified
      });
      router.push('/admin/usuarios');
    } catch (err) {
      alert('Erro ao salvar usuário. Veja console.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            required
            className="w-full border rounded-md p-2"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded-md p-2"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            className="w-full border rounded-md p-2"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">Cargo</label>
          <select id="role" name="role" className="w-full border rounded-md p-2" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="kyc"
            name="kycVerified"
            type="checkbox"
            className="mr-2"
            checked={form.kycVerified}
            onChange={handleChange}
          />
          <label htmlFor="kyc">KYC Verificado</label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
} 
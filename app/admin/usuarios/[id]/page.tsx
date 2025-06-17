"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getUserById, updateUser, type User } from '../../../services/userService';

export default function EditUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const u = await getUserById(userId);
      setUser(u);
      setLoading(false);
    };
    if (userId) load();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!user) return;
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setUser({ ...user, [target.name]: value } as User);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateUser(user);
      router.push('/admin/usuarios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado.</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Editar Usuário</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            className="w-full border rounded-md p-2"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border rounded-md p-2"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            className="w-full border rounded-md p-2"
            value={user.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">Cargo</label>
          <select id="role" name="role" className="w-full border rounded-md p-2" value={user.role} onChange={handleChange}>
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
            checked={user.kycVerified}
            onChange={handleChange}
          />
          <label htmlFor="kyc">KYC Verificado</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
          <select id="status" name="status" className="w-full border rounded-md p-2" value={user.status} onChange={handleChange}>
            <option value="active">Ativo</option>
            <option value="blocked">Bloqueado</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
} 
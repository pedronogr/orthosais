"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllUsers, deleteUser, toggleBlockUser, type User } from '../../services/userService';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar usuários (mock + IndexedDB)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const mocks: User[] = [
          {
            id: 'u1',
            name: 'Administrador',
            email: 'admin@orthosais.com',
            phone: '11999999999',
            role: 'admin',
            status: 'active',
            kycVerified: true,
            createdAt: Date.now() - 86400000
          },
          {
            id: 'u2',
            name: 'Vendedor Exemplo',
            email: 'seller@loja.com',
            role: 'seller',
            status: 'blocked',
            kycVerified: false,
            createdAt: Date.now() - 172800000
          }
        ];

        const dbUsers = await getAllUsers();
        setUsuarios([...mocks, ...dbUsers]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    await deleteUser(id);
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleBlock = async (id: string) => {
    await toggleBlockUser(id);
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gerenciar Usuários</h1>
        <Link
          href="/admin/usuarios/novo"
          className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-md flex items-center shadow-sm"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Usuário
        </Link>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">KYC</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                  <td className="px-4 py-2">
                    {u.kycVerified ? (
                      <span className="text-green-600 font-medium">Verificado</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pendente</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {u.status === 'active' ? (
                      <span className="text-green-600">Ativo</span>
                    ) : (
                      <span className="text-red-600">Bloqueado</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right whitespace-nowrap space-x-2">
                    <Link href={`/admin/usuarios/${u.id}`} className="text-blue-600 hover:underline text-xs">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleToggleBlock(u.id)}
                      className="text-orange-600 hover:underline text-xs"
                    >
                      {u.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:underline text-xs">
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
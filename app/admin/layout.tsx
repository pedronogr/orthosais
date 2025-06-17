"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAppContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Verificar se o usuário é admin
  useEffect(() => {
    const checkAdminStatus = () => {
      if (!isAuthenticated || !user) {
        router.push('/');
        return;
      }

      // Verificar se o email é o do administrador
      if (user.email === 'pedro@admin.com') {
        setIsAdmin(true);
      } else {
        router.push('/');
      }
    };

    checkAdminStatus();
  }, [user, isAuthenticated, router]);

  if (!isAdmin) {
    return <div className="flex justify-center items-center h-screen">Verificando permissões...</div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Orthosais Admin</h1>
        </div>

        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>

          <Link href="/admin/produtos" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Produtos
          </Link>

          <Link href="/admin/pedidos" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Pedidos
          </Link>

          {/* Novos módulos */}
          <Link href="/admin/usuarios" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Usuários
          </Link>

          <Link href="/admin/analytics" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm6 0v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" />
            </svg>
            Analytics & KPIs
          </Link>

          <Link href="/admin/estoque" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8m16 0h-6m6 0l-2 9H6l-2-9m2 0h12" />
            </svg>
            Estoque
          </Link>

          <Link href="/admin/logistica" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-1 13H4L3 3z" />
            </svg>
            Logística & Frete
          </Link>

          <Link href="/admin/pagamentos" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2" />
              <rect width="20" height="8" x="2" y="9" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v2" />
            </svg>
            Pagamentos
          </Link>

          <Link href="/admin/cupons" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Cupons & Campanhas
          </Link>

          <Link href="/admin/reviews" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
            </svg>
            Reviews
          </Link>

          <Link href="/admin/suporte" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Suporte
          </Link>

          <Link href="/admin/rma" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
            </svg>
            Devoluções
          </Link>

          <Link href="/admin/cms" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20v-6m0-4V4m0 0L8 8m4-4l4 4" />
            </svg>
            CMS
          </Link>

          <Link href="/admin/auditoria" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6l8 4-8 4z" />
            </svg>
            Auditoria
          </Link>

          <Link href="/admin/notificacoes" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notificações
          </Link>

          <Link href="/admin/catalogo" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 17h18" />
            </svg>
            Catálogo Avançado
          </Link>

          <Link href="/admin/marketing-sellers" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6" />
            </svg>
            Marketing Sellers
          </Link>

          <Link href="/admin/configuracoes" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configurações
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold">Painel Administrativo</h2>

            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-600">
                Olá, {user?.name}
              </span>

              <Link href="/" className="text-sm text-primary hover:text-primary-hover">
                Voltar ao site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 
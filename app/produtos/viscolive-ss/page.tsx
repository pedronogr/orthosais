"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/produtos/viscolivess');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirecionando para a página correta...</p>
    </div>
  );
} 
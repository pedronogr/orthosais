"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAppContext } from '../context/AppContext';
import Image from 'next/image';
import { getOrder, OrderResponse } from '../services/arkamaService';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { cart } = useAppContext();
  const [orderDetails, setOrderDetails] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Buscar detalhes do pedido da API Arkama
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Recuperar o ID do pedido do localStorage
        const orderId = localStorage.getItem('lastOrderId');
        
        if (!orderId) {
          // Se não houver ID de pedido, redirecionar para a página inicial
          router.push('/');
          return;
        }
        
        // Buscar detalhes do pedido da API Arkama
        const orderData = await getOrder(orderId);
        setOrderDetails(orderData);
      } catch (err) {
        console.error('Erro ao buscar detalhes do pedido:', err);
        setError('Não foi possível carregar os detalhes do pedido.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [router]);
  
  // Redirecionar se houver itens no carrinho
  useEffect(() => {
    if (cart.length > 0) {
      router.push('/checkout');
    }
  }, [cart, router]);
  
  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Carregando detalhes do pedido...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  
  if (error) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar pedido</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link 
                href="/" 
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition"
              >
                Voltar para a Página Inicial
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Início', href: '/' },
              { label: 'Checkout', href: '/checkout' },
              { label: 'Pedido Confirmado', href: '/pedido-confirmado' }
            ]} 
          />
          
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h1>
              <p className="text-gray-600 mb-4">
                Obrigado pela sua compra. Seu pedido foi recebido e está sendo processado.
              </p>
              
              <div className="bg-gray-50 rounded-md p-4 inline-block">
                <p className="text-sm text-gray-600">Número do Pedido</p>
                <p className="text-xl font-bold text-primary">{orderDetails?.id}</p>
              </div>
            </div>
            
            <div className="border-t border-b py-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                {orderDetails?.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center py-2">
                    {/* Imagem do Produto */}
                    <div className="w-16 h-16 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0">
                      {item.imageSrc ? (
                        <Image 
                          src={item.imageSrc} 
                          alt={item.name} 
                          fill 
                          sizes="64px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">{item.quantity}x</span>
                          <span className="text-gray-800">{item.name}</span>
                        </div>
                        <span className="text-primary font-medium">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">
                    R$ {(orderDetails ? orderDetails.total - 15.90 : 0).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-800 font-medium">R$ 15,90</span>
                </div>
                
                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-bold">Total</span>
                    <span className="text-primary text-xl font-bold">
                      R$ {orderDetails?.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-b py-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Próximos Passos</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Confirmação por E-mail</h3>
                    <p className="text-gray-600 text-sm">
                      Enviamos um e-mail com os detalhes do seu pedido para o endereço fornecido.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Processamento</h3>
                    <p className="text-gray-600 text-sm">
                      Nossa equipe está preparando seu pedido para envio.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Envio</h3>
                    <p className="text-gray-600 text-sm">
                      Assim que seu pedido for enviado, você receberá um código de rastreamento.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Entrega</h3>
                    <p className="text-gray-600 text-sm">
                      Seu pedido será entregue no endereço fornecido em até 10 dias úteis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Se você tiver alguma dúvida sobre seu pedido, entre em contato com nosso atendimento ao cliente.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/" 
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition"
                >
                  Voltar para a Página Inicial
                </Link>
                
                <Link 
                  href="/produtos" 
                  className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-gray-50 transition"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 
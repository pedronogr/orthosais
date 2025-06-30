"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ShippingCalculator from '../components/ShippingCalculator';
import { useAppContext } from '../context/AppContext';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    cartTotal 
  } = useAppContext();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState<any>(null);

  // Calcular o subtotal quando o carrinho mudar
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleShippingSelection = (option: any) => {
    setSelectedShipping(option);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }
    
    if (!selectedShipping) {
      alert('Por favor, selecione uma opção de frete antes de finalizar a compra.');
      return;
    }
    
    // Aqui você pode armazenar as informações do carrinho para a página de checkout
    // Por exemplo, em localStorage ou context
    
    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Início', href: '/' },
            { label: 'Carrinho', href: '/carrinho' }
          ]} 
        />
        
        <h1 className="text-3xl font-bold text-primary mt-6 mb-8">Meu Carrinho</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Parece que você ainda não adicionou nenhum produto ao seu carrinho. 
                Explore nossa loja e descubra produtos incríveis para sua saúde e bem-estar.
              </p>
              <Link 
                href="/produtos" 
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Explorar Produtos
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      Produtos ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
                
                {/* Itens do Carrinho */}
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center border-b">
                      {/* Imagem do Produto */}
                      <div className="w-24 h-24 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                        {item.imageSrc ? (
                          <Image 
                            src={item.imageSrc} 
                            alt={item.name} 
                            fill 
                            sizes="96px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Sem imagem
                          </div>
                        )}
                      </div>
                      
                      {/* Detalhes do Produto */}
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              R$ {item.price.toFixed(2).replace('.', ',')} cada
                            </p>
                          </div>
                          
                          <div className="mt-4 sm:mt-0">
                            <p className="text-primary font-medium text-lg">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* Controles de Quantidade */}
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary"
                              aria-label="Diminuir quantidade"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center border-x">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary"
                              aria-label="Aumentar quantidade"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Remover Item */}
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                          >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Calculadora de Frete */}
                <div className="mt-8">
                  <ShippingCalculator
                    products={cart.map(item => ({
                      id: item.id,
                      width: 11, // cm - valores default
                      height: 4, // cm
                      length: 16, // cm
                      weight: 0.3, // kg
                      price: item.price,
                      quantity: item.quantity
                    }))}
                    onSelectShipping={handleShippingSelection}
                  />
                </div>
              </div>
            </div>
            
            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="text-gray-800 font-medium">
                      {selectedShipping 
                        ? `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`
                        : 'Calcular acima'}
                    </span>
                  </div>
                  
                  {selectedShipping && (
                    <div className="flex justify-between text-sm text-gray-500 pb-2">
                      <span>Entrega em</span>
                      <span>{selectedShipping.company.name} - {selectedShipping.delivery_time} dias úteis</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-bold">Total</span>
                      <span className="text-primary text-xl font-bold">
                        R$ {(subtotal + (selectedShipping ? selectedShipping.price : 0)).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || !selectedShipping}
                  className={`w-full mt-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors flex items-center justify-center
                    ${cart.length > 0 && selectedShipping 
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Finalizar Pedido
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Formas de Pagamento</h3>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                <div className="mt-6 text-xs text-gray-500">
                  <p>Frete calculado para entrega padrão. Opções adicionais disponíveis no checkout.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
} 
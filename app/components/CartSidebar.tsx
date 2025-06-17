"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';

export default function CartSidebar() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    isCartOpen, 
    toggleCart 
  } = useAppContext();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-primary">Seu Carrinho</h2>
          <button 
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Seu carrinho está vazio</h3>
              <p className="text-gray-500 mb-4">Adicione produtos para continuar comprando</p>
              <button 
                onClick={toggleCart}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  {/* Imagem do Produto */}
                  <div className="w-20 h-20 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0">
                    {item.imageSrc ? (
                      <Image 
                        src={item.imageSrc} 
                        alt={item.name} 
                        fill 
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  
                  {/* Detalhes do Produto */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <span className="text-primary font-medium">
                        R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">R${item.price.toFixed(2).replace('.', ',')} cada</p>
                    
                    {/* Controles de Quantidade */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                          aria-label="Diminuir quantidade"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                          aria-label="Aumentar quantidade"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Remover Item */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remover item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Limpar Carrinho */}
              <div className="text-right mt-4">
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Limpar Carrinho
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4">
            {/* Subtotal */}
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-lg">R${cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {/* Botões */}
            <div className="grid grid-cols-1 gap-3">
              <Link 
                href="/carrinho" 
                onClick={toggleCart}
                className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-hover text-center font-medium"
              >
                Ver Carrinho
              </Link>
              
              <Link 
                href="/checkout" 
                onClick={toggleCart}
                className="px-4 py-3 bg-secondary text-white rounded-md hover:bg-secondary-hover text-center font-medium"
              >
                Finalizar Compra
              </Link>
              
              <button 
                onClick={toggleCart}
                className="px-4 py-2 text-primary hover:underline text-center mt-2"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 
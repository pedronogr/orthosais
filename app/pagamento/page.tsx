"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAppContext } from '../context/AppContext';
import { createOrder } from '../services/arkamaService';

export default function PaymentPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useAppContext();
  
  // Estados para o formulário
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  
  // Verificar se o carrinho está vazio ou se não há endereço de entrega
  useEffect(() => {
    // Carregar endereço de entrega
    const savedAddress = localStorage.getItem('shippingAddress');
    if (!savedAddress) {
      router.push('/checkout');
      return;
    }
    
    try {
      const parsedAddress = JSON.parse(savedAddress);
      setShippingAddress(parsedAddress);
    } catch (err) {
      console.error('Erro ao carregar endereço de entrega:', err);
      router.push('/checkout');
    }
    
    // Carregar cupom aplicado, se houver
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        const parsedCoupon = JSON.parse(savedCoupon);
        setAppliedCoupon(parsedCoupon);
      } catch (err) {
        console.error('Erro ao carregar cupom aplicado:', err);
      }
    }
    
    // Verificar carrinho
    if (cart.length === 0) {
      router.push('/produtos');
    }
  }, [cart, router]);
  
  // Formatar o número do cartão
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value);
  };
  
  // Formatar a data de expiração do cartão
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCardExpiry(value);
    }
  };
  
  // Formatar o CVV do cartão
  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCardCvv(value);
    }
  };
  
  // Enviar o pedido
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validar formulário de acordo com o método de pagamento
    if (paymentMethod === 'credit') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setError('Por favor, preencha todos os dados do cartão.');
        setIsLoading(false);
        return;
      }
    }
    
    try {
      // Preparar os dados para a API Arkama
      const orderData = {
        total: totalWithShipping,
        paymentMethod: paymentMethod,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        customer: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          document: shippingAddress.cpf,
          phone: shippingAddress.phone
        },
        shipping: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.cep,
          number: shippingAddress.number,
          complement: shippingAddress.complement || ''
        },
        coupon: appliedCoupon ? {
          code: appliedCoupon.coupon.code,
          discount: appliedCoupon.discountValue
        } : null
      };
      
      // Enviar para a API Arkama
      const response = await createOrder(orderData);
      
      // Salvar o ID do pedido para referência futura
      setOrderId(response.id);
      localStorage.setItem('lastOrderId', response.id);
      
      // Limpar o carrinho e o endereço salvo
      clearCart();
      localStorage.removeItem('shippingAddress');
      
      // Redirecionar para a página de confirmação
      router.push('/pedido-confirmado');
    } catch (err) {
      setError('Erro ao processar o pagamento. Tente novamente.');
      console.error('Erro ao processar pagamento:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cálculo do frete (será substituído por API de frete)
  const shippingCost = 15.90;
  
  // Cálculo com desconto de cupom
  const discountValue = appliedCoupon ? appliedCoupon.discountValue : 0;
  const totalWithShipping = cartTotal + shippingCost - discountValue;
  
  if (!shippingAddress) {
    return null; // Aguardando carregamento ou redirecionamento
  }
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Início', href: '/' },
              { label: 'Carrinho', href: '/carrinho' },
              { label: 'Dados de Entrega', href: '/checkout' },
              { label: 'Pagamento', href: '/pagamento' }
            ]} 
          />
          
          <h1 className="text-3xl font-bold text-primary mt-6 mb-8">Pagamento</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Pagamento */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Resumo do Endereço */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Endereço de Entrega</h2>
                    <Link 
                      href="/checkout" 
                      className="text-primary hover:text-primary-hover text-sm"
                    >
                      Editar
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium text-gray-800">{shippingAddress.name}</p>
                    <p className="text-gray-600 mt-1">
                      {shippingAddress.address}, {shippingAddress.number}
                      {shippingAddress.complement && `, ${shippingAddress.complement}`}
                    </p>
                    <p className="text-gray-600">
                      {shippingAddress.neighborhood}, {shippingAddress.city} - {shippingAddress.state}
                    </p>
                    <p className="text-gray-600">CEP: {shippingAddress.cep}</p>
                    <p className="text-gray-600 mt-1">Telefone: {shippingAddress.phone}</p>
                  </div>
                </div>
                
                {/* Método de Pagamento */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Método de Pagamento</h2>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="radio"
                        id="credit"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="credit" className="ml-2 text-sm font-medium text-gray-700">
                        Cartão de Crédito
                      </label>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <input
                        type="radio"
                        id="pix"
                        name="paymentMethod"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={() => setPaymentMethod('pix')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="pix" className="ml-2 text-sm font-medium text-gray-700">
                        Pix
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="boleto"
                        name="paymentMethod"
                        value="boleto"
                        checked={paymentMethod === 'boleto'}
                        onChange={() => setPaymentMethod('boleto')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="boleto" className="ml-2 text-sm font-medium text-gray-700">
                        Boleto Bancário
                      </label>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit' && (
                    <div className="mt-4 border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número do Cartão*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={16}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Apenas números"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome no Cartão*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Como está impresso no cartão"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Validade*
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            maxLength={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="MMAA"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV*
                          </label>
                          <input
                            type="text"
                            id="cardCvv"
                            value={cardCvv}
                            onChange={handleCardCvvChange}
                            maxLength={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Código de segurança"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'pix' && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Após confirmar o pedido, você receberá um QR Code para pagamento.
                      </p>
                      <div className="bg-gray-50 p-6 rounded-md flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9997 1.89453L5.63574 8.25848L8.25777 10.8805L14.6217 4.51656L11.9997 1.89453Z"></path>
                          <path d="M18.364 8.25848L12 1.89453L9.37797 4.51656L15.742 10.8805L18.364 8.25848Z"></path>
                          <path d="M5.63574 15.7417L11.9997 22.1057L14.6217 19.4837L8.25777 13.1198L5.63574 15.7417Z"></path>
                          <path d="M15.742 13.1198L9.37797 19.4837L12 22.1057L18.364 15.7417L15.742 13.1198Z"></path>
                        </svg>
                        <p className="text-center text-gray-700 font-medium">
                          Você receberá o QR Code após confirmar o pedido
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'boleto' && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Após confirmar o pedido, você poderá imprimir o boleto ou copiar o código de barras.
                        O prazo de entrega será contado a partir da confirmação do pagamento.
                      </p>
                      <div className="bg-gray-50 p-6 rounded-md flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-center text-gray-700 font-medium">
                          Você receberá o boleto após confirmar o pedido
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Link 
                    href="/checkout" 
                    className="px-6 py-3 mr-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Voltar para Dados de Entrega
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition disabled:opacity-70"
                  >
                    {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
                
                <div className="mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b">
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
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="text-gray-800 font-medium">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Cupom {appliedCoupon.coupon.code}</span>
                      <span>- R$ {appliedCoupon.discountValue.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-bold">Total</span>
                      <span className="text-primary text-xl font-bold">R$ {totalWithShipping.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pagamento 100% seguro
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Site protegido e certificado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

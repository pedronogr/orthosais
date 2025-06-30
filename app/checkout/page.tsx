"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ShippingCalculator from '../components/ShippingCalculator';
import { useAppContext } from '../context/AppContext';
import { getAllCoupons, updateCoupon, type Coupon } from '../services/couponService';
import { verifyCoupon, incrementCouponUse } from '../services/couponService';
import { ShippingOption } from '../services/shippingService';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal } = useAppContext();
  
  // Estados para o formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<Coupon | null>(null);
  const [discountValue, setDiscountValue] = useState(0);
  
  // Estado para opção de frete
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  
  // Verificar se o carrinho está vazio
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/produtos');
    }
  }, [cart, router]);
  
  // Verificar se o usuário está autenticado e carregar opção de frete selecionada
  useEffect(() => {
    // Carregar dados do usuário
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.name) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    
    // Carregar opção de frete selecionada
    const savedShipping = localStorage.getItem('selectedShipping');
    if (savedShipping) {
      try {
        const parsedShipping = JSON.parse(savedShipping);
        setSelectedShipping(parsedShipping);
      } catch (error) {
        console.error('Erro ao carregar dados do frete:', error);
      }
    }
  }, []);
  
  // Buscar endereço pelo CEP
  const fetchAddressByCep = async () => {
    if (cep.length !== 8) {
      setError('CEP inválido');
      return;
    }
    
    try {
      setCepLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setError('CEP não encontrado');
      } else {
        setAddress(data.logradouro || '');
        setNeighborhood(data.bairro || '');
        setCity(data.localidade || '');
        setState(data.uf || '');
        setError('');
      }
    } catch (err) {
      setError('Erro ao buscar o CEP');
      console.error(err);
    } finally {
      setCepLoading(false);
    }
  };
  
  // Formatar o CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };
  
  // Formatar o CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCpf(value);
  };
  
  // Formatar o telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };
  
  // Continuar para pagamento
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    if (!name || !email || !cpf || !phone || !cep || !address || !number || !neighborhood || !city || !state) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Validar se uma opção de frete foi selecionada
    if (!selectedShipping) {
      setError('Por favor, selecione uma opção de frete.');
      return;
    }
    
    // Salvar dados do endereço no localStorage para usar na página de pagamento
    const shippingAddress = {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      number,
      complement,
      neighborhood,
      city,
      state
    };
    
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    
    // Redirecionar para a página de pagamento
    router.push('/pagamento');
  };
  
  // Calcular o frete (valor selecionado ou padrão)
  const shippingCost = selectedShipping ? selectedShipping.price : 15.90;
  const totalWithShipping = cartTotal + shippingCost - discountValue;
  
  // Aplicar cupom
  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    
    try {
      const result = await verifyCoupon(couponCode);
      
      if (!result.coupon) {
        alert('Cupom não encontrado');
        return;
      }
      
      if (!result.isValid) {
        alert(`Cupom inválido: ${result.reason === 'expirado' ? 'expirado' : 'limite de usos atingido'}`);
        return;
      }
      
      // Calcular desconto
      const discount = result.coupon.type === 'percent' 
        ? cartTotal * (result.coupon.value / 100) 
        : result.coupon.value;
      
      setDiscountValue(discount);
      setCouponApplied(result.coupon);
      
      // Salvar o cupom aplicado no localStorage para usar na página de pagamento
      localStorage.setItem('appliedCoupon', JSON.stringify({
        coupon: result.coupon,
        discountValue: discount
      }));
      
      // Incrementar o uso do cupom
      await incrementCouponUse(result.coupon.id);
    } catch (err) {
      console.error("Erro ao aplicar cupom:", err);
      alert('Não foi possível verificar o cupom. Tente novamente.');
    }
  };
  
  // Callback quando uma opção de frete é selecionada
  const handleSelectShipping = (option: ShippingOption) => {
    setSelectedShipping(option);
    localStorage.setItem('selectedShipping', JSON.stringify(option));
  };
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Início', href: '/' },
              { label: 'Carrinho', href: '/carrinho' },
              { label: 'Dados de Entrega', href: '/checkout' }
            ]} 
          />
          
          <h1 className="text-3xl font-bold text-primary mt-6 mb-8">Dados de Entrega</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Checkout */}
            <div className="lg:col-span-2">
              <form onSubmit={handleContinueToPayment}>
                {/* Dados Pessoais */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Dados Pessoais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo*
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                        CPF*
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        maxLength={11}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Apenas números"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone*
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={11}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="DDD + número"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Endereço de Entrega */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Endereço de Entrega</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                        CEP*
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="cep"
                          value={cep}
                          onChange={handleCepChange}
                          onBlur={fetchAddressByCep}
                          maxLength={8}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Apenas números"
                          required
                        />
                        <button
                          type="button"
                          onClick={fetchAddressByCep}
                          disabled={cepLoading}
                          className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-hover transition disabled:opacity-70"
                        >
                          {cepLoading ? 'Buscando...' : 'Buscar'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço*
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                        Número*
                      </label>
                      <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        id="complement"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro*
                      </label>
                      <input
                        type="text"
                        id="neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade*
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado*
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Opções de Frete */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Opções de Entrega</h2>
                  
                  {selectedShipping ? (
                    <div className="mb-4">
                      <div 
                        className="p-3 border border-primary rounded-md bg-amber-50"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{selectedShipping.carrier} - {selectedShipping.service}</p>
                            <p className="text-sm text-gray-600">
                              Entrega em até {selectedShipping.days} {selectedShipping.days === 1 ? 'dia útil' : 'dias úteis'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              R$ {selectedShipping.price.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedShipping(null)}
                        className="text-primary hover:text-primary-hover text-sm mt-2"
                      >
                        Alterar opção de entrega
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-4">
                        Calcule e selecione uma opção de entrega:
                      </p>
                      <ShippingCalculator 
                        productWeight={cart.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0)}
                        onSelectShipping={handleSelectShipping}
                      />
                    </div>
                  )}
                </div>
                
                {/* Cupom */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Cupom de Desconto</h2>
                  {couponApplied ? (
                    <p className="text-green-600">Cupom {couponApplied.code} aplicado! Desconto de {discountValue.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p>
                  ) : (
                    <div className="flex gap-2">
                      <input value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} className="flex-1 border p-2 rounded-md" placeholder="Código do cupom" />
                      <button type="button" onClick={handleApplyCoupon} className="bg-primary text-white px-4 py-2 rounded-md">Aplicar</button>
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
                    href="/carrinho" 
                    className="px-6 py-3 mr-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Voltar para o Carrinho
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition disabled:opacity-70"
                  >
                    {isLoading ? 'Processando...' : 'Continuar para Pagamento'}
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
                    <span className="text-gray-800 font-medium">
                      {selectedShipping ? (
                        `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                      ) : (
                        'Selecione uma opção'
                      )}
                    </span>
                  </div>
                  
                  {discountValue > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="">Desconto</span>
                      <span className="">- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Compra 100% segura
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {selectedShipping ? (
                      `Entrega em até ${selectedShipping.days} ${selectedShipping.days === 1 ? 'dia útil' : 'dias úteis'}`
                    ) : (
                      'Selecione uma opção de entrega'
                    )}
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
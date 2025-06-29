"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria feita a integração com API de envio de mensagens
    console.log("Dados do formulário:", formData);
    
    // Feedback temporário de envio bem-sucedido
    setFormSubmitted(true);
    
    // Resetar o formulário após 5 segundos
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      });
    }, 5000);
  };
  
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16" style={{ color: '#fff', opacity: 1, filter: 'none' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-lg mb-0">
              Estamos à disposição para atender suas dúvidas, solicitações e sugestões.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Informações de Contato</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Endereço</h3>
                  <p className="text-gray-700">
                    Endereço da Orthosais Farma<br />
                    Cidade, Estado - CEP: XXXXX-XXX<br />
                    Brasil
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Telefones</h3>
                  <p className="text-gray-700">
                    Geral: (XX) XXXX-XXXX<br />
                    SAC: 0800 XXX XXXX
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Email</h3>
                  <p className="text-gray-700">
                    Comercial: comercial@orthosaisfarma.com.br<br />
                    SAC: sac@orthosaisfarma.com.br
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Horário de Atendimento</h3>
                  <p className="text-gray-700">
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-3">Siga-nos</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/orthosais/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Envie sua Mensagem</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Sua mensagem foi enviada com sucesso! Entraremos em contato o mais breve possível.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto *</label>
                    <select
                      id="subject"
                      name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="comercial">Comercial</option>
                      <option value="sac">SAC</option>
                      <option value="farmacovigilancia">Farmacovigilância</option>
                      <option value="trabalhe-conosco">Trabalhe Conosco</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                        checked={formData.privacy}
                        onChange={handleCheckboxChange}
                      className="mt-1 mr-2"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700">
                        Li e concordo com a <Link href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</Link> *
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover transition"
                    >
                      ENVIAR MENSAGEM
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Nossa Localização</h2>
            
            <div className="bg-gray-300 h-96 rounded-lg overflow-hidden">
              {/* Aqui seria inserido um mapa real, mas para este exemplo usamos um placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Mapa da localização da Orthosais Farma
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-2">Como posso adquirir os produtos da Orthosais Farma?</h3>
                <p className="text-gray-700">
                  Nossos produtos podem ser encontrados em farmácias e drogarias selecionadas em todo o Brasil. 
                  Para informações sobre pontos de venda específicos, entre em contato com nossa equipe comercial.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-2">Como posso me tornar um distribuidor?</h3>
                <p className="text-gray-700">
                  Para se tornar um distribuidor dos produtos Orthosais Farma, entre em contato com nosso 
                  departamento comercial através do email comercial@orthosaisfarma.com.br ou pelo telefone (XX) XXXX-XXXX.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-2">Como posso enviar meu currículo?</h3>
                <p className="text-gray-700">
                  Para enviar seu currículo, selecione a opção "Trabalhe Conosco" no formulário de contato 
                  e anexe seu currículo no campo de mensagem, ou envie diretamente para o email rh@orthosaisfarma.com.br.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
"use client";

import { useState } from 'react';
import PageLayout from '../PageLayout';

// Tipo para item de FAQ
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  // Categorias disponíveis
  const categories = [
    "Todos",
    "Produtos",
    "Pedidos",
    "Envio e Entrega",
    "Informações Técnicas",
    "Empresa"
  ];
  
  // Estado para controlar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  // Estado para controlar quais itens estão expandidos
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  
  // Função para alternar a expansão de um item
  const toggleItem = (questionId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Lista de perguntas frequentes
  const faqItems: FAQItem[] = [
    {
      question: "Quais são os principais produtos da Orthosais Farma?",
      answer: "A Orthosais Farma oferece uma variedade de produtos farmacêuticos distribuídos em quatro linhas principais: Linha Proteção, Linha Vida, Linha Saúde e Linha Especializada. Nossos produtos são desenvolvidos com foco na proteção e promoção da saúde, utilizando tecnologia avançada e ingredientes de alta qualidade.",
      category: "Produtos"
    },
    {
      question: "Os produtos da Orthosais Farma são aprovados pela ANVISA?",
      answer: "Sim, todos os produtos da Orthosais Farma são devidamente registrados e aprovados pela ANVISA (Agência Nacional de Vigilância Sanitária), seguindo rigorosos padrões de qualidade e segurança. Você pode verificar os registros no site da ANVISA usando o número que consta na embalagem de cada produto.",
      category: "Produtos"
    },
    {
      question: "Como posso comprar produtos da Orthosais Farma?",
      answer: "Os produtos da Orthosais Farma estão disponíveis em farmácias e drogarias de todo o Brasil. Você também pode adquiri-los através de nossos distribuidores autorizados. Para informações sobre pontos de venda mais próximos, entre em contato com nosso SAC.",
      category: "Pedidos"
    },
    {
      question: "Posso comprar diretamente no site da Orthosais Farma?",
      answer: "Atualmente, não realizamos vendas diretas pelo nosso site. Nossos produtos podem ser encontrados em farmácias, drogarias e distribuidores autorizados em todo o Brasil.",
      category: "Pedidos"
    },
    {
      question: "A Orthosais Farma oferece programas para profissionais de saúde?",
      answer: "Sim, a Orthosais Farma mantém programas específicos para profissionais de saúde, incluindo materiais técnicos, amostras e suporte científico. Para mais informações, acesse a seção 'Área do Profissional' em nosso site ou entre em contato com nosso departamento de relacionamento profissional.",
      category: "Empresa"
    },
    {
      question: "Quais são as certificações que a Orthosais Farma possui?",
      answer: "A Orthosais Farma possui certificações nacionais e internacionais que atestam a qualidade de nossos processos e produtos, incluindo certificação de Boas Práticas de Fabricação (BPF) da ANVISA, ISO 9001, e outras certificações específicas para processos farmacêuticos.",
      category: "Empresa"
    },
    {
      question: "Como posso verificar a autenticidade de um produto Orthosais Farma?",
      answer: "Todos os produtos Orthosais Farma possuem elementos de segurança nas embalagens, como número de lote, data de fabricação e validade. Em caso de dúvida sobre a autenticidade, entre em contato com nosso SAC informando esses dados para verificação.",
      category: "Produtos"
    },
    {
      question: "Os produtos da Orthosais Farma são testados em animais?",
      answer: "A Orthosais Farma tem compromisso com práticas éticas. Utilizamos métodos alternativos de teste que não envolvem animais sempre que possível e seguimos rigorosamente as regulamentações éticas quando testes são necessários para garantir a segurança dos produtos.",
      category: "Informações Técnicas"
    },
    {
      question: "Existe um programa de fidelidade para clientes da Orthosais Farma?",
      answer: "No momento, não possuímos um programa de fidelidade direto para consumidores finais. No entanto, trabalhamos com parceiros comerciais que podem oferecer benefícios em seus próprios programas de fidelidade na compra de produtos Orthosais.",
      category: "Pedidos"
    },
    {
      question: "Como posso relatar uma reação adversa a um produto Orthosais?",
      answer: "A segurança dos nossos consumidores é nossa prioridade. Caso observe qualquer reação adversa, entre em contato imediatamente com nosso departamento de Farmacovigilância pelo telefone ou email disponíveis na seção 'Farmacovigilância' do nosso site. Você também pode relatar através do seu profissional de saúde ou diretamente à ANVISA.",
      category: "Informações Técnicas"
    },
    {
      question: "Quais são os prazos de entrega para pedidos institucionais?",
      answer: "Os prazos de entrega para pedidos institucionais variam conforme a região e o volume solicitado. Normalmente, entregamos em capitais e grandes centros em até 3 dias úteis, e em outras localidades em até 7 dias úteis. Para informações específicas, consulte nosso departamento comercial.",
      category: "Envio e Entrega"
    },
    {
      question: "A Orthosais Farma possui programas de responsabilidade social?",
      answer: "Sim, a Orthosais Farma mantém diversos programas de responsabilidade social, focados principalmente em educação em saúde, acesso a medicamentos em comunidades carentes e sustentabilidade ambiental. Você pode conhecer mais sobre essas iniciativas na seção 'Responsabilidade Social' do nosso site.",
      category: "Empresa"
    }
  ];
  
  // Filtra os itens de FAQ com base na categoria selecionada
  const filteredItems = selectedCategory === "Todos" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);
  
  return (
    <PageLayout 
      title="Perguntas Frequentes" 
      description="Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços"
      headerImageSrc="/images/faq-header.jpg"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Filtros de categoria */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-center text-gray-600">
            Filtrando por: <span className="font-medium text-primary">{selectedCategory}</span>
          </p>
        </div>
        
        {/* Lista de FAQs */}
        <div className="max-w-3xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">Nenhuma pergunta encontrada nesta categoria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => {
                const questionId = `question-${index}`;
                const isExpanded = expandedItems[questionId] || false;
                
                return (
                  <div 
                    key={questionId}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(questionId)}
                      className={`w-full text-left p-5 flex justify-between items-center transition-colors ${
                        isExpanded ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <span className="text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    
                    {isExpanded && (
                      <div className="p-5 bg-white border-t border-gray-200">
                        <p className="text-gray-700">{item.answer}</p>
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary bg-opacity-10 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Seção de Contato */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Não encontrou o que procurava?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Se você não encontrou a resposta para sua pergunta, entre em contato com nossa equipe de atendimento ao cliente.
            Estamos prontos para ajudar com qualquer dúvida ou informação adicional sobre nossos produtos e serviços.
          </p>
          <a 
            href="/contato" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover transition"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </PageLayout>
  );
} 
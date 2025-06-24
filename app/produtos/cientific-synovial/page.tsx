import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Cientific Synovial® | Suporte Articular Avançado',
};

export default function CientificSynovialPage() {
  return (
    <div className="bg-background text-foreground leading-relaxed antialiased">
      {/* Header */}
      <header className="bg-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Cientific Synovial<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 md:mt-0 text-lg">Suplemento Premium de Suporte Articular</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-hover text-white py-20">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Fórmula avançada para a saúde das articulações</h2>
            <ul className="list-disc ml-6 space-y-3 text-lg">
              <li>Glucosamina + Condroitina + MSM + Ácido Hialurônico</li>
              <li>Apoio à manutenção da cartilagem e mobilidade</li>
              <li>Cápsulas concentradas para conforto diário</li>
              <li>Frasco econômico com 60 cápsulas</li>
            </ul>
            <Link
              href="#informacoes"
              className="inline-block mt-8 bg-white text-primary font-semibold py-3 px-10 rounded-full transition"
            >
              Quero comprar
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/cientificsy.png"
              alt="Frasco de Cientific Synovial"
              width={400}
              height={450}
              className="object-contain rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section id="informacoes" className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Detalhes do Produto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700">
            {/* Composição */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Composição</h3>
              <p>Cada dose (2 cápsulas) contém:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>1500 mg Sulfato de Glucosamina (a partir de glucosamina vegetal)</li>
                <li>1200 mg Sulfato de Condroitina</li>
                <li>500 mg Metilsulfonilmetano (MSM)</li>
                <li>40 mg Ácido Hialurônico</li>
              </ul>
              <p className="mt-2">Excipientes: gelatina vegetal, água purificada.</p>
            </div>

            {/* Indicações */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Indicações</h3>
              <p>
                Suplemento alimentar destinado a auxiliar na manutenção da saúde das
                articulações, contribuindo para integridade da cartilagem, mobilidade
                e conforto articular em atividades diárias e esportivas.
              </p>
            </div>

            {/* Modo de uso */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Modo de uso</h3>
              <p>
                Ingerir 2 cápsulas ao dia, preferencialmente junto a uma das refeições, ou
                conforme orientação de médico ou nutricionista.
              </p>
            </div>

            {/* Advertências */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Advertências</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Não utilizar em caso de alergia a crustáceos ou a qualquer componente da
                  fórmula.
                </li>
                <li>
                  Gestantes, lactantes, crianças &lt;12 anos e portadores de condições médicas devem consultar um profissional de saúde antes do consumo.
                </li>
                <li>
                  Pessoas que usam anticoagulantes devem buscar orientação médica.
                </li>
                <li>
                  Este produto não é um medicamento. Não exceder a recomendação diária.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2">Armazenamento</h3>
            <p className="text-gray-700">
              Conservar em local seco e fresco (15–30 °C), protegido da luz e umidade.
              Manter o frasco bem fechado e fora do alcance de crianças.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-6">
        <div className="container mx-auto px-4 text-sm text-center space-y-2">
          <p>© 2025 Orthovita Suplementos. Todos os direitos reservados.</p>
          <p>*Suplemento alimentar isento de registro conforme RDC 240/2018.</p>
        </div>
      </footer>
    </div>
  );
} 
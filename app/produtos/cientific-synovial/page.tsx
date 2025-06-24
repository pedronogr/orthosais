import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'Cientific Synovial® | Suporte Articular Avançado',
};

export default function CientificSynovialPage() {
  return (
    <>
      <Header />

      <header className="bg-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Cientific Synovial<sup className="align-super text-sm">®</sup>
          </h1>
          <span className="mt-2 text-lg">Suplemento Premium de Suporte Articular</span>
        </div>
      </header>

      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-primary">Produtos</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Cientific Synovial</span>
          </div>
        </div>
      </div>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/cientificsy.png"
                alt="Frasco de Cientific Synovial"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Suporte Articular Avançado
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc ml-5 space-y-3 text-gray-700">
                <li>Glucosamina + Condroitina + MSM + Ácido Hialurônico</li>
                <li>Apoio à manutenção da cartilagem e mobilidade</li>
                <li>Cápsulas concentradas para conforto diário</li>
                <li>Frasco econômico com 60 cápsulas</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/carrinho"
                className="inline-block text-center bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-md transition-all"
              >
                Adicionar ao carrinho
              </Link>
              <a
                href="#informacoes"
                className="inline-block text-center bg-white border border-primary font-medium py-3 px-8 rounded-md transition-all"
              >
                Ver mais informações
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="informacoes" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Detalhes do Produto</h3>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h4 className="text-lg font-semibold mb-2">Composição</h4>
                <p>Cada dose (2 cápsulas) contém:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>1500 mg Sulfato de Glucosamina (vegetal)</li>
                  <li>1200 mg Sulfato de Condroitina</li>
                  <li>500 mg Metilsulfonilmetano (MSM)</li>
                  <li>40 mg Ácido Hialurônico</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Indicações</h4>
                <p>
                  Suplemento alimentar para auxiliar na saúde das articulações,
                  mobilidade e conforto articular em atividades diárias.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Modo de uso</h4>
                <p>
                  Ingerir 2 cápsulas ao dia, preferencialmente após refeições
                  ou conforme orientação de profissional de saúde.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Advertências</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Não usar em caso de alergia a componentes da fórmula.</li>
                  <li>
                    Gestantes, lactantes e menores de 12 anos: consultar médico
                  </li>
                  <li>
                    Pacientes em uso de anticoagulantes: consultar orientação médica.
                  </li>
                  <li>Não exceder a recomendação diária.</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Armazenamento</h4>
            <p className="text-gray-700">
              Conservar em local seco e fresco (15–30 °C), protegido da luz e
              umidade. Manter fora do alcance de crianças.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 
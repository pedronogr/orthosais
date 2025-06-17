import Image from 'next/image';

const testimonials = [
  {
    name: 'Maria O.',
    text: 'Os produtos da Orthosais realmente mudaram minha rotina. Sinto mais disposição e confiança na qualidade!',
    image: '/images/testimonials/maria.jpg',
  },
  {
    name: 'João S.',
    text: 'Atendimento excelente e entrega rápida. Recomendo para todos que buscam saúde e inovação.',
    image: '/images/testimonials/joao.jpg',
  },
  {
    name: 'Ana P.',
    text: 'A confiança nos selos de qualidade e a transparência da Orthosais me conquistaram. Cliente fiel!',
    image: '/images/testimonials/ana.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">O QUE DIZEM NOSSOS CLIENTES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-fade-in"
            >
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-primary shadow">
                <Image src={t.image} alt={t.name} width={80} height={80} className="object-cover" />
              </div>
              <p className="text-gray-700 italic mb-4">“{t.text}”</p>
              <span className="font-bold text-primary">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
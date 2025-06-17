import Image from 'next/image';

const certifications = [
  {
    name: 'ANVISA',
    image: '/images/anvisa.png',
    description: 'Registrado na ANVISA',
    delay: 'delay-0'
  },
  {
    name: 'ISO',
    image: '/images/iso9001.png',
    description: 'ISO 9001',
    delay: 'delay-100'
  },
  {
    name: 'BPF',
    image: '/images/bpf.png',
    description: 'Boas Práticas de Fabricação',
    delay: 'delay-200'
  },
  {
    name: 'Ministério da Saúde',
    image: '/images/ministsaude.png',
    description: 'Ministério da Saúde',
    delay: 'delay-300'
  },
  {
    name: 'ABNT',
    image: '/images/abnt.png',
    description: 'ABNT NBR',
    delay: 'delay-400'
  }
];

export default function CertificationsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">CERTIFICAÇÕES E RECONHECIMENTOS</h2>
          <p className="text-lg text-secondary font-medium">Qualidade e conformidade garantidas</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center animate-fade-in ${cert.delay}`}
            >
              <div className="bg-white p-4 rounded-xl shadow-lg mb-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center h-28 w-40">
                <Image 
                  src={cert.image} 
                  alt={cert.name} 
                  width={120}
                  height={60}
                  className="h-auto max-h-20 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-sm text-gray-600 font-medium text-center">{cert.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Todas as nossas operações e produtos atendem aos mais rigorosos padrões de qualidade e segurança nacionais e internacionais.
          </p>
        </div>
      </div>
    </section>
  );
} 
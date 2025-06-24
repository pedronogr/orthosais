import Image from 'next/image';

interface CertificationsSectionProps {
  title?: string;
  description?: string;
}

export default function CertificationsSection({
  title = "Certificações e Garantias",
  description = "Nossos produtos atendem aos mais rigorosos padrões de qualidade"
}: CertificationsSectionProps) {
  const certifications = [
    {
      name: "Anvisa",
      image: "/images/anvisa.png",
      description: "Registro na Agência Nacional de Vigilância Sanitária"
    },
    {
      name: "BPF",
      image: "/images/bpf.png",
      description: "Boas Práticas de Fabricação"
    },
    {
      name: "ISO 9001",
      image: "/images/iso9001.png",
      description: "Certificação internacional de gestão de qualidade"
    },
    {
      name: "ABNT",
      image: "/images/abnt.png",
      description: "Conformidade com normas técnicas brasileiras"
    },
    {
      name: "Ministério da Saúde",
      image: "/images/ministsaude.png",
      description: "Aprovado pelo Ministério da Saúde"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group flex flex-col items-center"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={cert.image}
                  alt={`Certificação ${cert.name}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-50 p-2 rounded-md text-center mt-2 absolute translate-y-24">
                <p className="text-sm font-medium text-amber-800">{cert.name}</p>
                <p className="text-xs text-amber-700">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-amber-50 px-6 py-4 rounded-lg border border-amber-100">
            <p className="text-amber-800 font-medium">
              Todos os nossos produtos são desenvolvidos seguindo rigorosos padrões de qualidade e segurança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
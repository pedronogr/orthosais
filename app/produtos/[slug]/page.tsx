import { Metadata } from 'next';
import ProductClient from './ProductClient';
import { notFound } from 'next/navigation';

// Interface para o produto que corresponde à interface do ProductClient
interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  oldPrice?: number;
  imageSrc: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  reviews: Array<{
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    rating: number;
    date: string;
    comment: string;
  }>;
  safetyInfo: {
    warnings: string[];
    contraindications: string[];
    sideEffects: string[];
    storage: string;
    shelfLife: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Dados pré-definidos dos produtos (utilizados para build estático)
const defaultProducts: Product[] = [
  {
    slug: "orthovit-complex",
    name: "OrthoVit Complex",
    description: "Suplemento vitamínico com fórmula exclusiva para proteção e fortalecimento do sistema imunológico.",
    longDescription: `O OrthoVit Complex é um suplemento vitamínico desenvolvido com uma fórmula exclusiva que combina vitaminas e minerais essenciais para o fortalecimento do sistema imunológico. Sua composição foi cuidadosamente elaborada para fornecer os nutrientes necessários para manter a saúde em dia.

Principais benefícios:
• Fortalecimento do sistema imunológico
• Apoio à saúde geral
• Fórmula balanceada de vitaminas e minerais
• Alta biodisponibilidade dos nutrientes`,
    price: 39.90,
    oldPrice: 45.90,
    imageSrc: "/images/product1.svg",
    category: "Linha Proteção",
    features: [
      "Fórmula exclusiva",
      "Alta biodisponibilidade",
      "Sem glúten",
      "Sem lactose"
    ],
    specifications: {
      "Composição": "Vitaminas A, C, D, E, B6, B12, Zinco, Selênio",
      "Apresentação": "Frasco com 60 cápsulas",
      "Modo de Usar": "Tomar 1 cápsula ao dia, preferencialmente após a refeição",
      "Registro": "MS 6.1234.1234.001-1"
    },
    reviews: [
      {
        id: 1,
        user: {
          name: "Maria S.",
          avatar: "/images/avatar1.jpg"
        },
        rating: 5,
        date: "15/03/2024",
        comment: "Excelente produto! Comecei a tomar há um mês e já sinto diferença na minha imunidade."
      },
      {
        id: 2,
        user: {
          name: "João P.",
          avatar: "/images/avatar2.jpg"
        },
        rating: 4,
        date: "10/03/2024",
        comment: "Muito bom, mas achei um pouco caro. A qualidade compensa o preço."
      }
    ],
    safetyInfo: {
      warnings: [
        "Mantenha fora do alcance de crianças",
        "Não exceda a dose recomendada",
        "Consulte um médico antes de usar se estiver grávida ou amamentando"
      ],
      contraindications: [
        "Hipersensibilidade a qualquer componente da fórmula",
        "Pacientes com problemas renais graves",
        "Crianças menores de 12 anos"
      ],
      sideEffects: [
        "Em raros casos, pode causar náusea",
        "Pode ocorrer alteração na coloração da urina",
        "Em caso de reações alérgicas, suspenda o uso e consulte um médico"
      ],
      storage: "Manter em local seco e arejado, longe da luz solar direta e temperaturas acima de 30°C.",
      shelfLife: "24 meses a partir da data de fabricação."
    },
    faqs: [
      {
        question: "Quanto tempo leva para ver os resultados?",
        answer: "Os resultados podem variar de pessoa para pessoa, mas geralmente são notados após 2-4 semanas de uso contínuo do produto."
      },
      {
        question: "Posso tomar junto com outros medicamentos?",
        answer: "Recomendamos consultar seu médico antes de usar o OrthoVit Complex em conjunto com outros medicamentos para evitar possíveis interações."
      },
      {
        question: "O produto é adequado para vegetarianos?",
        answer: "Sim, o OrthoVit Complex é adequado para vegetarianos, pois não contém ingredientes de origem animal em sua composição."
      },
      {
        question: "Qual a diferença entre este produto e outros similares?",
        answer: "O OrthoVit Complex se destaca por sua fórmula exclusiva e alta biodisponibilidade dos nutrientes, garantindo melhor absorção pelo organismo."
      },
      {
        question: "Como devo armazenar o produto?",
        answer: "Mantenha o produto em local seco e arejado, longe da luz solar direta e temperaturas acima de 30°C. Após aberto, mantenha a tampa bem fechada."
      }
    ]
  },
  // Adicione mais produtos conforme necessário
];

// Server Component
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = defaultProducts.find((p) => p.slug === params.slug);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = defaultProducts.find((p) => p.slug === params.slug);
  return {
    title: product ? `${product.name} - Orthosais` : 'Produto - Orthosais',
    description: product?.description || 'Detalhes do produto',
  };
}

export function generateStaticParams() {
  return defaultProducts.map((p) => ({ slug: p.slug }));
} 
export default function SchemaOrg() {
  // Schema para a organização (Orthosais Farma)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Orthosais Farma",
    "url": "https://www.orthosais.com.br",
    "logo": "https://www.orthosais.com.br/images/logo.png",
    "description": "Empresa brasileira dedicada ao desenvolvimento de produtos farmacêuticos de extrema qualidade, focados na proteção à vida.",
    "foundingDate": "2010",
    "founders": [
      {
        "@type": "Person",
        "name": "Dr. Carlos Mendes"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Exemplo, 1234",
      "addressLocality": "Fortaleza",
      "addressRegion": "CE",
      "postalCode": "60000-000",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-85-9967-3300",
      "contactType": "customer service",
      "email": "contato@orthosais.com.br",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.instagram.com/orthosais/",
      "https://www.facebook.com/orthosais",
      "https://www.linkedin.com/company/orthosais"
    ]
  };

  // Schema para os produtos farmacêuticos
  const productLineSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Linha Proteção",
          "description": "Produtos focados na prevenção e proteção da saúde.",
          "url": "https://www.orthosais.com.br/produtos/linha-protecao"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Linha Vida",
          "description": "Produtos essenciais para a manutenção da qualidade de vida.",
          "url": "https://www.orthosais.com.br/produtos/linha-vida"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Linha Saúde",
          "description": "Produtos para o cuidado da saúde diária.",
          "url": "https://www.orthosais.com.br/produtos/linha-saude"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "Linha Especializada",
          "description": "Produtos de alta complexidade para necessidades específicas de saúde.",
          "url": "https://www.orthosais.com.br/produtos/linha-especializada"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLineSchema) }}
      />
    </>
  );
} 
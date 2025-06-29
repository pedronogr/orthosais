/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pt.farmagranada.com',
      'i.imgur.com',
      'lapon.com.br',
      // outros domínios que você quiser permitir
    ],
    unoptimized: true, // Necessário para exportação estática
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros do TypeScript durante o build
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json',
  },
  // Configurações de cache para melhorar a velocidade do build
  distDir: '.next',
  // Configurações para cache durante o build (compatível com Netlify)
  generateBuildId: async () => {
    // Usa o timestamp como build ID para melhorar o cache
    return `build-${Date.now()}`;
  },
  // Configurações para melhorar a compilação e reduzir o impacto de erros
  onDemandEntries: {
    // Mantém as páginas em memória por mais tempo (em ms, padrão é 15000)
    maxInactiveAge: 60 * 1000,
    // Número de páginas que devem ser mantidas em memória (padrão é 5)
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
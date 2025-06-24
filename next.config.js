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
  swcMinify: true, // Utiliza SWC para minificação (mais rápido)
};

module.exports = nextConfig;
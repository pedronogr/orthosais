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
  experimental: {
    // Configurações experimentais para melhorar o build
    turbotrace: {
      logLevel: 'error',
    },
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/darwin-x64',
      ],
    }
  }
};

module.exports = nextConfig;
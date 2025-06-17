/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
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
    ignoreBuildErrors: true,
  },
}
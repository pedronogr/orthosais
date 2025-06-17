/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build tradicional para suportar rotas dinâmicas do admin em ambiente Netlify Functions
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
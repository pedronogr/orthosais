import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignorar erros de ESLint durante a build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

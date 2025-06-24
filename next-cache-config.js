// Configuração de cache para o Next.js no ambiente Netlify
// Este arquivo é carregado pelo plugin @netlify/plugin-nextjs

console.log('Configurando cache para o Next.js...');

module.exports = {
  // Configurações para o plugin @netlify/plugin-nextjs
  cache: {
    enabled: true,
    // Arquivos e diretórios a serem armazenados em cache
    paths: [
      '.next/cache',
      'node_modules/.cache'
    ]
  }
};

console.log('Configuração de cache carregada!'); 
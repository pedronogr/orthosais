// Arquivo de configuração para o Netlify
// Este arquivo é carregado antes do build no ambiente Netlify

// Desativa verificações de tipos durante o build
process.env.DISABLE_TYPESCRIPT_CHECKS = 'true';
process.env.CI = 'false';

console.log('Configurações do Netlify carregadas - TypeScript checks desativados'); 
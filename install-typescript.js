// Script para instalação explícita do TypeScript e tipagens
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('💪 Iniciando instalação explícita do TypeScript...');

try {
  // Verificar ambiente
  console.log('Ambiente:');
  console.log(`- Node.js: ${process.version}`);
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`- NPM: ${npmVersion}`);

  // Instalar TypeScript e tipagens como dependências globais e locais
  console.log('\n📦 Instalando TypeScript e tipagens...');
  
  // Tentar instalação global (pode falhar em alguns ambientes)
  try {
    console.log('Tentando instalação global:');
    execSync('npm install -g typescript@5.0.4', { stdio: 'inherit' });
    console.log('✅ TypeScript instalado globalmente!');
  } catch (err) {
    console.log('⚠️ Instalação global falhou, mas isso pode ser ignorado');
  }
  
  // Instalação local como dependência de desenvolvimento
  console.log('\nInstalando dependências no projeto:');
  execSync('npm install --save-dev typescript@5.0.4 @types/react@18.0.38 @types/react-dom@18.0.11', { stdio: 'inherit' });
  
  // Verificar instalação
  console.log('\n🔍 Verificando instalação:');
  
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const typescriptPath = path.join(nodeModulesPath, 'typescript');
  const reactTypesPath = path.join(nodeModulesPath, '@types', 'react');
  const reactDomTypesPath = path.join(nodeModulesPath, '@types', 'react-dom');
  
  if (fs.existsSync(typescriptPath)) {
    console.log('✅ TypeScript instalado em node_modules!');
  } else {
    console.log('❌ TypeScript NÃO encontrado em node_modules!');
  }
  
  if (fs.existsSync(reactTypesPath)) {
    console.log('✅ @types/react instalado em node_modules!');
  } else {
    console.log('❌ @types/react NÃO encontrado em node_modules!');
  }
  
  if (fs.existsSync(reactDomTypesPath)) {
    console.log('✅ @types/react-dom instalado em node_modules!');
  } else {
    console.log('❌ @types/react-dom NÃO encontrado em node_modules!');
  }

  // Listar versões
  try {
    const tscVersion = execSync('npx tsc --version').toString().trim();
    console.log(`\nVersão do TypeScript: ${tscVersion}`);
  } catch (err) {
    console.log('\n⚠️ Não foi possível verificar a versão do TypeScript');
  }
  
  console.log('\n✅ Script de instalação concluído!');
} catch (error) {
  console.error('❌ Erro durante a instalação:', error);
} 
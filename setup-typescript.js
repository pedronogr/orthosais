// Script para configuração correta do TypeScript no ambiente Netlify

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Iniciando configuração do TypeScript para Netlify...');

try {
  // Verificar versão do Node e NPM
  console.log('📊 Ambiente de execução:');
  console.log(`Node.js: ${process.version}`);
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`NPM: ${npmVersion}`);

  // Garantir que as dependências TypeScript estejam no package.json
  console.log('📦 Verificando package.json...');
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = require(packageJsonPath);
  
  // Verificar e atualizar dependências
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.devDependencies.typescript = packageJson.devDependencies.typescript || "5.0.4";
  packageJson.devDependencies["@types/react"] = packageJson.devDependencies["@types/react"] || "18.0.38";
  packageJson.devDependencies["@types/react-dom"] = packageJson.devDependencies["@types/react-dom"] || "18.0.11";
  
  // Salvar package.json atualizado
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json atualizado com sucesso!');
  
  // Instalar dependências TypeScript localmente sem mexer no package.json
  console.log('📦 Instalando dependências TypeScript localmente...');
  execSync('npm install --no-save typescript@5.0.4 @types/react@18.0.38 @types/react-dom@18.0.11', { stdio: 'inherit' });
  
  // Verificar se os módulos foram instalados
  const typescriptPath = path.join(__dirname, 'node_modules', 'typescript');
  if (fs.existsSync(typescriptPath)) {
    console.log('✅ TypeScript instalado com sucesso em node_modules!');
  } else {
    console.log('⚠️ TypeScript não encontrado em node_modules. Criando link simbólico global...');
    execSync('npm link typescript', { stdio: 'inherit' });
  }
  
  // Criar ou verificar tsconfig.json básico
  console.log('🛠️ Verificando tsconfig.json...');
  const tsConfigPath = path.join(__dirname, 'tsconfig.json');
  if (!fs.existsSync(tsConfigPath)) {
    console.log('⚠️ tsconfig.json não encontrado. Criando arquivo básico...');
    execSync('npx tsc --init --jsx react', { stdio: 'inherit' });
  } else {
    console.log('✅ tsconfig.json já existe.');
  }
  
  // Criar next-env.d.ts se não existir
  console.log('🛠️ Verificando next-env.d.ts...');
  const nextEnvPath = path.join(__dirname, 'next-env.d.ts');
  if (!fs.existsSync(nextEnvPath)) {
    console.log('⚠️ next-env.d.ts não encontrado. Criando arquivo...');
    const nextEnvContent = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.`;
    fs.writeFileSync(nextEnvPath, nextEnvContent);
    console.log('✅ next-env.d.ts criado com sucesso!');
  } else {
    console.log('✅ next-env.d.ts já existe.');
  }
  
  console.log('✅ Configuração do TypeScript concluída com sucesso!');

} catch (error) {
  console.error('❌ Erro durante a configuração do TypeScript:', error);
  console.log('⚠️ Continuando o build apesar do erro...');
  // Não encerrar o processo com erro
} 
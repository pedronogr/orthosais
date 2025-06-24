// Script para configuração correta do TypeScript no ambiente Netlify

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando setup do TypeScript...');

// Verificando se o arquivo existe
const tsConfigPath = path.join(__dirname, 'tsconfig.json');
if (!fs.existsSync(tsConfigPath)) {
  console.log('❌ tsconfig.json não encontrado. Criando arquivo básico...');
  const basicTsConfig = {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext", 
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  };
  fs.writeFileSync(tsConfigPath, JSON.stringify(basicTsConfig, null, 2));
  console.log('✅ tsconfig.json criado com sucesso.');
}

// Garantir que as dependências TypeScript estejam instaladas globalmente e localmente
console.log('📦 Instalando dependências do TypeScript...');

try {
  console.log('Instalando typescript globalmente...');
  execSync('npm install -g typescript@5.8.3 --force', { stdio: 'inherit' });
  
  console.log('Instalando dependências TypeScript no projeto...');
  execSync('npm install --save-dev --force typescript@5.8.3 @types/react@18.2.0 @types/react-dom@18.2.0', { stdio: 'inherit' });
  
  // Verificar se os módulos foram instalados corretamente
  console.log('Verificando se os módulos foram instalados corretamente...');
  
  const nodeModulesPath = path.join(__dirname, 'node_modules', 'typescript');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('❌ TypeScript não encontrado em node_modules. Tentando novamente com npm ci...');
    execSync('npm ci', { stdio: 'inherit' });
  }
  
  console.log('✅ Dependências TypeScript instaladas com sucesso.');
} catch (error) {
  console.error('❌ Erro ao instalar dependências TypeScript:', error);
  // Não sair com código de erro, tentar continuar o build mesmo assim
  console.log('⚠️ Continuando o build apesar do erro...');
}

// Verificar versões instaladas
try {
  const tscVersion = execSync('npx tsc --version').toString().trim();
  console.log(`✅ TypeScript versão: ${tscVersion}`);
  
  const packageJson = require('./package.json');
  console.log('✅ Dependências no package.json:');
  console.log(`- typescript: ${packageJson.devDependencies.typescript}`);
  console.log(`- @types/react: ${packageJson.devDependencies['@types/react']}`);
  console.log(`- @types/react-dom: ${packageJson.devDependencies['@types/react-dom']}`);
} catch (error) {
  console.warn('⚠️ Não foi possível verificar todas as versões:', error.message);
}

console.log('✅ Configuração do TypeScript concluída!'); 
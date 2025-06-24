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
  execSync('npm install -g typescript', { stdio: 'inherit' });
  
  console.log('Instalando dependências TypeScript no projeto...');
  execSync('npm install --save-dev typescript@latest @types/react@latest @types/react-dom@latest', { stdio: 'inherit' });
  
  console.log('✅ Dependências TypeScript instaladas com sucesso.');
} catch (error) {
  console.error('❌ Erro ao instalar dependências TypeScript:', error);
  process.exit(1);
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
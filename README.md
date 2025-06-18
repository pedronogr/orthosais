# Orthosais - E-commerce de Produtos Ortopédicos

Este é um projeto de e-commerce para produtos ortopédicos desenvolvido com Next.js, React e Tailwind CSS.

## Funcionalidades

- Catálogo de produtos
- Carrinho de compras
- Sistema de autenticação
- Painel administrativo
- Checkout e pagamento
- Gerenciamento de usuários
- Análise de dados

## Configuração do Sistema de Autenticação

O projeto suporta dois modos de autenticação:

### 1. Autenticação Local (localStorage)

Por padrão, o sistema usa o armazenamento local do navegador (localStorage) para salvar dados de usuários registrados. Isso é útil para desenvolvimento e demonstração, mas não é recomendado para produção.

Usuários padrão para teste:
- Admin: pedro@admin.com / admin123
- Cliente: cliente@teste.com / cliente123

### 2. Autenticação Online com Supabase (Recomendado para Produção)

Para habilitar a autenticação persistente online no Netlify usando Supabase:

1. Crie uma conta no [Supabase](https://supabase.io/)
2. Crie um novo projeto
3. Configure uma tabela `users` com os campos:
   - id (uuid, primary key)
   - name (text)
   - email (text, unique)
   - created_at (timestamp)

4. No painel do Netlify, vá para "Site settings" > "Environment variables" e adicione:
   ```
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_SERVICE_KEY=sua_chave_de_serviço_do_supabase
   ```

5. Faça o deploy do site novamente para aplicar as alterações

Isso permitirá que os usuários registrados persistam entre sessões e dispositivos, com os dados armazenados de forma segura no Supabase.

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Deploy no Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/seu-usuario/orthosais)

Após o deploy, configure as variáveis de ambiente conforme descrito acima para habilitar a autenticação online.

## Tecnologias Utilizadas

- Next.js
- React
- Tailwind CSS
- Netlify Functions
- Supabase (opcional, para autenticação online)

## Integração com a API Arkama

Este projeto utiliza a API Arkama para processamento de pedidos. A integração inclui:

1. **Criar compra**
   - Endpoint: `POST https://app.arkama.com.br/api/v1/orders`
   - Uso: Cria uma nova ordem de compra, definindo valor, forma de pagamento, etc.
   - Autenticação: Via header `Authorization: Bearer API_TOKEN`

2. **Buscar compra**
   - Endpoint: `GET https://app.arkama.com.br/api/v1/orders/{id}`
   - Uso: Obtém detalhes de uma compra específica pelo ID

3. **Estornar (reembolsar) compra**
   - Endpoint: `POST https://app.arkama.com.br/api/v1/orders/{id}/refund`
   - Uso: Inicia um reembolso para uma ordem já criada
   - Autenticação: Também usa token Bearer

Para configurar a integração, certifique-se de adicionar seu token da API Arkama no arquivo `.env.local`.

## Gerando Build Estático

Para gerar uma versão estática do site para produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `out/`.

## Saiba Mais

Para saber mais sobre o Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - saiba mais sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

## Deploy

A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

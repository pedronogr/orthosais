# Orthosais Farma

Este é um projeto de e-commerce para produtos farmacêuticos desenvolvido com [Next.js](https://nextjs.org).

## Começando

Primeiro, instale as dependências:

```bash
npm install
```

Em seguida, crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# API Arkama
NEXT_PUBLIC_ARKAMA_API_TOKEN=seu_token_aqui

# Outras variáveis de ambiente
NEXT_PUBLIC_SITE_URL=https://orthosais.com.br
```

Depois, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

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

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Axios para requisições HTTP
- API Arkama para processamento de pedidos

## Saiba Mais

Para saber mais sobre o Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - saiba mais sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

## Deploy

A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

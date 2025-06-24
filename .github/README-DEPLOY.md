# Configuração do Deploy Automático para Netlify

Este projeto está configurado para fazer deploy automático no Netlify sempre que houver um push para a branch main.

## Passos para configurar os segredos no GitHub

Para que o deploy automático funcione corretamente, você precisa configurar os seguintes segredos nas configurações do seu repositório GitHub:

1. Acesse seu repositório no GitHub
2. Vá para Settings > Secrets and variables > Actions
3. Clique em "New repository secret"
4. Adicione os seguintes segredos:

### NETLIFY_AUTH_TOKEN
1. Acesse https://app.netlify.com/user/applications
2. Na seção "Personal access tokens", clique em "New access token"
3. Dê um nome para o token (ex: "GitHub Actions")
4. Copie o token gerado e cole como valor do segredo NETLIFY_AUTH_TOKEN no GitHub

### NETLIFY_SITE_ID
1. Acesse o painel do seu site no Netlify
2. Vá para Site settings > General > Site details
3. Copie o valor de "Site ID" e cole como valor do segredo NETLIFY_SITE_ID no GitHub

## Verificando o status do deploy

Após configurar os segredos, qualquer push para a branch main ou pull request será automaticamente implantado no Netlify. Você pode verificar o status do deploy:

1. Na aba "Actions" do seu repositório GitHub
2. No painel do Netlify em https://app.netlify.com/ 
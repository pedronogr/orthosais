// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Mostrar informações de ambiente para debugging
console.log('Variáveis de ambiente carregadas:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MongoDB configurado:', !!process.env.MONGODB_URI);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Servidor pronto na porta ${port}`);
  });
}); 
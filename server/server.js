import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração do __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.e
nv.PORT || 8080;

// Configurações de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173'
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../src')));

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

// Rota fallback para SPA
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => {
  console.log(`
  🚀 Servidor backend rodando: http://localhost:${PORT}
  ✅ Frontend disponível em: http://localhost:5173
  `);
});
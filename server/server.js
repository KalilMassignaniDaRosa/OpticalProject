import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuracao do __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuracoes de seguranca
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173'
}));

// Arquivos
app.use(express.static(path.join(__dirname, '../src')));

// Rota fallback para SPA
// Retorna o index.html para qualquer rota nao /api, permitindo o roteamento client-side
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => {
  console.log(`
  🟢 [Backend] Server running at: http://localhost:${PORT}
  🔴 [Frontend] Available at: http://localhost:5173
  `);
});
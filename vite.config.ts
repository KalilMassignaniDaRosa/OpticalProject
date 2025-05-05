import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carrega variáveis da raiz do projeto (onde está o .env)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: './src',
    envDir: process.cwd(), // Aponta para a raiz do projeto
    server: {
      host: true,
      port: 5173,
      open: true,
      strictPort: true,
    },
    // Não é necessário definir manualmente as variáveis VITE_
  };
});
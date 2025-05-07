import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carrega variáveis da raiz do projeto (onde esta o .env)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: './src',
    envDir: process.cwd(), // Raiz do projeto
    server: {
      host: true,
      port: 5173,
      open: true,
      strictPort: true,
    },
  };
});
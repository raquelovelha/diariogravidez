import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Importação do Tailwind 4
import path from 'path';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente (.env)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      tailwindcss(), // Plugin do Tailwind 4 adicionado aqui
    ],
    resolve: {
      alias: {
        // Isso permite que você use '@/' para se referir à pasta raiz
        '@': path.resolve(__dirname, './src'),
      },
    },

  };
});
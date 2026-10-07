import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: { outDir: 'dist', chunkSizeWarningLimit: 2000, target: 'es2020' },
  server: { port: 5173, host: '127.0.0.1' },
});

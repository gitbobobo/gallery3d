import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three/addons/controls/OrbitControls.js'],
        },
      },
    },
  },
});

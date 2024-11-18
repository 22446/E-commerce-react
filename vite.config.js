import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust chunk size limit (default is 500 KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group vendor libraries into their own chunk
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias for cleaner imports
    },
  },
});

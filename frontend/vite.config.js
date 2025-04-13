import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'mongoose',
        /^\.\.\/backend/, // Block relative paths like "../backend"
        /^\/backend/, // Block absolute paths (common in Vercel)
      ],
    },
  },
  server: {
    fs: {
      deny: ['../backend'], // Block dev server access
    },
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Exclude backend files from being processed by Vite
    rollupOptions: {
      external: ['mongoose'],
      input: {
        main: './index.html' // Explicit entry point for the frontend
      },
    },
  },
  // Optional: Exclude backend paths from Vite's file resolver
  server: {
    fs: {
      strict: true,
      deny: ['../backend'], // Block access to backend files
    },
  },
});
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // CHANGE: Use a relative base path
  base: './', 
  plugins: [react()],
});
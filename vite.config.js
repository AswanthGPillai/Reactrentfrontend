// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // CRITICAL: Sets the base path for assets to your repository name.
  base: '/Reactrentfrontend/', 
  plugins: [react()],
});
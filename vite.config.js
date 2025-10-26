// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig({
  // Set the base path for deployment to a subfolder (like GitHub Pages)
  base: "/your-repo-name", // Replace 'your-repo-name' with your actual repository name
  plugins: [react()],
});
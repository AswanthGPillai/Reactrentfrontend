// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace <REPOSITORY-NAME> with the actual name of your GitHub repository.
// For example, if your repo is github.com/username/my-rente-app, use '/my-rente-app/'
const REPO_NAME = '/<REPOSITORY-NAME>/'; 

export default defineConfig({
  // Set the base path for deployment to a subfolder (like GitHub Pages)
  base: REPO_NAME, 
  plugins: [react()],
});
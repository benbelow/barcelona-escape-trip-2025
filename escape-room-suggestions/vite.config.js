import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is the name of the repo in GitHub 
  base: '/barcelona-escape-trip-2025/',
});
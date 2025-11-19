import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // KRITIS: Mengatur base path ke '/' untuk deployment di Netlify/Vercel
  // yang menggunakan root domain. Ini memperbaiki error 404 pada aset.
  base: '/', 
  // Opsi build: 
  build: {
    // Netlify akan mencari file hasil build di direktori 'build'
    outDir: 'build', 
    sourcemap: false, 
  }
});

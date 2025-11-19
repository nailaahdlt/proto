import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // KRITIS: Mengatur base path ke nama repository Anda (/proto/).
  // Ini memastikan aset (CSS/JS) dimuat dari path yang benar di GitHub Pages.
  base: '/proto/', 
  // Opsi build: Disarankan untuk membersihkan cache lokal dan menyamakan output directory.
  build: {
    outDir: 'build', 
    sourcemap: false, 
  }
});

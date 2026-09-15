import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const WP_URL = process.env.VITE_WP_URL || 'https://thinkable.app';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      // Contact Form 7 submissions go to the live WordPress in dev (avoids CORS).
      '/wp-json': { target: WP_URL, changeOrigin: true, secure: true },
    },
  },
});

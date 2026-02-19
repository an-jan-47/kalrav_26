import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'gsap'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      '/cdn/image': {
        target: 'https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn\/image/, ''),
      },
    },
  },
  plugins: [react()],
})

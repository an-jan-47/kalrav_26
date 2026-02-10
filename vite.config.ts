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
  plugins: [react()],
})

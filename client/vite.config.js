// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Your backend URL
        changeOrigin: true,
        secure: false,
        // Remove /api prefix when forwarding to backend
        // rewrite: (path) => path.replace(/^\/api/, '/api') // Keep as is
      }
    }
  }
})
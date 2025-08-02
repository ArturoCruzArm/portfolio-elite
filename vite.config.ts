import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-elite/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'three-addons': ['@react-three/fiber', '@react-three/drei'],
          'framer': ['framer-motion'],
          'lucide': ['lucide-react'],
          'vendor': ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
})

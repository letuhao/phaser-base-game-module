import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
      external: (id) => {
        // Exclude test files and Jest dependencies from build
        return id.includes('.test.') || 
               id.includes('.spec.') || 
               id.includes('/test/') || 
               id.includes('/tests/') || 
               id.includes('/integration/') ||
               id.startsWith('@jest/') ||
               id === 'jest';
      },
    },
  },
  optimizeDeps: {
    include: ['phaser'],
  },
})

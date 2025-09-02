import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, './demo/src'),
    },
  },
  server: {
    port: 3001,
    host: true,
    open: true,
  },
  build: {
    target: 'es2015',
    outDir: 'dist-demo',
    assetsDir: 'assets',
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html'),
      },
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('phaser')) {
              return 'vendor-phaser';
            }
            return 'vendor';
          }
          
          // Demo code only
          if (id.includes('/demo/')) {
            return 'demo';
          }
          
          // Exclude all other src files to avoid TypeScript errors
          return 'common';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['phaser'],
  },
})

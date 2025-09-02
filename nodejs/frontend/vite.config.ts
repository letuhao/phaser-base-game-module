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
    chunkSizeWarningLimit: 2000, // Increase to 2MB to accommodate Phaser
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
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
          
          // Core system
          if (id.includes('/src/core/')) {
            return 'core';
          }
          
          // Game object system
          if (id.includes('/src/game-object/')) {
            return 'game-object';
          }
          
          // Unit system
          if (id.includes('/src/unit/')) {
            return 'unit';
          }
          
          // Layout system
          if (id.includes('/src/layout/')) {
            return 'layout';
          }
          
          // Scene system
          if (id.includes('/src/scene/')) {
            return 'scene';
          }
          
          // Asset system
          if (id.includes('/src/asset/')) {
            return 'asset';
          }
          
          // Object system
          if (id.includes('/src/object/')) {
            return 'object';
          }
          
          // Factory system
          if (id.includes('/src/factory/')) {
            return 'factory';
          }
          
          // Abstract system
          if (id.includes('/src/abstract/')) {
            return 'abstract';
          }
          
          // Runtime system
          if (id.includes('/src/runtime/')) {
            return 'runtime';
          }
          
          // Integration system
          if (id.includes('/src/integration/')) {
            return 'integration';
          }
          
          // Examples
          if (id.includes('/src/examples/')) {
            return 'examples';
          }
          
          // Main application code
          if (id.includes('/src/main.ts') || id.includes('/src/game/')) {
            return 'app';
          }
          
          // Default chunk for other files
          return 'common';
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true,
            absoluteRuntime: false,
            version: '^7.24.0'
          }]
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['regenerator-runtime']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'react-hot-toast'],
          auth: ['@supabase/supabase-js', '@supabase/auth-ui-react'],
          charts: ['chart.js', 'react-chartjs-2'],
          utils: ['date-fns', 'uuid', 'zxcvbn']
        }
      }
    }
  }
});
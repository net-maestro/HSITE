// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // Vuetify плагін для оптимізації роботи з компонентами
    Vuetify(),
    // Автоматичне підключення компонентів
    Components({
      dirs: ['src/components'], // Опціонально: вказати специфічні папки для автоматичного імпорту компонентів
    }),
    // Підключення шрифтів Google
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      strict: true, // Забезпечує більш надійне управління файловою системою
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Якщо файли містять node_modules, вони будуть зібрані в окремий чанк
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 800, // Можна підвищити межу попередження про великі чанки
  },
})

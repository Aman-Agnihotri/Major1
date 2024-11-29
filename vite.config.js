import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'StreamManage',
        short_name: 'StreamManage',
        description: 'Effortless Subscription Management, All in One Place',
        start_url: '/',
        display: 'standalone',
        background_color: '#0e0c16',
        theme_color: '#FFD700',
        icons: [
          {
            src: '/logo.avif',
            sizes: '192x192',
            type: 'image/avif'
          },
          {
            src: '/logo.avif',
            sizes: '512x512',
            type: 'image/avif'
          }
        ]
      }
    }),
  ],
  server: {
    mimeTypes: {
      'text/html': ['html'],
      'js': 'application/javascript',
    },
  }
})
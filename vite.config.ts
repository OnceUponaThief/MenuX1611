import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy Dicebear API to avoid browser ORB/CORS issues by serving via same-origin
      "/dicebear": {
        target: "https://api.dicebear.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dicebear/, ""),
      },
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'QR Menu App',
        short_name: 'QRMenu',
        description: 'Modern digital menu system for bars and restaurants',
        theme_color: '#00f0ff',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'public/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ],
        start_url: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
        ],
      },
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
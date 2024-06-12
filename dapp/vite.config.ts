import react from "@vitejs/plugin-react-swc"
import {
  fileURLToPath,
  URL,
} from "url"
import { VitePWA } from "vite-plugin-pwa"

import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [ "**/*.{js,css,html,ico,png,svg}" ],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Japan Pay",
        short_name: "Japan Pay",
        description: "go to payment app in Japan",
        theme_color: "#e2d9ca",
        scope: "/",
        start_url: "/",
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png",
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      crypto: "empty-module",
      assert: "empty-module",
      http: "empty-module",
      https: "empty-module",
      os: "empty-module",
      url: "empty-module",
      zlib: "empty-module",
      stream: "empty-module",
      _stream_duplex: "empty-module",
      _stream_passthrough: "empty-module",
      _stream_readable: "empty-module",
      _stream_writable: "empty-module",
      _stream_transform: "empty-module",
    },
  },
  define: {
    global: "globalThis",
  },
})

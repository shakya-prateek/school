import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  nitro: false, // Disable the built-in Nitro config which forces 'dist'
  plugins: [
    nitro({
      preset: "vercel",
    }),
  ],
  tanstackStart: {
    nitro: true,
    server: {
      entry: "server",
    },
    serverFns: {
      disableCsrfMiddlewareWarning: true,
    },
  },
});
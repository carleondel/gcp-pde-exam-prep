import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const page = (path) => resolve(import.meta.dirname, path);

// Multi-page build: the static landing and legal pages at the root, the
// React app under /app/.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        landing: page("index.html"),
        app: page("app/index.html"),
        privacy: page("privacy/index.html"),
        terms: page("terms/index.html"),
      },
    },
  },
});

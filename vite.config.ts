import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages publica em /engenharia-civil-raiox-comandante/
// Em dev continua "/", em produção usa a subpasta correta.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/engenharia-civil-raiox-comandante/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist"
  }
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@layout": "/src/layout",
      "@store": "/src/store",
    },
  },
});

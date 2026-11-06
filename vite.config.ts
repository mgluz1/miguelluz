import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Duas páginas: o portfólio (/) e o currículo (/curriculo/)
    rollupOptions: {
      input: {
        main: "index.html",
        curriculo: "curriculo/index.html",
      },
    },
  },
});

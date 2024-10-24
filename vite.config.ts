import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // exclude data subdirectories
  // target modern browsers
  build: {
    target: "esnext",
  },
});

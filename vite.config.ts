import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 2222, // Bisa sesuaikan port jika perlu
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
  },
} as UserConfig);

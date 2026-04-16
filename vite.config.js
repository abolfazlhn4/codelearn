import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // دقت کنید: این برای نسخه 4 ضروری است

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

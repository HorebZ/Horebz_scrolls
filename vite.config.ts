import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [fresh(), tailwindcss()],
  ssr: {
    // Exclude problematic packages from SSR bundling
    // @denosaurs/emoji has a JSON file with escape characters that Rollup can't parse
    external: ["@denosaurs/emoji"],
  },
});

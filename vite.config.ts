import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import json from "@rollup/plugin-json";

export default defineConfig({
  // @ts-ignore json plugin is not typed
  plugins: [fresh(), tailwindcss(), json()],
});

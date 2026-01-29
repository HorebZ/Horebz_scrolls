import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import json from "@rollup/plugin-json";

export default defineConfig({
  plugins: [
    // @ts-ignore: @rollup/plugin-json types are not fully compatible with Deno yet
    json({ include: "**/*.json" }),
    fresh(),
    tailwindcss(),
  ],
});

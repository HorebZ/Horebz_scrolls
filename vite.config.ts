import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Corrige les URLs des scripts des islands en dev : le plugin Fresh peut
 * renvoyer "fresh-island::Nom.tsx" au lieu de "/@id/fresh-island::Nom.tsx",
 * ce qui provoque une erreur CORS.
 * Ce plugin réécrit ces URLs dans le snapshot serveur.
 */
function freshIslandUrlFix() {
  return {
    name: "fresh-island-url-fix",
    enforce: "post" as const,
    transform(code: string, id: string) {
      if (!id.includes("fresh:server-snapshot")) {
        return null;
      }

      const fixed = code.replace(
        /(browser\s*:\s*["'])fresh-island::/g,
        "$1/@id/fresh-island::",
      );
      return fixed !== code ? { code: fixed, map: null } : null;
    },
  };
}

export default defineConfig({
  plugins: [fresh(), freshIslandUrlFix(), tailwindcss()],
});

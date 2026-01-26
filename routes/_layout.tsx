import { define } from "../utils.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default define.layout(function Layout({ Component }) {
  return (
    <div class="flex flex-col min-h-screen">
      <header class="border-b border-border py-4 bg-surface transition-colors duration-300">
        <div class="max-w-3xl mx-auto px-4 flex justify-between items-center">
          <a href="/" class="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Horeb'z Scrolls"
              class="w-10 h-10 rounded-full"
            />
            <span class="text-xl font-bold text-text-primary">
              Horeb'z Scrolls
            </span>
          </a>

          <nav class="flex items-center gap-6">
            <div class="flex items-center gap-4">
              <a
                href="/"
                class="text-text-secondary hover:text-accent transition-colors"
              >
                Accueil
              </a>
              <a
                href="https://github.com/HorebZ"
                class="text-text-secondary hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main class="bg-background min-h-screen transition-colors duration-300">
        <div class="max-w-3xl mx-auto px-4 py-8">
          <Component />
        </div>
      </main>
    </div>
  );
});

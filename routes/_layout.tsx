import { define } from "../utils.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default define.layout(function Layout({ Component }) {
  return (
    <div class="flex flex-col min-h-screen">
      <header class="border-b border-border py-4 bg-surface transition-colors duration-300">
        <div class="max-w-3xl mx-auto px-4 flex justify-between md:items-center">
          <a href="/" class="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Horeb'z Scrolls"
              class="w-10 h-10 rounded-full"
            />
            <span class="hidden sm:inline text-xl font-bold text-text-primary">
              Horeb'z Scrolls
            </span>
          </a>

          <nav class="flex items-center gap-6">
            <div class="flex items-center gap-4">
              <a
                href="/faq"
                class="text-text-primary hover:text-link-hover transition-colors"
              >
                FAQ
              </a>
              <a
                href="/404"
                class="text-text-primary hover:text-link-hover transition-colors"
              >
                404
              </a>
              <a
                href="https://github.com/HorebZ"
                class="text-text-primary hover:text-link-hover transition-colors"
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

      <main class="bg-background flex-1 flex flex-col transition-colors duration-300">
        <div class="max-w-3xl mx-auto px-8">
          <Component />
        </div>
      </main>
    </div>
  );
});

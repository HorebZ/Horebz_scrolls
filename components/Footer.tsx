import { Copyright } from "./copyright.tsx";

export function Footer() {
  return (
    <footer class="w-full mt-auto">
      <div class="max-w-3xl mt-12 mx-auto text-center">
        <div class="flex flex-row pb-4 justify-between border-b border-border">
          <Copyright />

          <div class="space-x-4 font-display text-sm text-text-secondary flex items-end">
            <a href="/404">404</a>
            <a href="/rss.xml" target="_blank">
              RSS
            </a>
            <a
              href="https://github.com/HorebZ/Horebz_scrolls"
              target="_blank"
            >
              Repo GitHub
            </a>
          </div>
        </div>

        <div class="py-4">
          <span class="font-display text-sm text-text-secondary">
            Crafté avec soin dans une humble forge de la Terre du Milieu ©{" "}
            {new Date().getFullYear()} HorebZ
          </span>
        </div>
      </div>
    </footer>
  );
}

import { Copyright } from "./copyright.tsx";

export function Footer() {
  return (
    <footer class="w-full">
      <div class="max-w-3xl mx-auto text-center">
        <div class="mt-12 flex sm:flex-row flex-col sm:items-end justify-between h-full py-4 border-b border-border">
          <Copyright />
          <div class="space-x-8 font-display text-sm text-text-secondary">
            <a href="/rss.xml" target="_blank">
              RSS
            </a>
            {
              /* <a
              href="/is-one-thousand-nine-hundred-and-ninety-nine"
            >
              1999
            </a> */
            }
            <a
              href="https://github.com/HorebZ/Horebz_scrolls"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>

        <div class="pt-4">
          <span class="font-display text-sm text-text-secondary">
            Crafté avec soin dans une humble forge de la Terre du Milieu ©{" "}
            {new Date().getFullYear()} HorebZ
          </span>
        </div>
      </div>
    </footer>
  );
}

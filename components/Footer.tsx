import { Copyright } from "./copyright.tsx";

export function Footer() {
  return (
    <footer class="w-full">
      {/* //divder au centre entre les deux items */}
      <div class="max-w-3xl mt-12 mx-auto text-center divide-y divide-border space-y-4">
        <div class="flex flex-row pb-4 justify-between h-full">
          <Copyright />

          {/* alligné le texte en bas */}
          <div class="space-x-4 font-display text-sm text-text-secondary flex items-end">
            <a href="/404">404</a>
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
              Repo GitHub
            </a>
          </div>
        </div>

        <div class="pb-4">
          <span class="font-display text-sm text-text-secondary">
            Crafté avec soin dans une humble forge de la Terre du Milieu ©{" "}
            {new Date().getFullYear()} HorebZ
          </span>
        </div>
      </div>
    </footer>
  );
}

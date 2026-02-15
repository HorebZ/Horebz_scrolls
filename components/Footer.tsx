import { Copyright } from "./copyright.tsx";

export function Footer() {
  return (
    <footer class="w-full">
      <div class="max-w-3xl mx-auto">
        <div class="mt-12 flex sm:flex-row flex-col sm:items-end justify-between h-full pt-8 border-t border-border">
          <div class="hidden grid sm:grid-cols-4 grid-cols-3 sm:gap-x-4 gap-y-2 justify-start items-start text-left">
            <a href="/rss.xml" target="_blank">rss feed</a>
            <a href="/is-one-thousand-nine-hundred-and-ninety-nine">1999</a>
            <a href="/faq">faq</a>
            <a href="/404">/404</a>
            <a href="https://github.com/HorebZ/Horebz_scrolls" target="_blank">
              Repo
            </a>
          </div>

          <Copyright />
        </div>
      </div>
    </footer>
  );
}

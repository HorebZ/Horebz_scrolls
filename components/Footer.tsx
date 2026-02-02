export function Footer() {
  return (
    <footer class="w-full">
      <div class="max-w-3xl mx-auto px-4">
        <div class="mt-12 flex flex-row items-start justify-between h-full pt-8 border-t border-border text-center">
          <div class="flex items-center justify-center">
            <img
              src="/assets/one-ring-dark.svg"
              alt="One ring dark"
              class="levitate w-1/2 max-w-[42px] pb-8"
            />
            <img
              src="/assets/one-ring-fire.svg"
              alt="One ring fire"
              class="levitate w-1/2 max-w-[42px] pb-8"
            />
            <img
              src="/assets/one-ring-light.svg"
              alt="One ring light"
              class="levitate w-1/2 max-w-[42px] pb-8"
            />
          </div>
          <p class="text-sm text-text-secondary">crafted by Horebz</p>
        </div>
      </div>
    </footer>
  );
}

import { define } from "../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function About() {
  return (
    <div class="max-w-3xl mx-auto py-12 px-4">
      <Head>
        <title>À propos | Horeb'z Scrolls</title>
      </Head>

      <div class="text-center">
        <div class="flex items-center justify-center">
          <img
            src="/assets/one-ring-dark.svg"
            alt="One ring dark"
            class="w-1/2 max-w-[100px] pb-8"
          />
          <img
            src="/assets/one-ring-fire.svg"
            alt="40"
            class="w-1/2 max-w-[100px] pb-8"
          />
          <img
            src="/assets/one-ring-light.svg"
            alt="One ring light"
            class="w-1/2 max-w-[100px] pb-8"
          />
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-4">
          The Page You Seek Has Been Found in the Light
        </h2>
      </div>
    </div>
  );
});

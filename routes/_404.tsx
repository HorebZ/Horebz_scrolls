import { define } from "../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function NotFound() {
  return (
    <div class="text-center mt-48">
      <Head>
        <title>404 | Horeb'z Scrolls</title>
      </Head>

      <div class="flex items-center justify-center">
        <h1
          class="leading-none font-display font-extrabold text-text-primary levitate"
          style={{ fontSize: "15rem" }}
        >
          4
        </h1>
        <img
          src="/assets/one-ring-fire.svg"
          alt="0"
          class="w-1/2 max-w-[200px] pb-8 levitate"
        />
        <h1
          class="leading-none font-display font-extrabold text-text-primary levitate"
          style={{ fontSize: "15rem" }}
        >
          4
        </h1>
      </div>

      <h2 class="text-2xl font-bold text-text-primary mb-4">
        The Page You Seek Has Been Lost to the Shadows
      </h2>
    </div>
  );
});

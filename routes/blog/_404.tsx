import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function NotFound() {
  return (
    <div class="max-w-3xl mx-auto py-12 px-4">
      <Head>
        <title>404 - Page non trouvée | Horeb'z Scrolls</title>
      </Head>

      <div class="text-center">
        <div class="flex items-center justify-center">
          <h1
            class="leading-none font-display font-extrabold text-text-primary"
            style={{ fontSize: "15rem" }}
          >
            4
          </h1>
          <img
            src="/assets/one-ring-fire.svg"
            alt="404"
            class="w-1/2 max-w-[200px] pb-8"
          />
          <h1
            class="leading-none font-display font-extrabold text-text-primary"
            style={{ fontSize: "15rem" }}
          >
            4
          </h1>
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-4">
          The Page You Seek Has Been Lost to the Shadows
        </h2>
      </div>
    </div>
  );
});

import { define } from "../utils.ts";
import { headerTitle } from "../utils/model.ts";
import { getPost } from "../utils/posts.ts";
import { render } from "@deno/gfm";
import { Head } from "fresh/runtime";

export default define.page(async function About() {
  const faq = await getPost("0-faq");

  if (!faq) {
    return new Response(null, { status: 404 });
  }

  const html = render(faq.content);

  return (
    <div class="w-full h-full max-w-3xl mx-auto py-12 px-4">
      <Head>
        <title>{headerTitle({ title: "FAQ" })}</title>
      </Head>

      <div
        class="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer class="w-full mt-24 pt-12 border-t border-border text-center">
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
      </footer>
    </div>
  );
});

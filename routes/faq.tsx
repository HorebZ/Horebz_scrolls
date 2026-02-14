import { define } from "../utils.ts";
import { headerTitle } from "../utils/model.ts";
import { getPost } from "../utils/posts.ts";
import { render } from "@deno/gfm";
import { Head } from "fresh/runtime";

export default define.page(async function About() {
  const faq = await getPost("chap-0");

  if (!faq) {
    return new Response(null, { status: 404 });
  }

  const html = render(faq.content)
    .replace(/<a(?![^>]*\btarget=)/gi, '<a target="_blank"');

  return (
    <div class="py-12 flex-col">
      <Head>
        <title>{headerTitle({ title: "FAQ" })}</title>
      </Head>

      <div
        class="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
});

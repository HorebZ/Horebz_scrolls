import { define } from "../utils.ts";
import { headerTitle } from "../utils/model.ts";
import { getPost } from "../utils/posts.ts";
import { render } from "@deno/gfm";
import { Head } from "fresh/runtime";
import { Footer } from "../components/Footer.tsx";

export default define.page(async function About() {
  const faq = await getPost("chap-0");

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

      <Footer />
    </div>
  );
});

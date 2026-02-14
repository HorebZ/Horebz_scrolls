import { define } from "../../utils.ts";
import { getPost } from "../../utils/posts.ts";
import { render } from "@deno/gfm";
import { Head } from "fresh/runtime";
import Categories from "../../components/Categories.tsx";

export default define.page(async function PostPage(ctx) {
  const { slug } = ctx.params;
  const post = await getPost(slug);

  if (!post) {
    return new Response(null, { status: 404 });
  }

  const html = render(post.content)
    .replace(/<a(?![^>]*\btarget=)/gi, '<a target="_blank"')
    .replace(/<a(?![^>]*\brel=)/gi, '<a rel="noopener noreferrer"');

  return (
    <article class="py-12">
      <Head>
        <title>{post.title} | Horeb'z Scrolls</title>
        <meta name="description" content={post.description} />
      </Head>

      <header class="mb-8">
        <p class="text-text-muted mb-2">
          {post.date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 class="text-4xl font-bold text-text-primary">{post.title}</h1>
        <em class="text-text-secondary block mb-4">{post.description}</em>

        <Categories categories={post.category} />
      </header>

      <div
        class="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div class="mt-12 pt-8 border-t border-border">
        <a href="/">
          ← Mes autres <s>brouillons</s> articles
        </a>
      </div>
    </article>
  );
});

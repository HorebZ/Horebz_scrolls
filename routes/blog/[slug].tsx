import { define } from "../../utils.ts";
import { getPost } from "../../utils/posts.ts";
import { render } from "@deno/gfm";
import { Head } from "fresh/runtime";

export default define.page(async function PostPage(ctx) {
  const { slug } = ctx.params;
  const post = await getPost(slug);

  if (!post) {
    return ctx.renderNotFound();
  }

  const html = render(post.content);

  return (
    <article class="max-w-3xl mx-auto py-12 px-4">
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

        {post.category.length > 0 && (
          <div class="flex flex-wrap gap-2 mb-4">
            {post.category.map((cat) => (
              <span class="inline-block px-3 py-1 rounded-sm text-sm font-mono bg-accent text-white">
                {cat}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        class="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer class="mt-12 pt-8 border-t border-border">
        <a href="/" class="text-link hover:text-link-hover transition-colors">
          ← Mes autres <s>brouillons</s> articles
        </a>
      </footer>
    </article>
  );
});

import { Footer } from "../components/Footer.tsx";
import { define } from "../utils.ts";
import { getPosts, Post } from "../utils/posts.ts";

export default define.page(async function Home(ctx) {
  const posts = await getPosts();

  return (
    <div class="pt-24 flex flex-col flex-1">
      <h1 class="text-4xl font-display text-text-primary mb-8">
        Bienvenue dans les archives{" "}
        <s class="text-3xl text-text-muted">pas terrible</s> de HorebZ
      </h1>

      <div class="relative divide-y divide-border border-b border-border pt-8">
        {posts.map((post: Post) => (
          <article class="relative py-8 first:pt-0">
            <h2>
              <a
                href={`/blog/${post.slug}`}
                class="font-display hover:underline text-text-primary"
              >
                {post.title}
              </a>
            </h2>

            <p class="leading-relaxed text-m text-text-secondary mb-3">
              {post.description}
            </p>

            <div class="flex justify-between items-baseline font-mono text-xs text-text-muted tracking-wide">
              <time datetime={post.date.toISOString()}>
                {post.date.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <a
                href={`/blog/${post.slug}`}
                class="hover:underline text-text-muted hover:text-text-primary"
              >
                Feuilleter →
              </a>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
});

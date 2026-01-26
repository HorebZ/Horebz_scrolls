import { define } from "../utils.ts";
import { getPosts, Post } from "../utils/posts.ts";

export default define.page(async function Home(ctx) {
  const posts = await getPosts();

  return (
    <div class="max-w-3xl mx-auto py-12 px-4">
      <h1 class="text-4xl font-display text-text-primary mb-8">
        Bienvenue dans les archives{" "}
        <s class="text-3xl text-text-muted">pas terrible</s> de HorebZ
      </h1>

      <div class="space-y-8">
        {posts.map((post: Post) => (
          <article class="p-6 shadow-sm border border-border bg-surface hover:shadow-md transition-shadow">
            <p class="text-sm text-text-muted">
              {post.date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 class="text-2xl font-bold">
              <a
                href={`/blog/${post.slug}`}
                class="font-display hover:underline text-text-primary"
              >
                {post.title}
              </a>
            </h2>
            <p class="text-text-secondary">{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
});

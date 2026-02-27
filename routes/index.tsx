import Categories from "../components/Categories.tsx";
import { define } from "../utils.ts";
import { formatDate } from "../utils/date.ts";
import { getPosts, Post } from "../utils/posts.ts";

export default define.page(async function Home(ctx) {
  const posts = await getPosts();

  return (
    <div class="pt-24">
      <h1 class="text-4xl font-display text-text-primary mb-8">
        Bienvenue dans les archives{" "}
        <s class="text-3xl text-text-muted">pas terrible</s> de HorebZ
      </h1>

      <div class="relative space-y-12 divide-y divide-border border-b border-border">
        {posts.map((post: Post, index: number) => (
          <article class="relative">
            <h4>
              <a
                href={`/blog/${post.slug}`}
                class="font-display hover:underline text-text-primary text-xl"
              >
                {
                  /* <span class="text-display text-gray-500">{post.slug} :</span>
                {" "} */
                }
                {post.title}
              </a>
            </h4>

            <p class="leading-tight text-sm text-text-secondary">
              {post.description}
            </p>

            <Categories categories={post.category} />
            <div class="flex justify-between mt-2">
              <a
                href={`/blog/${post.slug}`}
                class="font-display hover:underline text-text-primary"
              >
                Feuilleter →
              </a>
              <span class="font-display shrink-0 line-height-0">
                {post.date.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
});

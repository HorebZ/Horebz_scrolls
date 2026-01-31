import Categories from "../components/Categories.tsx";
import { define } from "../utils.ts";
import { getPosts, Post } from "../utils/posts.ts";

export default define.page(async function Home(ctx) {
  const posts = await getPosts();

  return (
    <div class="relative mx-auto max-w-3xl px-4">
      <div class="pt-12">
        <h1 class="text-4xl font-display text-text-primary mb-8">
          Bienvenue dans les archives{" "}
          <s class="text-3xl text-text-muted">pas terrible</s> de HorebZ
        </h1>

        <div class="relative space-y-12">
          {posts.map((post: Post, index: number) => (
            <article class="relative">
              {index !== 0 && (
                <div class="absolute left-0 right-0 top-[-16px] h-px bg-border" />
              )}
              {index !== posts.length - 1 && (
                <div class="absolute left-0 right-0 bottom-[-16px] h-px bg-border" />
              )}

              <h3 class="text-2xl font-bold">
                <a
                  href={`/blog/${post.slug}`}
                  class="font-display hover:underline text-text-primary"
                >
                  {post.title}
                </a>
              </h3>

              <div class="flex justify-between items-end mb-4 gap-2">
                <div class="flex flex-col gap-2">
                  <em class="font-size-sm text-text-secondary leading-tight inline-block">
                    {post.description}
                  </em>
                  <div class="pb-1">
                    <Categories categories={post.category} />
                  </div>
                </div>

                <span class="text-text-muted shrink-0 line-height-0">
                  {post.date.toISOString().split("T")[0]}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
});

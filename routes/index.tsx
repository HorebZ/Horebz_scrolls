import { define } from "../utils.ts";
import { getPosts, Post } from "../utils/posts.ts";

export default define.page(async function Home(ctx) {
  const posts = await getPosts();

  return (
    <div class="relative mx-auto max-w-3xl px-4">
      <div class="pt-12">
        <h1 class="pl-4 text-4xl font-display text-text-primary mb-8">
          Bienvenue dans les archives{" "}
          <s class="text-3xl text-text-muted">pas terrible</s> de HorebZ
        </h1>

        <div class="relative space-y-12 px-4">
          {posts.map((post: Post, index: number) => (
            <article class="relative">
              {index !== 0 && (
                <div class="absolute -left-[0px] -right-[16px] top-[-16px] h-px bg-border" />
              )}
              {index !== posts.length - 1 && (
                <div class="absolute -left-[0px] -right-[16px] bottom-[-16px] h-px bg-border" />
              )}

              <div class="px-4">
                <h3 class="text-2xl font-bold">
                  <a
                    href={`/blog/${post.slug}`}
                    class="font-display hover:underline text-text-primary"
                  >
                    {post.title}
                  </a>
                </h3>
                <em class="font-size-sm text-text-secondary block mb-4">
                  {post.description}
                </em>

                {post.category.length > 0 && (
                  <div class="flex flex-wrap gap-2">
                    {post.category.map((cat) => (
                      <span class="inline-block px-3 rounded-sm text-xs italic bg-category text-text-inverse theme-dark:text-text-primary">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
});

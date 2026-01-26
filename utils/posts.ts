import { extract } from "@std/front-matter/any";
import { join } from "@std/path";

export interface Post {
  slug: string;
  title: string;
  date: Date;
  description: string;
  category: string[];
  content: string;
  published: boolean;
}

const POSTS_DIR = "./posts";

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  try {
    for await (const entry of Deno.readDir(POSTS_DIR)) {
      if (entry.isFile && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(".md", "");
        const post = await getPost(slug);
        if (post && post.published) {
          posts.push(post);
        }
      }
    }
  } catch (err) {
    console.error("Error reading posts directory:", err);
  }

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
  const path = join(POSTS_DIR, `${slug}.md`);
  try {
    const text = await Deno.readTextFile(path);
    const { attrs, body } = extract(text);

    // Type assertion for frontmatter attributes
    const metadata = attrs as Record<string, any>;

    return {
      slug,
      title: metadata.title || "Untitled",
      date: new Date(metadata.date),
      description: metadata.description || "",
      category: metadata.category || [],
      content: body,
      published: metadata.published ?? true,
    };
  } catch (err) {
    console.error(`Error reading post ${slug}:`, err);
    return null;
  }
}

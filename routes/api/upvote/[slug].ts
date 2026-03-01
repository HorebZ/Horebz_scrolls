import { define } from "../../../utils.ts";
import { getPost } from "../../../utils/posts.ts";
import { upvotePost } from "../../../utils/upvotes.ts";
import { getVoterId, VOTER_COOKIE } from "../../../utils/upvotes.ts";

export const handler = define.handlers({
  async POST(ctx): Promise<Response> {
    const { slug } = ctx.params;
    const post = await getPost(slug);

    if (!post || !post.published) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const headers = new Headers({ "content-type": "application/json" });
    const cookieHeader = ctx.req.headers.get("cookie") ?? "";

    const voterId = getVoterId(cookieHeader);
    if (voterId) {
      const result = await upvotePost(slug, voterId);
      return Response.json(result, { headers });
    }

    const newVoterId = crypto.randomUUID();
    const isSecure = new URL(ctx.req.url).protocol === "https:";
    headers.append(
      "set-cookie",
      `${VOTER_COOKIE}=${
        encodeURIComponent(newVoterId)
      }; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${
        isSecure ? "; Secure" : ""
      }`,
    );

    const result = await upvotePost(slug, newVoterId);
    return Response.json(result, { headers });
  },
});

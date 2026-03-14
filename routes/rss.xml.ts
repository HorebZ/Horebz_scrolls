import { define } from "../utils.ts";
import { getPosts } from "../utils/posts.ts";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getSiteUrl(req: Request): string {
  const configured = Deno.env.get("SITE_URL")?.trim();
  if (configured) {
    return configured.endsWith("/") ? configured.slice(0, -1) : configured;
  }

  return new URL(req.url).origin;
}

export const handler = define.handlers({
  async GET(ctx): Promise<Response> {
    const posts = await getPosts();
    const siteUrl = getSiteUrl(ctx.req);
    const feedUrl = `${siteUrl}/rss.xml`;
    const logoPath = "./static/assets/logo.png";
    const logoUrl = `${siteUrl}/assets/logo.png`;
    const lastBuildDate = posts[0]?.date ?? new Date();
    let logoSize = 0;

    try {
      logoSize = (await Deno.stat(logoPath)).size;
    } catch {
      // Keep a safe fallback if the file is missing in a given environment.
      logoSize = 0;
    }

    const items = posts.map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;

      return `<item>
<title>${escapeXml(post.title)}</title>
<link>${escapeXml(url)}</link>
<guid isPermaLink="true">${escapeXml(url)}</guid>
<pubDate>${post.date.toUTCString()}</pubDate>
<description>${escapeXml(post.description)}</description>
<enclosure url="${escapeXml(logoUrl)}" length="${logoSize}" type="image/png" />
<media:thumbnail url="${escapeXml(logoUrl)}" />
</item>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Horeb&apos;z Scrolls</title>
<link>${escapeXml(siteUrl)}</link>
<description>Blog d&apos;un jeune arpenteur du code</description>
<language>fr-FR</language>
<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
<image>
<url>${escapeXml(logoUrl)}</url>
<title>Horeb&apos;z Scrolls</title>
<link>${escapeXml(siteUrl)}</link>
</image>
${items}
</channel>
</rss>
`;

    return new Response(xml, {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, max-age=900",
      },
    });
  },
});

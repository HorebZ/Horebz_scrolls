/// <reference lib="deno.unstable" />

let kvInstance: Deno.Kv | null = null;

async function getKv(): Promise<Deno.Kv> {
  if (!kvInstance) {
    kvInstance = await Deno.openKv();
  }
  return kvInstance;
}

function countKey(slug: string): Deno.KvKey {
  return ["upvotes", slug, "count"];
}

function voterKey(slug: string, voterId: string): Deno.KvKey {
  return ["upvotes", slug, "voters", voterId];
}

export async function getUpvoteCount(slug: string): Promise<number> {
  const kv = await getKv();
  const entry = await kv.get<number>(countKey(slug));
  return entry.value ?? 0;
}

export async function hasUpvoted(
  slug: string,
  voterId: string,
): Promise<boolean> {
  const kv = await getKv();
  const entry = await kv.get<boolean>(voterKey(slug, voterId));
  return entry.value === true;
}

export async function upvotePost(
  slug: string,
  voterId: string,
): Promise<{ added: boolean; total: number }> {
  const kv = await getKv();

  for (let attempt = 0; attempt < 5; attempt++) {
    const [voterEntry, countEntry] = await kv.getMany<[boolean, number]>([
      voterKey(slug, voterId),
      countKey(slug),
    ]);

    if (voterEntry.value) {
      return { added: false, total: countEntry.value ?? 0 };
    }

    const total = (countEntry.value ?? 0) + 1;
    const result = await kv.atomic()
      .check(voterEntry)
      .check(countEntry)
      .set(voterKey(slug, voterId), true)
      .set(countKey(slug), total)
      .commit();

    if (result.ok) {
      return { added: true, total };
    }
  }

  return { added: false, total: await getUpvoteCount(slug) };
}

export const VOTER_COOKIE = "voter_id";

export function getVoterId(cookieHeader: string): string | null {
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const prefix = `${VOTER_COOKIE}=`;
  const match = parts.find((part) => part.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

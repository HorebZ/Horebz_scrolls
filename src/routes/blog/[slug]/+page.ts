import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types';

export async function load({ params }: { params: { slug: string } }): Promise<{ content: string, meta: Post }> {
	try {
		const post = await import(`$lib/posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
		};
	} catch (e) {
		error(404, `The Article You Seek Has Been Lost to the Shadow "${params.slug}"`);
	}
}


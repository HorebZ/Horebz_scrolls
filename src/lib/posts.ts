import type { Post } from './types.ts';

export async function getPosts(): Promise<Post[]> {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const filename = path.split('/').at(-1) ?? "";
		/**
		* Le slug porte le numéro de l'article. Cela permet de les avoir dans l'ordre d'arrivée dans l'arborescence.
		* Et de les trier avec une simple méthode.
		*/
		const slug = filename.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } as Post;
			post.published && posts.push(post);
		}
	}

	posts.sort((a, b) =>
		parseInt(b.slug) - parseInt(a.slug)
	);

	return posts;
}

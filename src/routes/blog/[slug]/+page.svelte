<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="max-w-3xl mx-auto py-12 px-4 prose prose-slate lg:prose-xl">
	<header class="mb-8">
		<p class="text-gray-500 mb-2">{new Date(data.meta.date).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
		<h1 class="text-4xl font-bold">{data.meta.title}</h1>
		<em class="text-gray-500 font-italic mb-2">{data.meta.description}</em>

		<div class="flex flex-wrap gap-2 mb-2">
			{#each data.meta.category as category}
				<span class="inline-block px-3 py-0 rounded-sm text-sm font-mono" style="background-color: var(--color-blue-electric); color: #fff;">
					{category}
				</span>
			{/each}
		</div>
	</header>

	<div class="markdown-content">
		<data.content />
	</div>

	<footer class="mt-12 pt-8 border-t border-gray-100">
		<a href="/">← Mes autres <s>brouillons</s> articles</a>
	</footer>
</article>

<style>
	/* Ajout de quelques styles pour le contenu markdown si tailwind-typography n'est pas installé */
	.markdown-content :global(h2) { font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; }
	.markdown-content :global(p) { margin-bottom: 1rem; color: #374151; }
	.markdown-content :global(ul) { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
	.markdown-content :global(pre) { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
</style>

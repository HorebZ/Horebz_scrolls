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
	</header>

	<div class="markdown-content">
		<data.content />
	</div>

	<footer class="mt-12 pt-8 border-t border-gray-100">
		<a href="/" class="text-blue-600 hover:underline">← Retour à l'accueil</a>
	</footer>
</article>

<style>
	/* Ajout de quelques styles pour le contenu markdown si tailwind-typography n'est pas installé */
	.markdown-content :global(h2) { font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; }
	.markdown-content :global(p) { margin-bottom: 1rem; color: #374151; }
	.markdown-content :global(ul) { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
	.markdown-content :global(pre) { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
</style>

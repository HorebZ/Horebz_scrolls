<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="border-b border-gray-100 py-4">
	<div class="max-w-3xl mx-auto px-4 flex justify-between items-center">
		<a href="/" class="text-xl font-bold">HBlog</a>
		<nav>
			<a href="/" class="text-gray-600 hover:text-blue-600">Accueil</a>
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>


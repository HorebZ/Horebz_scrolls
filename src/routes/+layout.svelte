<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.jpg';
	import logo from '$lib/assets/logo.png';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Horeb'z Scrolls</title>
</svelte:head>

<header class="border-b border-border py-4 bg-surface transition-colors duration-300">
	<div class="max-w-3xl mx-auto px-4 flex justify-between items-center">
		<a href="/" class="flex items-center gap-2">
			<img src={logo} alt="Horeb'z Scrolls" class="w-10 h-10 rounded-full" />
			<span class="text-xl font-bold text-text-primary">Horeb'z Scrolls</span>
		</a>

		<nav class="flex items-center gap-6">
			<div class="flex items-center gap-4">
				<a href="/" class="text-text-secondary hover:text-accent transition-colors">Accueil</a>
				<a href="https://github.com/HorebZ" class="text-text-secondary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
			</div>
			<ThemeToggle />
		</nav>
	</div>
</header>

<main class="bg-background min-h-screen transition-colors duration-300">
	<div class="max-w-3xl mx-auto px-4 py-8">
		{@render children()}
	</div>
</main>

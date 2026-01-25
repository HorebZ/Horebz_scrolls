<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.jpg';
	import logo from '$lib/assets/logo.png';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	// Imports CSS pour obtenir les URLs via Vite
	import minasTirithTheme from '$lib/themes/minas-tirith.css?url';
	import minasMorgulTheme from '$lib/themes/minas-morgul.css?url';

	let { children } = $props();
	let currentTheme = $state($theme);
	let themeUrl = $state(minasTirithTheme);

	// Synchroniser le store avec l'état local pour la réactivité
	$effect(() => {
		currentTheme = $theme;
		themeUrl = currentTheme === 'minas-tirith' ? minasTirithTheme : minasMorgulTheme;
	});

	// Charger le thème au montage
	onMount(() => {
		currentTheme = $theme;
		themeUrl = currentTheme === 'minas-tirith' ? minasTirithTheme : minasMorgulTheme;
	});

	function toggleTheme() {
		theme.toggle();
		currentTheme = $theme;
		themeUrl = currentTheme === 'minas-tirith' ? minasTirithTheme : minasMorgulTheme;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Horeb'z Scrolls</title>
	<link rel="stylesheet" href={themeUrl} id="theme-stylesheet" />
</svelte:head>

<header class="border-b border-gray-100 py-4">
	<div class="max-w-3xl mx-auto px-4 flex justify-between items-center">
		<a href="/" class="flex items-center gap-2">
			<img src={logo} alt="Horeb'z Scrolls" class="w-10 h-10 rounded-full" />
			<span class="text-xl font-bold">Horeb'z Scrolls</span>
		</a>

		<nav class="flex items-center gap-4">
			<a href="/" class="text-gray-600 hover:text-blue-600">Accueil</a>
			<a href="https://github.com/HorebZ" class="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">Github</a>
			<label class="flex items-center gap-2 cursor-pointer">
				<span class="text-sm text-gray-600">Clair</span>
				<input
					type="checkbox"
					checked={currentTheme === 'minas-morgul'}
					onchange={toggleTheme}
					class="w-10 h-6 rounded-full appearance-none bg-gray-300 relative cursor-pointer transition-colors"
					role="switch"
					aria-label="Changer de thème"
				/>
				<span class="text-sm text-gray-600">Sombre</span>
			</label>
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>


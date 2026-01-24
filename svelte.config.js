import adapter from 'svelte-adapter-deno';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter()
	}
};

export default config;

<script lang="ts">
	let { data } = $props();
</script>

<div class="max-w-3xl mx-auto py-12 px-4">
	<h1 class="text-4xl font-display text-gray-900 mb-8">
		Bienvenue dans les archives <s class=" text-2xl text-gray-500">départementales du Rhône</s> de HorebZ
	</h1>

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
				<p class="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
				<h2 class="text-2xl font-bold mb-2">
					<a href="/blog/{post.slug}" class="font-display text-gold-rohan hover:underline">
						{post.title}
					</a>
				</h2>
				<p class="text-gray-600">{post.description}</p>
			</article>
		{/each}
	</div>
</div>

<script lang="ts">
	let { data } = $props();
</script>

<div class="max-w-3xl mx-auto py-12 px-4">
	<h1 class="text-4xl font-display text-gray-900 mb-8">
		Bienvenue dans les archives <s class=" text-3xl text-gray-500">pas terrible</s> de HorebZ
	</h1>

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
				<p class="text-sm text-gray-500">{post.date}</p>
				<h2 class="text-2xl font-bold">
					<a href="/blog/{post.slug}" class="font-display hover:underline">
						{post.title}
					</a>
				</h2>
				<p class="text-gray-600">{post.description}</p>
			</article>
		{/each}
	</div>
</div>

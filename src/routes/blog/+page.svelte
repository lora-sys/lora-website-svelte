<script lang="ts">
	import { formatDate } from '$lib/utils';
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	let { data } = $props();
	let BLUR_FADE_DELAY = 0.04;
</script>

<h1 class="mb-8 text-2xl font-medium tracking-tighter">Blog</h1>
<ul class="space-y-4">
	{#each data.posts as post, id}
		<li>
			<BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
				<a class="group flex flex-col space-y-2" href="/blog/{post.slug}">
					<p class="tracking-tight transition-colors group-hover:text-primary">{post.title}</p>
					<div class="flex flex-wrap items-center gap-2">
						{#each post.categories as category}
							<Badge variant="secondary" class="text-xs">{category}</Badge>
						{/each}
						<span class="text-xs text-muted-foreground">{formatDate(post.date)}</span>
					</div>
				</a>
			</BlurFade>
		</li>
	{/each}
</ul>

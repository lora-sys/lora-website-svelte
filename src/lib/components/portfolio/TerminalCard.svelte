<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		title: string;
		description: string;
		technologies: string[];
		href?: string;
		video?: string;
		image?: string;
		dates?: string;
		class?: string;
		ref?: HTMLElement | null;
	}

	let {
		title,
		description,
		technologies,
		href = '#',
		video = '',
		image = '',
		dates = '',
		class: className,
		ref: rootEl = $bindable(null)
	}: Props = $props();

	const fileName = title.toLowerCase().replace(/\s+/g, '-') + '.tsx';
	const shortDesc = description.length > 80 ? description.slice(0, 80) + '...' : description;
	const domain = href.startsWith('http') ? new URL(href).hostname : href;
</script>

<div
	bind:this={rootEl}
	class={cn(
		'border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-950/80',
		className
	)}
>
	<!-- Terminal Header -->
	<div class="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/80 px-3 py-2">
		<div class="flex gap-1.5">
			<div
				class="h-2.5 w-2.5 rounded-full bg-red-500/80 transition-colors group-hover:bg-red-500"
			></div>
			<div
				class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 transition-colors group-hover:bg-yellow-500"
			></div>
			<div
				class="h-2.5 w-2.5 rounded-full bg-green-500/80 transition-colors group-hover:bg-green-500"
			></div>
		</div>
		<div class="flex-1 text-center">
			<span class="font-mono text-[10px] text-zinc-500">{fileName}</span>
		</div>
		{#if dates}
			<span class="font-mono text-[10px] text-zinc-500/60">{dates}</span>
		{/if}
	</div>

	<!-- Content -->
	<div class="p-3 font-mono text-xs">
		<!-- Code comment style header -->
		<div class="mb-2 text-zinc-500/60">
			<span class="text-emerald-400/40">// </span><span class="text-emerald-400">{title}</span>
		</div>

		<!-- Description as comment -->
		<div class="mb-3 leading-relaxed text-zinc-400">
			<span class="text-zinc-500/40">// </span>{shortDesc}
		</div>

		<!-- Video/Image Area -->
		{#if video || image}
			<div class="mb-3 overflow-hidden rounded-lg border border-zinc-800">
				<a {href} target="_blank" rel="noopener noreferrer" class="block">
					{#if video}
						<video
							class="h-full w-full object-cover"
							style="max-height: 8rem;"
							src={video}
							autoplay
							loop
							muted
							playsinline
							preload="metadata"
						></video>
					{:else if image}
						<img
							class="h-full w-full object-cover"
							style="max-height: 8rem;"
							src={image}
							alt={title}
							loading="lazy"
						/>
					{/if}
				</a>
			</div>
		{/if}

		<!-- Tech badges -->
		<div class="mb-3 flex flex-wrap gap-1.5">
			{#each technologies.slice(0, 5) as tech}
				<span
					class="rounded border border-zinc-700 bg-zinc-800/50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200"
				>
					{tech}
				</span>
			{/each}
			{#if technologies.length > 5}
				<span class="font-mono text-[10px] text-zinc-500/60">
					+{technologies.length - 5}
				</span>
			{/if}
		</div>

		<!-- Open command -->
		<div class="text-zinc-500/60">
			<span class="text-emerald-400">$</span>
			<span class="ml-1">open </span>
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-emerald-400/80 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
			>
				{domain}
			</a>
		</div>
	</div>
</div>

<script lang="ts">
	let {
		company = '',
		title = '',
		description = '',
		start = '',
		end = '',
		href = ''
	}: {
		company?: string;
		title?: string;
		description?: string;
		start?: string;
		end?: string;
		href?: string;
	} = $props();

	let expanded = $state(false);

	let startStr = $derived(start?.toLowerCase().replace(/\s+/g, '') || '');
	let endStr = $derived(end?.toLowerCase().replace(/\s+/g, '') || '');
	let companyDir = $derived(company?.toLowerCase().replace(/\s+/g, '-') || '');
	let titleFile = $derived(
		title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
	);
</script>

<div class="group font-mono text-xs leading-relaxed">
	<!-- Directory line: company -->
	<div
		class="flex cursor-pointer items-baseline gap-2 rounded px-2 py-1 transition-colors hover:bg-emerald-500/5"
		onclick={() => (expanded = !expanded)}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (expanded = !expanded)}
	>
		<span class="w-[9ch] shrink-0 text-zinc-500">drwxr-xr-x</span>
		<span class="w-[14ch] shrink-0 tabular-nums text-zinc-500">{startStr}</span>
		<span class="w-[14ch] shrink-0 tabular-nums text-zinc-500">{endStr}</span>
		<span class="font-semibold text-emerald-400">{company}/</span>
		{#if expanded}
			<span class="ml-2 text-zinc-500">(expanded)</span>
		{/if}
	</div>

	<!-- File line: title -->
	<div
		class="flex cursor-pointer items-baseline gap-2 rounded px-2 py-1 transition-colors hover:bg-emerald-500/5"
		onclick={() => description && (expanded = !expanded)}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && description && (expanded = !expanded)}
	>
		<span class="w-[9ch] shrink-0 text-zinc-500">-rw-r--r--</span>
		<span class="w-[14ch] shrink-0 text-zinc-500">root</span>
		<span class="w-[14ch] shrink-0 text-zinc-500">root</span>
		<span class="text-zinc-200">{title}</span>
		{#if !expanded}
			<span class="ml-2 italic text-zinc-500">(cat to read)</span>
		{/if}
	</div>

	<!-- Expanded description: cat style -->
	{#if expanded && description}
		<div class="my-2 overflow-hidden rounded border border-zinc-700 bg-zinc-900/50 px-3 py-2">
			<div class="mb-1 flex items-center gap-2 text-zinc-500">
				<span class="text-emerald-400">$</span>
				<span>cat {companyDir}/{titleFile}.md</span>
			</div>
			<div class="whitespace-pre-wrap text-zinc-300">{description}</div>
			{#if href}
				<div class="mt-2 flex items-center gap-2 text-zinc-500">
					<span class="text-emerald-400">$</span>
					<a href={href} target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
						open {href.replace(/https?:\/\//, '')}
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
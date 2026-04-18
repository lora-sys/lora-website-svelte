<script lang="ts">
	interface Props {
		label: string;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { label, class: className = '', children }: Props = $props();

	let show = $state(false);
	let triggerEl: HTMLDivElement | undefined = $state();

	let tooltipStyle = $derived.by(() => {
		if (!triggerEl || !show) return '';
		const rect = triggerEl.getBoundingClientRect();
		const top = rect.top - 8;
		return `position: fixed; left: ${rect.left + rect.width / 2}px; top: ${top}px; transform: translateX(-50%) translateY(-100%);`;
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={triggerEl}
	class={className}
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
	onfocus={() => (show = true)}
	onblur={() => (show = false)}
>
	{@render children?.()}
	{#if show}
		<div
			class="pointer-events-none z-[100] whitespace-nowrap rounded-md border border-border/50 bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
			style={tooltipStyle}
		>
			{label}
		</div>
	{/if}
</div>

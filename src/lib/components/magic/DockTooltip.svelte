<script lang="ts">
	interface Props {
		label: string;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { label, class: className = '', children }: Props = $props();

	let show = $state(false);
	let triggerEl: HTMLDivElement | undefined = $state();
	let tooltipStyle = $state('');
	let hideTimer: ReturnType<typeof setTimeout>;

	function handleEnter() {
		clearTimeout(hideTimer);
		show = true;
		updatePosition();
	}

	function handleLeave() {
		hideTimer = setTimeout(() => (show = false), 50);
	}

	function updatePosition() {
		if (!triggerEl || !show) return;
		const rect = triggerEl.getBoundingClientRect();
		tooltipStyle = `position: fixed; left: ${rect.left + rect.width / 2}px; top: ${rect.top - 8}px; transform: translateX(-50%) translateY(-100%);`;
	}

	$effect(() => {
		if (triggerEl && show) {
			updatePosition();
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={triggerEl}
	class={className}
	onmouseenter={handleEnter}
	onmouseleave={handleLeave}
	onfocus={handleEnter}
	onblur={handleLeave}
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

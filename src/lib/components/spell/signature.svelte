<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		text?: string;
		color?: string;
		fontSize?: number;
		duration?: number;
		delay?: number;
		class?: string;
		once?: boolean;
		inView?: boolean;
	}

	let {
		text = "Signature",
		color = "#1D1D1F",
		fontSize = 72,
		duration = 1.5,
		delay = 0,
		class: className,
		once = false,
		inView = false,
	}: Props = $props();
</script>

<svelte:head>
	<style>
		@font-face {
			font-family: 'Lastoria';
			src: url('/LastoriaBoldRegular.otf') format('opentype');
			font-weight: bold;
			font-display: block;
		}
	</style>
</svelte:head>

<div
	class={cn("overflow-visible tracking-wider", className)}
	style="font-family: 'Lastoria', serif; font-size: {fontSize}px; color: {color};"
>
	{text}
</div>
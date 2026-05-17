<script lang="ts">
	import { browser } from "$app/environment";
	import { cn } from "$lib/utils";
	import { motion, type AnimationOptions, type Transition } from "motion-sv";
	import type { SVGAttributes } from "svelte/elements";

	interface SignatureProps extends SVGAttributes<SVGSVGElement> {
		text?: string;
		color?: string;
		fontSize?: number;
		duration?: number;
		delay?: number;
		class?: string;
		inView?: boolean;
		once?: boolean;
	}

	let height = 100;

	let {
		text = "Signature",
		color = "#22c55e",
		fontSize = 48,
		duration = 1.5,
		delay = 0,
		class: className,
		inView = false,
		once = true,
	}: SignatureProps = $props();

	let paths = $state<string[]>([]);
	let width = $state(300);

	// Fallback: just show text as gradient text
	let textStyle = $derived(`
		font-size: ${fontSize}px;
		background: linear-gradient(to right, ${color}, #9c40ff, ${color});
		background-size: 200% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: gradient-shift 3s ease infinite;
	`);

	$effect(() => {
		// Just use text fallback - no font file needed
		width = Math.max(text.length * fontSize * 0.6, fontSize * 2);
	});
</script>

<style>
	@keyframes gradient-shift {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>

<div
	class={cn("overflow-visible font-bold tracking-wider", className)}
	style={textStyle}
>
	{text}
</div>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		angle?: number;
		cellSize?: number;
		opacity?: number;
		lightLineColor?: string;
		darkLineColor?: string;
	}

	let {
		class: className,
		angle = 65,
		cellSize = 60,
		opacity = 0.5,
		lightLineColor = 'gray',
		darkLineColor = 'gray',
		...props
	}: RetroGridProps = $props();
</script>

<div
	class={cn(
		'perspective-[200px] pointer-events-none absolute size-full overflow-hidden',
		`opacity-(--opacity)`,
		className
	)}
	style="
		--grid-angle: {angle}deg;
		--cell-size: {cellSize}px;
		--opacity: {opacity};
		--light-line: {lightLineColor};
		--dark-line: {darkLineColor};"
	{...props}
>
	<div class="transform-[rotateX(var(--grid-angle))] absolute inset-0">
		<div
			class="animate-grid bg-size-[var(--cell-size)_var(--cell-size)] inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] bg-[linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] bg-repeat dark:bg-[linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]"
		></div>
	</div>
	<div
		class="bg-linear-to-t absolute inset-0 from-white to-transparent to-90% dark:from-black"
	></div>
</div>

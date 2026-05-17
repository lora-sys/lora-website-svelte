<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
		delayMs?: number;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', delayMs = undefined, children }: Props = $props();
</script>

<AvatarPrimitive.Root
	{delayMs}
	class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
>
	{@render children?.()}
</AvatarPrimitive.Root>

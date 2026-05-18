<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<AvatarPrimitive.Fallback
	class={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
>
	<slot />
</AvatarPrimitive.Fallback>

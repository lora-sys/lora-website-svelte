<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
		src?: string;
		alt?: string;
		loading?: 'lazy' | 'eager';
	}

	let { class: className = '', src, alt, loading = 'eager' }: Props = $props();
</script>

<AvatarPrimitive.Image {src} {alt} class={cn('aspect-square h-full w-full', className)} {loading} />

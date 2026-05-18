<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import X from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';
	import * as Dialog from './index.js';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay class="fixed inset-0 z-50 flex items-center justify-center">
		<DialogPrimitive.Content
			bind:ref
			class={cn(
				'relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg',
				className
			)}
			{...restProps}
		>
			{@render children?.()}
			<DialogPrimitive.Close
				class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
			>
				<X class="size-4" />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</Dialog.Overlay>
</Dialog.Portal>

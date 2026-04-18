<script lang="ts">
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '@fontsource/lora/400.css';
	import '@fontsource/lora/500.css';
	import '@fontsource/lora/600.css';
	import '@fontsource/lora/400-italic.css';
	import '@fontsource/lora/500-italic.css';
	import '@fontsource/fragment-mono/400.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	setMode('dark');
</script>

<svelte:head>
	<link rel="preconnect" href="https://i.pinimg.com" />
	<link rel="preconnect" href="https://pub-83c5db439b40468498f97946200806f7.r2.dev" />
	<link rel="preconnect" href="https://cdn.magicui.design" />
</svelte:head>

<ModeWatcher />
<Tooltip.Provider>
	<div
		class="relative mx-auto min-h-screen max-w-5xl bg-background px-6 py-12 antialiased sm:py-24"
	>
		{@render children?.()}
		<Navbar />
	</div>
</Tooltip.Provider>

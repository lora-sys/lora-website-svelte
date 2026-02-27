<script lang="ts">
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	setMode('dark');
</script>

<ModeWatcher />
<Tooltip.Provider>
	<div
		class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-mono antialiased sm:py-24"
	>
		{@render children?.()}
		<Navbar />
	</div>
</Tooltip.Provider>

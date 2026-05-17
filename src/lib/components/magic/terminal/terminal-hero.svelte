<script lang="ts">
	import { onMount } from 'svelte';
	import { setMode } from 'mode-watcher';
	import { goto } from '$app/navigation';
	import { DATA } from '$lib/data/resume';
	import BorderBeam from '$lib/components/magic/border-beam/border-beam.svelte';
	import Signature from '$lib/components/spell/signature.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let commandInput = $state('');
	let commandHistory = $state<string[]>([
		'> System initializing...',
		'> Loading portfolio...',
		'> Welcome to my terminal portfolio',
		'> Type "help" to see available commands'
	]);
	let showSignature = $state(false);
	let konamiIndex = $state(0);

	const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

	function handleCommand(cmd: string) {
		const trimmed = cmd.trim().toLowerCase();
		commandHistory = [...commandHistory, `> ${cmd}`];

		if (trimmed === 'help') {
			commandHistory = [
				...commandHistory,
				'> Available commands:',
				'>   help     - Show this help message',
				'>   dark     - Switch to dark mode',
				'>   light    - Switch to light mode',
				'>   projects - View my projects',
				'>   about    - Learn about me',
				'>   contact  - Get in touch',
				'>   clear    - Clear terminal'
			];
		} else if (trimmed === 'dark') {
			setMode('dark');
			commandHistory = [...commandHistory, '> Switched to dark mode'];
		} else if (trimmed === 'light') {
			setMode('light');
			commandHistory = [...commandHistory, '> Switched to light mode'];
		} else if (trimmed === 'projects') {
			commandHistory = [
				...commandHistory,
				'> Loading projects...',
				...DATA.projects.map(p => `>   - ${p.title}: ${p.href || '#'}`)
			];
		} else if (trimmed === 'about') {
			commandHistory = [
				...commandHistory,
				`> ${DATA.name}`,
				`> ${DATA.description}`,
				`> ${DATA.location}`
			];
		} else if (trimmed === 'contact') {
			commandHistory = [
				...commandHistory,
				'> Contact links:',
				...Object.values(DATA.contact.social).map(link => `>   - ${link.name}: ${link.url}`)
			];
		} else if (trimmed === 'clear') {
			commandHistory = ['> Terminal cleared'];
		} else if (trimmed === 'sudo') {
			commandHistory = [...commandHistory, '> Permission denied. But nice try.'];
		} else if (trimmed === 'exit') {
			commandHistory = [...commandHistory, '> You cannot escape this terminal.'];
		} else if (trimmed) {
			commandHistory = [
				...commandHistory,
				`> Command not found: ${cmd}`,
				'> Type "help" to see available commands'
			];
		}

		commandInput = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && commandInput.trim()) {
			handleCommand(commandInput);
		}

		// Konami code detection
		if (e.key === KONAMI_CODE[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === KONAMI_CODE.length) {
				triggerKonami();
				konamiIndex = 0;
			}
		} else {
			konamiIndex = 0;
		}
	}

	function triggerKonami() {
		showSignature = true;
		setTimeout(() => {
			showSignature = false;
		}, 3000);
	}

	onMount(() => {
		const input = document.querySelector('input[data-terminal-input]') as HTMLInputElement;
		input?.focus();
	});
</script>

<div class="relative {className}">
	<!-- Terminal Window -->
	<div class="relative overflow-hidden rounded-2xl border border-border bg-term-bg/95 backdrop-blur-sm">
		<!-- Terminal Header -->
		<div class="flex items-center gap-2 border-b border-border bg-term-main px-4 py-2">
			<div class="flex gap-1.5">
				<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/80"></div>
			</div>
			<div class="flex-1 text-center text-xs text-muted-foreground">
				<span class="font-mono">guest@portfolio ~ terminal</span>
			</div>
		</div>

		<!-- Terminal Body -->
		<div class="p-4 font-mono text-sm">
			<!-- Command History -->
			<div class="mb-4 max-h-64 space-y-1 overflow-y-auto">
				{#each commandHistory as line (line)}
					<div class="text-term-green">{line}</div>
				{/each}
			</div>

			<!-- Input Line -->
			<div class="flex items-center gap-2">
				<span class="text-term-green">$</span>
				<input
					data-terminal-input
					type="text"
					bind:value={commandInput}
					onkeydown={handleKeydown}
					class="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
					placeholder="Type a command..."
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
				/>
			</div>
		</div>

		<!-- Border Beam Effect -->
		<BorderBeam
			size={200}
			colorFrom="var(--term-green)"
			colorTo="#9c40ff"
			duration={8}
		/>
	</div>

	<!-- Konami Signature Animation -->
	{#if showSignature}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
			role="dialog"
			aria-modal="true"
		>
			<Signature text={DATA.name} fontSize={72} />
		</div>
	{/if}
</div>

<style>
	.text-term-green {
		color: var(--term-green, #22c55e);
	}
	.bg-term-bg {
		background-color: var(--term-bg, #07070a);
	}
	.bg-term-main {
		background-color: var(--term-main, #111116);
	}
</style>
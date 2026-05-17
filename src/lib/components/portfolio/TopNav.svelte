<script lang="ts">
	import { page } from '$app/stores';
	import { DATA } from '$lib/data/resume';
	import Command from '$lib/components/magic/command/command.svelte';

	let currentPath = $derived($page.url.pathname);

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Skills', href: '/#skills' },
		{ label: 'About', href: '/#about' },
		{ label: 'Contact', href: '/#contact' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg"
>
	<nav class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
		<!-- Left: Logo + Breadcrumb -->
		<div class="flex items-center gap-6">
			<a href="/" class="font-mono text-sm font-bold text-term-green transition-colors hover:text-gold">
				{DATA.name}<span class="animate-pulse">_</span>
			</a>
			<ul class="hidden items-center gap-1 sm:flex">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="rounded-md px-3 py-1.5 font-mono text-xs transition-all duration-200
								{isActive(item.href)
									? 'bg-term-green/10 text-term-green'
									: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Right: Path indicator + Command -->
		<div class="flex items-center gap-3">
			<span class="hidden font-mono text-xs text-muted-foreground md:block">
				~{currentPath}
			</span>
			<Command />
		</div>
	</nav>
</header>

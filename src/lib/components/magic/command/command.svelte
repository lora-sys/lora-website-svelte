<script lang="ts">
	import { Command } from 'bits-ui';
	import { goto } from '$app/navigation';
	import { DATA } from '$lib/data/resume';
	import { portal } from '$lib/actions/portal';
	import { base } from '$app/paths';

	type Item = {
		label: string;
		keywords?: string[];
		action?: () => void;
		href?: string;
	};

	type Group = {
		name: string;
		items: Item[];
	};

	let open = $state(false);
	let search = $state('');

	const navigationGroups: Group[] = [
		{
			name: 'Navigation',
			items: [
				{ label: 'Home', keywords: ['home', 'hero', 'landing'], href: `${base}/` },
				{ label: 'Blog', keywords: ['blog', 'posts', 'articles'], href: `${base}/blog` },
				{
					label: 'Projects',
					keywords: ['projects', 'work', 'portfolio'],
					href: `${base}/#projects`
				},
				{ label: 'Skills', keywords: ['skills', 'tech', 'stack'], href: `${base}/#skills` },
				{ label: 'About', keywords: ['about', 'me', 'resume'], href: `${base}/#about` },
				{ label: 'Contact', keywords: ['contact', 'social', 'links'], href: `${base}/#contact` }
			]
		},
		{
			name: 'Projects',
			items: DATA.projects.map((p) => ({
				label: p.title,
				keywords: p.technologies,
				href: p.href || '#'
			}))
		},
		{
			name: 'Skills',
			items: DATA.skills.slice(0, 10).map((s) => ({
				label: s,
				keywords: [s]
			}))
		}
	];

	function handleSelect(item: Item) {
		open = false;
		search = '';
		if (item.href) {
			goto(item.href);
		} else if (item.action) {
			item.action();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
		if (e.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<button
	onclick={() => (open = true)}
	class="flex cursor-pointer items-center gap-2 rounded-md border border-border/50 bg-card/50 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
>
	<span class="text-xs">Search...</span>
	<kbd class="hidden rounded bg-muted px-1.5 py-0.5 font-mono text-xs sm:inline">Ctrl K</kbd>
</button>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:portal
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
		onclick={() => (open = false)}
		onkeydown={(e) => {
			if (e.key === 'Escape') open = false;
		}}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="flex max-h-[90vh] w-full max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-popover animate-in fade-in-0 zoom-in-95 sm:max-w-[490px]"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<Command.Root
				bind:value={search}
				class="flex h-full min-h-0 w-full flex-col divide-y divide-border overflow-hidden rounded-xl border bg-background"
			>
				<Command.Input
					autofocus
					placeholder="Search navigation, projects, skills..."
					class="h-input inline-flex flex-1 truncate rounded-tl-xl rounded-tr-xl bg-background px-4 text-sm transition-colors placeholder:text-muted-foreground focus:outline-none"
					onkeydown={(e) => {
						if (e.key === 'Escape') {
							open = false;
						}
					}}
				/>

				<Command.List class="max-h-[300px] overflow-y-auto overflow-x-hidden px-2 pb-2">
					<Command.Empty
						class="flex w-full items-center justify-center pb-6 pt-8 text-sm text-muted-foreground"
					>
						No results found.
					</Command.Empty>

					{#each navigationGroups as group (group.name)}
						<Command.Group>
							<Command.GroupHeading class="px-3 pb-2 pt-4 text-xs text-muted-foreground">
								{group.name}
							</Command.GroupHeading>
							<Command.GroupItems>
								{#each group.items as item (item.label)}
									<Command.Item
										class="rounded-button data-selected:bg-muted outline-hidden flex h-10 cursor-pointer select-none items-center gap-2 px-3 py-2.5 text-sm capitalize"
										keywords={item.keywords}
										onSelect={() => handleSelect(item)}
									>
										{item.label}
									</Command.Item>
								{/each}
							</Command.GroupItems>
						</Command.Group>
					{/each}
				</Command.List>
			</Command.Root>
		</div>
	</div>
{/if}

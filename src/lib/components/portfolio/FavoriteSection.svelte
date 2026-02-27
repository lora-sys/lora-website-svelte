<script lang="ts">
	import { BentoGrid, BentoCard } from '$lib/components/magic/bento-grid';
	import { DATA } from '$lib/data/resume';
	import * as Dialog from '$lib/components/ui/dialog';

	const gridClasses = [
		'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
		'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
		'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
		'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
		'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4'
	];
</script>

<section id="favorites" class="py-12">
	<div class="space-y-6">
		<h2 class="text-2xl font-bold tracking-tight">Favorites</h2>
		<BentoGrid class="lg:grid-rows-3">
			{#each DATA.favorites as item, i}
				{#if item.isSpotify}
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<div class={gridClasses[i] || ''}>
								<BentoCard
									name={item.name}
									description={item.description}
									href="#"
									cta={item.cta}
									Icon={item.icon}
								>
									{#snippet background()}
										<img
											src={item.background}
											alt={item.name}
											class="absolute inset-0 h-full w-full object-cover"
										/>
									{/snippet}
								</BentoCard>
							</div>
						</Dialog.Trigger>
						<Dialog.Content class="max-h-[80vh] overflow-y-auto">
							<Dialog.Header>
								<Dialog.Title>{item.name}</Dialog.Title>
								<Dialog.Description>{item.description}</Dialog.Description>
							</Dialog.Header>
							<div class="mt-4">
								<iframe
									src={item.href}
									width="100%"
									height="352"
									frameborder="0"
									allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
									loading="lazy"
									style="border-radius: 12px"
								></iframe>
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{:else}
					<BentoCard
						name={item.name}
						description={item.description}
						href={item.href}
						cta={item.cta}
						Icon={item.icon}
						class={gridClasses[i] || ''}
					>
						{#snippet background()}
							<img
								src={item.background}
								alt={item.name}
								class="absolute inset-0 h-full w-full object-cover"
							/>
						{/snippet}
					</BentoCard>
				{/if}
			{/each}
		</BentoGrid>
	</div>
</section>

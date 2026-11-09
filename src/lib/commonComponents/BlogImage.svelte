<script lang="ts">
	import { resolveImage } from '#lib/utils/images';

	let {
		name,
		alt = '',
		loading = 'lazy',
		class: className = ''
	}: {
		name?: string;
		alt?: string;
		loading?: 'lazy' | 'eager';
		class?: string;
	} = $props();

	const image = $derived(resolveImage(name));
</script>

{#if image}
	<enhanced:img class={className} src={image} {alt} {loading} />
{/if}

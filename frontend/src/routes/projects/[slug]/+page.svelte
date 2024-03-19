<script lang="ts">
	import { strapi_url } from '$lib/client/constants';
	import { formatTZDate } from '$lib/client/functions';
	import Tag from '$lib/commonComponents/Tag.svelte';
	import type { PageData } from './$types';
	import type { imageFormats } from '$lib/types/imageTypes';
	export let data: PageData;
	const description = data.project?.description;
	const image_formats = data.project?.icon?.data?.attributes.formats as unknown as imageFormats;
	const image = image_formats.small;
	const image_url = strapi_url + image.url;
	// const image_url = false;
	const image_alt = data.project?.icon?.data?.attributes.alternativeText;
	
	const tags = data.project?.tags?.split(',') || []
	const name = data.project?.name || "";
</script>
<div class="container">
	<div class="project">
		<div class="heading">
			<h1 class="sixtyfour">{name}</h1>
			<h3>
				{"Last Updated: "+(formatTZDate(data.project?.updatedAt?.toLocaleString()||""))}
			</h3>
		</div>
		<div class="content">
			{#if image_url}
			<img src={image_url} alt={image_alt}/>
			{:else}
			<div class="image-placeholder"></div>
			{/if}
			<p>{description}</p> 
		</div>
		<div class="tags">
			Tags:
			{#each tags as tag}
			<Tag tagName={tag}/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	img {
		margin:1em;
	}
	.content {
		display: flex;
		flex-direction: row;
	}
	.image-placeholder {
		width: 400px;
		height: 400px;
		background-color: var(--tertiary-bg);
		margin: 1em;
	}
	.container {
		min-height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.project {
		position:relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* min-height: 100%; Ensure the project takes at least the full height of the viewport */
		border-radius: 8px;
		background-color: var(--secondary-bg);
		min-width: 65%;
		max-width: 95%;
		z-index: 0;
	}
	.heading h1 {
		color: var(--accent-color-primary);
		font-size: 3em;
		margin-left: 1em;
	}
	.heading h3 {
		margin-right: 1em;
	}
	.heading {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		padding-left: 1em;
		padding-right: 1em;
	}
	.tags {
		display:flex;
		flex-direction: row;
		align-items: baseline;
		margin: 1em;
		margin-left: 5em;
		width: 100%;
	}
</style>
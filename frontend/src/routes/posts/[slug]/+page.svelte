<script lang="ts">
	import { strapi_url } from '$lib/client/constants';
	import { formatTZDate } from '$lib/client/functions';
	import type { richTextBlock } from '$lib/types/richTextBlock';
	import Tag from '../Tag.svelte';
	/** @type {import('./$types').PageData} */
	// @ts-ignore
	import PostBody from './PostBody.svelte';
	export let data;
	const body = data.post?.Body as unknown as richTextBlock[];
	const background_image = strapi_url + data.post?.cover?.data?.attributes.url;
	const tags = data.post?.tags?.split(',') || []
</script>
<div class="post">
	{#if background_image}
	<div class="background-image" style="background-image: url({background_image});"></div>
	{/if}
	<div class="heading">
		<h1 class="sixtyfour">{data.post?.Title}</h1>
		<div class="tags">
			Tags:
			{#each tags as tag}
				<Tag tagName={tag}/>
			{/each}
		</div>
		<h3>
			{"Last Updated: "+(formatTZDate(data.post?.updatedAt?.toLocaleString()||""))}
		</h3>
	</div>
	<PostBody content={body}/>
</div>

<style lang="postcss">
	.post {
		position:relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* min-height: 100%; Ensure the post takes at least the full height of the viewport */
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
		margin-top: 200px;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		padding-left: 1em;
		padding-right: 1em;
	}
	.background-image {
		border-radius: 8px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 250px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: -1; /* Ensure the background image sits behind other content */
		mask-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0));
	}
	.tags {
		display:flex;
		flex-direction: row;
		align-items: baseline;
	}
</style>
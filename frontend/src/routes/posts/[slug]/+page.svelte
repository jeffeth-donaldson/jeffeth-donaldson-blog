<script lang="ts">
	import { strapi_url } from '$lib/client/constants';
	import type { richTextBlock } from '$lib/types/richTextBlock';
	/** @type {import('./$types').PageData} */
	// @ts-ignore
	import PostBody from './PostBody.svelte';
	export let data;
	const body = data.post?.Body as unknown as richTextBlock[];
	const background_image = strapi_url + data.post?.cover?.data?.attributes.url;
</script>
<div class="post">
	{#if background_image}
	<div class="background-image" style="background-image: url({background_image});"></div>
	{/if}
	<h1>{data.post?.Title}</h1>
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
	.post h1 {
		color: var(--accent-color-primary);
		margin-top: 200px;
		font-size: 3em;
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
</style>
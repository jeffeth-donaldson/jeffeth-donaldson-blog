<script lang="ts">
	import { resolve } from '$app/paths';
	import { getPost } from '#lib/content';
	import Tag from '#lib/commonComponents/Tag.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const post = $derived(getPost(data.slug));
	const Content = $derived(post?.component);
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="post">
	{#if data.banner}
		<enhanced:img class="background-image" src={data.banner} alt="banner" />
	{/if}
	<div class="heading">
		<h1 class="sixtyfour">{data.title}</h1>
		{#if data.project}
			<div>
				Part of the <a href={resolve('/projects/[slug]', { slug: data.project })}>{data.project}</a>
			</div>
		{/if}
		<div class="tags">
			Tags:
			{#each data.tags as tag (tag)}
				<Tag tagName={tag} />
			{/each}
		</div>
		<div class="last-updated">
			{'Published: ' + data.date}
		</div>
	</div>
	<div class="post-body">
		{#if Content}
			<Content />
		{/if}
	</div>
</div>

<style>
	.post {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* min-height: 100%; Ensure the post takes at least the full height of the viewport */
		border-radius: 8px;
		background-color: var(--secondary-bg);
		min-width: 65vw;
		max-width: 95vw;
		z-index: 0;
	}
	.heading h1 {
		color: var(--accent-color-primary);
		font-size: 3em;
		margin-left: 1em;
	}
	.last-updated {
		margin-right: 1em;
		word-wrap: break-word;
		max-width: 70%;
		color: var(--accent-color-tertiary);
		margin-bottom: 1em;
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
		mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
	}
	.tags {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	@media screen and (max-width: 800px) {
		.heading {
			flex-direction: column;
		}
		.heading h1 {
			font-size: 2em;
		}
	}
</style>

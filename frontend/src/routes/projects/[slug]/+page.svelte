<script lang="ts">
	import { strapi_url } from '$lib/client/constants';
	import { formatTZDate } from '$lib/client/functions';
	import Tag from '$lib/commonComponents/Tag.svelte';
	import type { PageData } from './$types';
	import type { imageFormats } from '$lib/types/imageTypes';
	import PostThumbnail from '../../posts/PostThumbnail.svelte';
	export let data: PageData;
	const description = data.project?.description;
	const image_formats = data.project?.icon?.data?.attributes.formats as unknown as imageFormats;
	const image = image_formats.small;
	const image_url = strapi_url + image.url;
	// const image_url = false;
	const image_alt = data.project?.icon?.data?.attributes.alternativeText;
	
	const tags = data.project?.tags?.split(',') || []
	const name = data.project?.name || "";
	const github = data.project?.repository_url || "";
	const posts = data.project?.blog_posts?.data || [];
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
			<div>
				{#if image_url}
				<img src={image_url} alt={image_alt}/>
				{:else}
				<div class="image-placeholder"></div>
				{/if}
				<div class="tags">
					Tags:
					{#each tags as tag}
					<Tag tagName={tag}/>
					{/each}
					{#if github}
					<a href={github}><i class="fa-brands fa-github"></i></a>
					{/if}
				</div>
			</div>
			<div>
				<p class="description">{description}</p>
				{#if posts.length > 0}
				<div class="articles">
					<h2>Posts About Project:</h2>
					<div class="scroll-container">
						<div class="thumbnail-container">
							{#each posts as post}
							<PostThumbnail post={post}/>
							{/each}
						</div>
					</div>
				</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.description {
		margin-right:1em;
		word-wrap: break-word;
	}
	.scroll-container {
		overflow:auto;
		max-height: 40vh;
		/* max-height: 50%; */
	}
	.thumbnail-container {
		display:flex;
		justify-content:center;
		flex-direction:column;
		padding:1em;
	}
	.articles {
		padding-top: 0.5em;
		background-color: var(--accent-color-tertiary);
		margin-right:1em;
		border-radius: 5px;
		margin-bottom:1em;
		padding-bottom:0.25em;
	}
	.articles h2 {
		margin-left:1em;
		margin-top:0;
		margin-bottom:0;
	}
	img {
		margin:1em;
	}
	.content {
		display: flex;
		flex-direction: row;
		word-wrap: break-word;
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
		border-radius: 8px;
		background-color: var(--secondary-bg);
		min-width: 65%;
		max-width: 90vw;
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
		align-items: center;
		margin: 1em;
		margin-left: 5em;
		width: 100%;
	}
	.tags a {
		margin-left: 2em;
		font-size: xx-large;
	}
</style>
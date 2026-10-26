<script lang="ts">
	import { getPostsForProject, getProject, toSummary } from '#lib/content';
	import Tag from '#lib/commonComponents/Tag.svelte';
	import type { PageData } from './$types';
	import PostThumbnail from '../../posts/PostThumbnail.svelte';
	let { data }: { data: PageData } = $props();
	const project = $derived(getProject(data.slug));
	const Content = $derived(project?.component);
	const posts = $derived(getPostsForProject(data.slug).map(toSummary));
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="container">
	<div class="project">
		<div class="heading">
			<h1 class="sixtyfour">{data.title}</h1>
			<h3>
				{'Published: ' + data.date}
			</h3>
		</div>
		<div class="content">
			<div>
				<div class="image-placeholder">{data.title.slice(0, 1)}</div>
				<div class="tags">
					Tags:
					{#each data.tags as tag (tag)}
						<Tag tagName={tag} />
					{/each}
					{#if data.github}
						<a href={'#' + data.github} aria-label="Github"><i class="fa-brands fa-github"></i></a>
					{/if}
				</div>
			</div>
			<div class="info">
				<p class="description">{data.description}</p>
				{#if Content}
					<div class="project-body"><Content /></div>
				{/if}
				{#if posts.length > 0}
					<div class="articles">
						<h2>Posts About Project:</h2>
						<div class="scroll-container">
							<div class="thumbnail-container">
								{#each posts as post (post.slug)}
									<PostThumbnail {post} />
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
		margin-right: 1em;
		word-wrap: break-word;
	}
	.scroll-container {
		overflow: auto;
		max-height: 40vh;
		/* max-height: 50%; */
	}
	.thumbnail-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 1em;
		max-width: 100%;
	}
	.articles {
		padding-top: 0.5em;
		background-color: var(--accent-color-tertiary);
		margin-right: 1em;
		border-radius: 5px;
		margin-bottom: 1em;
		padding-bottom: 0.25em;
	}
	.articles h2 {
		margin-left: 1em;
		margin-top: 0;
		margin-bottom: 0;
	}
	img {
		margin: 1em;
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
		position: relative;
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
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 1em;
		margin-left: 5em;
		max-width: 100%;
	}
	.tags a {
		margin-left: 2em;
		font-size: xx-large;
	}
	@media screen and (max-width: 800px) {
		.heading {
			flex-direction: column;
			max-width: 95%;
			/* margin-left: 1em; */
			padding: 0;
		}
		.heading h1 {
			margin-left: 0;
		}
		.content {
			flex-direction: column;
		}
		.tags {
			flex-wrap: wrap;
			max-width: 100%;
			margin-left: 1em;
		}
		.content {
			max-width: 100%;
		}
		img {
			max-width: 100%;
			margin: 0;
		}
		.info {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding-left: 1em;
		}
		.articles {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.articles h2 {
			margin: 0;
		}
	}
</style>

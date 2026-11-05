<script lang="ts">
	import type { ContentSummary } from '#lib/content';
	import { resolve } from '$app/paths';
	import Tag from '#lib/commonComponents/Tag.svelte';
	import { resolveImage } from '#lib/utils/images';

	let {
		post,
		tagsOther = [],
		search = '',
		pageSize = '',
		page = ''
	}: {
		post: ContentSummary;
		tagsOther?: string[];
		search?: string;
		pageSize?: string;
		page?: string;
	} = $props();

	const tags = $derived(post.tags || []);
	const banner = $derived(resolveImage(post.banner));
</script>

<div class="post-thumbnail-link">
	<a
		class="post-thumbnail-card-link"
		href={resolve('/posts/[slug]', { slug: post.slug })}
		aria-label={post.title}
	/>
	<div class="post-thumbnail">
		<div class="post-thumbnail-header">
			<h1>{post.title}</h1>
			<h4>{post.date}</h4>
		</div>
		<div class="post-thumbnail-content">
			<div class="post-thumbnail-image">
				{#if banner}
					<enhanced:img src={banner} alt="" loading="lazy" />
				{:else}
					<span>{post.title.slice(0, 1)}</span>
				{/if}
			</div>
			<div class="post-thumbnail-text">
				<p>{post.description}</p>
				{#if tags.length > 0}
					<div class="post-thumbnail-tags">
						Tags:
						{#each tags as tag (tag)}
							<Tag tagName={tag || ''} {page} {pageSize} {search} {tagsOther} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.post-thumbnail {
		background-color: var(--tertiary-bg);
		border-radius: 10px;
		transition:
			box-shadow 0.3s,
			background-color 0.3s;
		padding: 0.5em;
		width: 100%;
	}

	.post-thumbnail:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.post-thumbnail-link {
		position: relative;
		margin-top: 1em;
		width: 95%;
		display: flex;
	}

	.post-thumbnail-card-link {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.post-thumbnail {
		position: relative;
		z-index: 1;
		width: 100%;
		pointer-events: none;
	}

	.post-thumbnail-tags {
		position: relative;
		z-index: 2;
		pointer-events: auto;
	}

	.post-thumbnail-card-link {
		margin-top: 1em;
		text-decoration: none;
		color: inherit;
	}

	.post-thumbnail-header h1 {
		margin-left: 1em;
		color: var(--accent-color-primary);
	}
	.post-thumbnail-header h4 {
		margin-right: 1em;
		color: var(--accent-color-tertiary);
	}
	.post-thumbnail-header {
		display: flex;
		justify-content: space-between;
		justify-items: center;
	}

	.post-thumbnail-image {
		width: 234px;
		height: 156px;
		flex: 0 0 auto;
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--secondary-bg);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.post-thumbnail-image span {
		font-size: 4em;
		font-weight: bold;
		color: var(--accent-color-primary);
	}

	.post-thumbnail-image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.post-thumbnail-content {
		display: flex;
		flex-direction: row;
		padding: 1em;
	}

	.post-thumbnail-text {
		margin-left: 1em;
	}

	.post-thumbnail-content p {
		font-size: large;
		font-style: italic;
		color: var(--text-color-muted);
	}

	.post-thumbnail-tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}
	@media screen and (max-width: 800px) {
		.post-thumbnail-content {
			flex-direction: column;
			align-items: center;
		}
		.post-thumbnail-header {
			flex-direction: column;
			align-items: center;
		}
		.post-thumbnail-header h1 {
			margin: 0px;
		}
		.post-thumbnail-header h4 {
			margin: 0px;
		}
		.post-thumbnail-link {
			max-width: 95vw;
			margin-left: 1em;
			margin-right: 1em;
		}
	}
</style>

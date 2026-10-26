<script lang="ts">
	import type { ContentSummary } from '#lib/content';
	import { resolve } from '$app/paths';
	import Tag from '#lib/commonComponents/Tag.svelte';

	let {
		project,
		tagsOther = [],
		search = '',
		pageSize = '',
		page = ''
	}: {
		project: ContentSummary;
		tagsOther?: string[];
		search?: string;
		pageSize?: string;
		page?: string;
	} = $props();

	const tags = $derived(project.tags || []);
</script>

<div class="project-thumbnail-link">
	<a
		class="project-thumbnail-card-link"
		href={resolve('/projects/[slug]', { slug: project.slug })}
		aria-label={project.title}
	/>
	<div class="project-thumbnail">
		<div class="project-thumbnail-header">
			<h1>{project.title}</h1>
			<h4>{project.date}</h4>
		</div>
		<div class="project-thumbnail-content">
			<div class="project-thumbnail-image">
				<span>{project.title.slice(0, 1)}</span>
			</div>
			<div class="project-thumbnail-text">
				<p>{project.description}</p>
				{#if tags.length > 0}
					<div class="project-thumbnail-tags">
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
	.project-thumbnail {
		background-color: var(--tertiary-bg);
		border-radius: 10px;
		transition:
			box-shadow 0.3s,
			background-color 0.3s;
		padding: 0.5em;
		width: 100%;
	}

	.project-thumbnail:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.project-thumbnail-link {
		position: relative;
		margin-top: 1em;
		width: 95%;
		display: flex;
	}

	.project-thumbnail-card-link {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.project-thumbnail {
		position: relative;
		z-index: 1;
		width: 100%;
		pointer-events: none;
	}

	.project-thumbnail-tags {
		position: relative;
		z-index: 2;
		pointer-events: auto;
	}

	.project-thumbnail-card-link {
		margin-top: 1em;
		text-decoration: none;
		color: inherit;
	}

	.project-thumbnail-header h1 {
		margin-left: 1em;
		color: var(--accent-color-primary);
	}
	.project-thumbnail-header h4 {
		margin-right: 1em;
		color: var(--accent-color-tertiary);
	}
	.project-thumbnail-header {
		display: flex;
		justify-content: space-between;
		justify-items: center;
	}

	.project-thumbnail-image {
		width: 234px;
		height: 156px;
	}

	.project-thumbnail-content {
		display: flex;
		flex-direction: row;
		padding: 1em;
	}

	.project-thumbnail-text {
		margin-left: 1em;
	}

	.project-thumbnail-content p {
		font-size: large;
		font-style: italic;
		color: var(--text-color-muted);
	}

	.project-thumbnail-tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	@media screen and (max-width: 800px) {
		.project-thumbnail-content {
			flex-direction: column;
			align-items: center;
		}
		.project-thumbnail-header {
			flex-direction: column;
			align-items: center;
		}
		.project-thumbnail-header h1 {
			margin: 0px;
		}
		.project-thumbnail-header h4 {
			margin: 0px;
		}
		.project-thumbnail-link {
			max-width: 95vw;
			margin-left: 1em;
			margin-right: 1em;
		}
	}
</style>

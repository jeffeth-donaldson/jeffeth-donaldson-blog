<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import type { ContentSummary } from '#lib/content';
	import ProjectThumbnail from './ProjectThumbnail.svelte';
	import { generateQueryString } from '#lib/client/functions';
	import Paginator from './Paginator.svelte';
	let { data }: { data: PageData } = $props();
	const projects = $derived((data.projects ?? []) as ContentSummary[]);
	const tags = $derived([...new Set(data.tags || [])]);
	const search = $derived(data.search || '');
	const pageSize = $derived(data.pageSize || '');
	const pageCount = $derived(data.pageCount?.toString() || '1');
	const page = $derived(data.page || '1');

	const queryPopTag = (tag: string) => {
		const updatedTags = tags.filter((item) => item !== tag);
		return generateQueryString(pageSize, updatedTags, search, page);
	};

	const queryPopSearch = () => {
		return generateQueryString(pageSize, tags, '', page);
	};

	let searchText = $state('');
</script>

<h1>Projects</h1>
<div class="search-bar">
	<h2 class="search-label">Search</h2>
	<div class="search-items">
		{#each tags as tag (tag)}
			{#if tag}
				<div class="search-item">
					<a data-sveltekit-reload href={resolve(('/projects' + queryPopTag(tag)) as never)}
						><i class="fa-solid fa-x" /></a
					>
					<div>tag:{tag}</div>
				</div>
			{/if}
		{/each}
		{#if search}
			<div class="search-item">
				<a data-sveltekit-reload href={resolve(('/projects' + queryPopSearch()) as never)}
					><i class="fa-solid fa-x" /></a
				>
				<div>"{search}"</div>
			</div>
		{/if}
	</div>
	{#if search || tags.length > 0}
		<p>{data.projectCount} results</p>
	{/if}
	<div class="input">
		<form action="/projects" data-sveltekit-reload>
			<input type="text" class="invisible" name="tags" value={tags.join(',')} />
			<input type="search" name="search" bind:value={searchText} placeholder="Search..." />
			<button type="submit"><i class="fa-solid fa-magnifying-glass" /></button>
		</form>
	</div>
</div>
<div class="projects-box">
	{#each projects as project (project.slug)}
		<ProjectThumbnail {project} tagsOther={tags} {page} {pageSize} {search} />
	{/each}
	<Paginator {tags} {search} {pageSize} {pageCount} {page} />
</div>

<style>
	.projects-box {
		display: flex;
		flex-direction: column;
		background-color: var(--secondary-bg);
		min-width: 100%;
		padding: 0.2em;
		min-height: 100vh;
		height: fit-content;
		align-items: center;
	}
	.search-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 80%;
	}
	.input {
		display: flex;
		align-items: center;
		background-color: var(--tertiary-bg);
		height: fit-content;
		border: none;
		border-radius: 5px; /* Rounded corners */
	}
	.input input {
		background-color: var(--tertiary-bg);
		height: fit-content;
		border: none;
		border-radius: 5px; /* Rounded corners */
		outline: none; /* Remove default outline */
		color: var(--text-color);
		font-size: large;
		padding: 0.2em;
	}
	.input button {
		padding: 5px;
		background-color: var(--accent-color-secondary);
		border: none;
		border-radius: 5px; /* Rounded corners */
		cursor: pointer;
	}
	.input button:hover {
		background-color: var(--accent-color-yes);
	}
	.search-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-decoration: none;
		color: var(--text-color);
		background-color: var(--tertiary-bg);
		border-radius: 5px;
		padding: 0.3em;
	}
	.search-items {
		display: flex;
		flex-direction: row;
	}
	.search-item {
		margin-right: 0.5em;
	}
	.search-item div {
		margin-left: 0.5em;
	}
	.search-item a {
		text-decoration: none;
		color: var(--text-color);
	}
	.invisible {
		display: none;
	}

	/* Mobile site */
	@media screen and (max-width: 800px) {
		.search-bar {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
			justify-items: center;
			min-width: 80%;
			flex-wrap: wrap-reverse;
			margin-bottom: 1em;
		}

		.search-label {
			display: none;
		}
		.input {
			width: 100%;
			align-content: space-between;
		}
		form {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		form input {
			width: 100%;
		}
	}
</style>

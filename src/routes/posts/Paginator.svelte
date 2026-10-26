<script lang="ts">
	import { resolve } from '$app/paths';
	import { generateQueryString } from '$lib/client/functions';

	export let tags: string[] = [];
	export let search = '';
	export let pageSize: string;
	export let pageCount: string;
	export let page: string;
	const pageNum = parseInt(page);
	const pageCountNum = parseInt(pageCount);
</script>

<div class="paginator">
	{#if pageNum > 1}
		<a
			href={resolve(('/posts' + generateQueryString(pageSize, tags, search, '1')) as never)}
			data-sveltekit-reload
		>
			<i class="fa-solid fa-angles-left" />
		</a>
		<a
			href={resolve(
				('/posts' + generateQueryString(pageSize, tags, search, `${pageNum - 1}`)) as never
			)}
			data-sveltekit-reload
		>
			<i class="fa-solid fa-angle-left" />
		</a>
		<a
			href={resolve(
				('/posts' + generateQueryString(pageSize, tags, search, `${pageNum - 1}`)) as never
			)}
			data-sveltekit-reload
		>
			{pageNum - 1}
		</a>
	{/if}
	<p>{pageNum}</p>
	{#if pageNum + 1 <= pageCountNum}
		<a
			href={resolve(
				('/posts' + generateQueryString(pageSize, tags, search, `${pageNum + 1}`)) as never
			)}
			data-sveltekit-reload
		>
			{pageNum + 1}
		</a>
		<a
			href={resolve(
				('/posts' + generateQueryString(pageSize, tags, search, `${pageNum + 1}`)) as never
			)}
			data-sveltekit-reload
		>
			<i class="fa-solid fa-angle-right" />
		</a>
		<a
			href={resolve(('/posts' + generateQueryString(pageSize, tags, search, pageCount)) as never)}
			data-sveltekit-reload
		>
			<i class="fa-solid fa-angles-right" />
		</a>
	{/if}
</div>

<style>
	.paginator {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		align-items: baseline;
		padding-top: 2em;
	}

	.paginator * {
		font-size: large;
		text-decoration: none;
		color: var(--text-color);
		margin: 0.2em;
	}

	.paginator p {
		color: var(--accent-color-primary);
	}
</style>

<script lang="ts">
	import { generateQueryString } from '#lib/client/functions';

	let {
		tagName,
		tagsOther = [],
		search = '',
		pageSize = '',
		page = ''
	}: {
		tagName: string;
		tagsOther?: string[];
		search?: string;
		pageSize?: string;
		page?: string;
	} = $props();

	const tags = $derived([...new Set([tagName, ...tagsOther])]);
	const query = $derived(generateQueryString(pageSize, tags, search, page));
</script>

<div class="post-thumbnail-tag">
	<a href={'#/posts' + query} data-sveltekit-reload>
		{tagName}
	</a>
</div>

<style>
	.post-thumbnail-tag {
		background-color: var(--accent-color-tertiary);
		margin-left: 0.5em;
		padding: 3px;
		border-radius: 5px;
	}

	.post-thumbnail-tag a {
		text-decoration: none;
		color: var(--text-color);
	}
</style>

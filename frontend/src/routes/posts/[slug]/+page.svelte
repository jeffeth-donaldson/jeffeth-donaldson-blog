<script lang="ts">
	/** @type {import('./$types').PageData} */
	// @ts-ignore
	import PostBody from './PostBody.svelte';
	export let data;
	const body = data.post?.Body as richTextBlock;
    console.log(data.post?.Body)
</script>
<div class="post">
	<h1>{data.post?.Title}</h1>
	<PostBody content={body}/>
</div>

<style>
	.post {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* min-height: 100%; Ensure the post takes at least the full height of the viewport */
		border-radius: 8px;
		background-color: var(--secondary-bg);
		min-width: 65%;
		max-width: 95%;
	}
	.post h1 {
		color: var(--accent-color-primary)
	}
</style>
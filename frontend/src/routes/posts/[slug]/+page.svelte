<script lang="ts">
	/** @type {import('./$types').PageData} */
	// @ts-ignore
	import PostBody from './PostBody.svelte';
	export let data;
	const body = data.post?.Body as richTextBlock;
    console.log(data.post?.Body)
</script>

<h1>{data.post?.Title}</h1>

<!-- <p>{data.post?.Body}</p> -->
<PostBody content={body}/>
<!-- <div>{@html data.post.body}</div> -->
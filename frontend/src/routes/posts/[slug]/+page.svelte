<script>
	/** @type {import('./$types').PageData} */
	export let data;
    console.log(data)
</script>

<h1>{data.post?.Title}</h1>

<p>{data.post?.Body[0]}</p>
<!-- <div>{@html data.post.body}</div> -->
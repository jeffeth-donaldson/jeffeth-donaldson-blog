<script lang="ts">
	import { generateQueryString } from "$lib/client/functions";

    export let tagName:string;
    export let tagsOther:string[]=[];
    export let search="";
    export let pageSize="";
    export let page="";

    let tags = [tagName, ...tagsOther];
    tags = [...new Set(tags)];
    const url = "/posts"+generateQueryString(pageSize, tags, search, page)
</script>

<div class="post-thumbnail-tag">
    <a href={url} data-sveltekit-reload>
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
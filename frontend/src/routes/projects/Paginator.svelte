<script lang="ts">
	import { generateQueryString } from "$lib/client/functions";

    export let tags:string[]=[];
    export let search="";
    export let pageSize:string;
    export let pageCount:string;
    export let page:string;
    const pageNum = parseInt(page);
    const pageCountNum = parseInt(pageCount);


    const url = "/posts"
</script>

<div class="paginator">
    {#if pageNum > 1}
    <a href={url+generateQueryString(pageSize, tags, search, "1")} data-sveltekit-reload>
        <i class="fa-solid fa-angles-left"></i>
    </a>
    <a href={url+generateQueryString(pageSize, tags, search, `${pageNum-1}`)} data-sveltekit-reload>
        <i class="fa-solid fa-angle-left"></i>
    </a>
    <a href={url+generateQueryString(pageSize, tags, search, `${pageNum-1}`)} data-sveltekit-reload>
        {pageNum-1}
    </a>
    {/if}
    <p>{pageNum}</p>
    {#if pageNum+1 <= pageCountNum}
    <a href={url+generateQueryString(pageSize, tags, search, `${pageNum+1}`)} data-sveltekit-reload>
        {pageNum+1}
    </a>
    <a href={url+generateQueryString(pageSize, tags, search, `${pageNum+1}`)} data-sveltekit-reload>
        <i class="fa-solid fa-angle-right"></i>
    </a>
    <a href={url+generateQueryString(pageSize, tags, search, pageCount)} data-sveltekit-reload>
        <i class="fa-solid fa-angles-right"></i>
    </a>
    {/if}
</div>

<style>
    .paginator {
        display:flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        align-items:baseline;
        padding-top: 2em;
    }

    .paginator * {
        font-size: large;
        text-decoration: none;
        color: var(--text-color);
        margin:0.2em;
    }

    .paginator p {
        color: var(--accent-color-primary)
    }
</style>
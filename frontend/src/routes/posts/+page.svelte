<script lang="ts">
import type { PageData } from "./$types";
import type { APIResponseData } from "$lib/types/types";
import PostThumbnail from "./PostThumbnail.svelte";
	import { generateQueryString } from "$lib/client/functions";
export let data:PageData;
let posts:APIResponseData<"api::blog-post.blog-post">[];

if (data.posts == undefined) {
    posts = [];
} else {
    posts = data.posts;
}

let tags = data.tags || [];
tags = [...new Set(tags)];
let search = data.search||"";
let pageSize = data.pageSize||"";
let page = data.page||"1";

const queryPopTag = (tag:string) => {
    const updatedTags = tags.filter(item => item !== tag);
    return generateQueryString(pageSize, updatedTags, search, page)
}

const queryPopSearch = () => {
    return generateQueryString(pageSize, tags, "", page)
}

let searchText = '';

</script>

<h1>Posts</h1>
<div class="search-bar">
    <h2>Search</h2>
    <div class="search-items">
    {#each tags as tag}
        <div class="search-item">
            <a data-sveltekit-reload href={"/posts"+queryPopTag(tag)}><i class="fa-solid fa-x"></i></a>
            <div>tag:{tag}</div>
        </div>
    {/each}
    {#if search}
        <div class="search-item">
            <a data-sveltekit-reload href={"/posts"+queryPopSearch()}><i class="fa-solid fa-x"></i></a>
            <div>"{search}"</div>
        </div>
    {/if}
    </div>
    <div class="input">
        <form action="/posts" data-sveltekit-reload>
            <input type="text" class="invisible" name="tags" value={tags.join(',')}/>
            <input type="search" name="search" bind:value={searchText} placeholder="Search..." />
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>
</div>
<div class="posts-box">
    {#each posts as post}
        <PostThumbnail 
            post={post}
            tagsOther={tags}
            page={page}
            pageSize={pageSize}
            search={search}
        />
    {/each}
</div>

<style>
    .posts-box {
        display: flex;
        flex-direction: column;
        background-color: var(--secondary-bg);
        min-width: 100%;
        padding: 0.2em;
        min-height: 100vh;
        height: fit-content;
        align-items:center;
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
        height:fit-content;
        border: none;
        border-radius: 5px; /* Rounded corners */
    }
    .input input {
        background-color: var(--tertiary-bg);
        height:fit-content;
        border: none;
        border-radius: 5px; /* Rounded corners */
        outline: none; /* Remove default outline */
        color: var(--text-color);
        font-size:large;
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
        display:flex;
        flex-direction:row;
        align-items:center;
        text-decoration: none;
        color: var(--text-color);
        background-color: var(--tertiary-bg);
        border-radius: 5px;
        padding:0.3em;
    }
    .search-items {
        display:flex;
        flex-direction: row;
    }
    .search-item {
        margin-right: 0.5em;
    }
    .search-item div{
        margin-left: 0.5em;
    }
    .search-item a {
        text-decoration: none;
        color: var(--text-color);
    }
    .invisible {
        display: none;
    }
</style>
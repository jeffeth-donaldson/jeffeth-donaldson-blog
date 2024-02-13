<script lang="ts">
import type { PageData } from "./$types";
import type { APIResponseData } from "$lib/types/types";
import PostThumbnail from "./PostThumbnail.svelte";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
export let data:PageData;
let posts:APIResponseData<"api::blog-post.blog-post">[];

if (data.posts == undefined) {
    posts = [];
} else {
    posts = data.posts;
}

let searchText = '';
let currentSearchTerm="";
let onSubmit = async () => {
      let currentSearchTerm = ''

      if (browser) {
        const urlParams = new URLSearchParams(window.location.search)
        currentSearchTerm = urlParams.get('search') || ""
      }

      if (searchText.trim() == currentSearchTerm?.trim())
        return

      await goto(`/posts?search=${encodeURIComponent(searchText.trim())}`, {
        keepFocus: true,
      })
    }
console.log(posts.length)
</script>

<h1>Posts</h1>
<div class="search-bar">
    <h2>Search</h2>
    <div class="input">
        <form action="/posts" data-sveltekit-reload>
            <input type="search" name="search" bind:value={searchText} placeholder="Search..." />
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>
</div>
<div class="posts-box">
    {#each posts as post}
        <PostThumbnail post={post} />
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
</style>
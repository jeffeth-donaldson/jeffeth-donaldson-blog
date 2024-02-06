<script>
    export let data;
    // TODO: Create post tile component to display information about the post
    let searchText = '';

    function handleSearch() {
    // You can perform your search logic here
    console.log('Searching for:', searchText);
    }

</script>

<h1>Posts</h1>
<div class="search-bar">
    <h2>Search</h2>
    <div class="input">
        <input type="text" bind:value={searchText} placeholder="Search..." />
        <button on:click={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
</div>
<div class="posts-box">

</div>

<style>
    .posts-box {
        background-color: var(--accent-color-secondary);
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
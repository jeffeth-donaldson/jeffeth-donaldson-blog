<script lang="ts">
	import { onMount } from "svelte";
	import { HighlightAuto } from "svelte-highlight";
    import { monokai } from "svelte-highlight/styles";
    

    export let code:string;

    let colorScheme = "light"
    
    let buttonClass = "";

    const copyCode = async () => {
        buttonClass = 'clicked';
        setTimeout(function () {
            buttonClass = '';
        }, 400);
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(code);
        }
    }

    // Only can do this when the page loads
    // Sets an event listener to watch user color preference
    // If dark, will set color scheme to dark
    // Used for changing highlight theme
    onMount(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            colorScheme = "dark"
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        colorScheme = event.matches ? "dark" : "light";
        });
    });
</script>
<div class="code-block-container">
    <div class="code-block">
        <div class="banner">
            <button on:click={copyCode} class={buttonClass}>
                {#if buttonClass == "clicked"}
                Copied!
                {:else}
                Copy Code
                {/if}
            </button>
        </div>
        <HighlightAuto code={code}/>
    </div>
</div>

<svelte:head>
    {#if colorScheme == "dark"}
    {@html monokai}
    {/if}
</svelte:head>

<style>
    .code-block-container {
        display:flex;
        flex-direction: row;
        justify-content: center;
        width:100%;
        
    }
    .code-block {
        flex-grow: 1;
        background-color: var(--secondary-bg);
        display:flex;
        flex-direction: column;
        padding: 0.5em;
        border-radius: 20px;
        max-width: 60em;
    }

    .banner {
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .banner button {
        border-radius: 20px; /* Adjust the value to change the roundness */
        padding: 5px 10px;
        background-color: var(--accent-color-no);
        color: var(--text-color);
        border: none;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 13px;
        margin: 4px 2px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .clicked {
        transform: scale(0.95); /* Scale down the button slightly */
    }
    @media screen and (max-width: 800px) {
        .code-block {
            max-width: 85vw;
        }
    }
</style>
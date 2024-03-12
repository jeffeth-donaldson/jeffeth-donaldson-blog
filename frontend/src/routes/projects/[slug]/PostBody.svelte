<script lang="ts">
    import type { richTextBlock } from "$lib/types/richTextBlock";
    import RichTextBlock from './RichTextBlock.svelte';
    export let content:richTextBlock[];

</script>

<style lang="postcss">
    .post-body {
        background-color: var(--tertiary-bg);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background 0.3s;
        width: 95%;
        font-size: 1.1em;
    }

    :global(.post-body h1) {
        color: var(--accent-color-secondary)
    }

    :global(.post-body h2, h3, h4, h5, h6) {
        color: var(--accent-color-tertiary)
    }

    :global(.post-body .image) {
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
        width: 100%;
    }

    :global(.post-body .rich-text-quote) {
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
    }
    
    :global(.post-body .rich-text-quote div) {
        background-color: var(--secondary-bg);
        max-width: 75%;
        border-left: 4px solid var(--accent-color-primary); /* Left border color (adjust as needed) */
        padding: 15px; /* Padding inside the quote div */
        margin: 15px 0; /* Margin around the quote div */
        font-style: italic; /* Italicize the text for a quote effect */
    }

</style>

<!-- <div class="post-body" contenteditable="false" bind:innerHTML={res}></div> -->

<div class="post-body">
    {#each content as block}
    <RichTextBlock block={block}/>
    {/each}
</div>
<script lang="ts">
    import { Highlight } from "svelte-highlight";
    import { typescript, java, c, csharp, python, javascript, xml } from "svelte-highlight/languages";
    import type { richTextBlock, imageBlock, linkBlock, headingBlock, listBlock, textBlock } from "$lib/types/richTextBlock";
	import { children } from "svelte/internal";

    export let block:richTextBlock;
    let image:imageBlock;
    let link:linkBlock;
    let heading:headingBlock;
    let myList:listBlock;
    let text:textBlock;

    switch (block.type) {
                case "image":
                    image = block as imageBlock;
                    break;
                case "link":
                    link = block as linkBlock;
                    break;
                case "paragraph":
                    break;
                case "quote":
                    break;
                case "heading":
                    heading = block as headingBlock;
                    break;
                case "list":
                    myList = block as listBlock;
                    break;
                case "text":
                    text = block as textBlock;
                    break;
                case "list-item":
                    break;
                case "code":
                    break;
                default:
                    console.log(block.type)
                    console.log(block)
                    break;
            }
</script>

{#if block.type == "image"}
    <div class='image'>
        <img src={image.image.url} alt={image.image.alternativeText}>
        <p>{image.image.caption ? image.image.caption : ''}</p>
    </div>
{:else if block.type == "link"}
    <a href={link.url}>
    {#each link.children as child}
        <svelte:self block={child}/>
    {/each}
    </a>
{/if}
<script lang="ts">
    import type { richTextBlock, imageBlock, linkBlock, headingBlock, listBlock, textBlock } from "$lib/types/richTextBlock";
	import CodeBlock from "./CodeBlock.svelte";

    export let block:richTextBlock;
    let image:imageBlock;
    let link:linkBlock;
    let heading:headingBlock;
    let myList:listBlock;
    let text:textBlock;
    let code:String;

    if (block.type === "image") {
        image = block as imageBlock;
    } else if (block.type === "link") {
        link = block as linkBlock;
    } else if (block.type === "heading") {
        heading = block as headingBlock;
    } else if (block.type === "list") {
        myList = block as listBlock;
    } else if (block.type === "text") {
        text = block as textBlock;
    } else if (block.type === "code") {
        let codeBodyBlock = block.children[0] as textBlock;
        code = codeBodyBlock.text;
    } else if (block.type === "paragraph" || block.type === "quote" || block.type === "list-item") {
        // Do nothing for these block types
    } else {
        console.log(block.type);
        console.log(block);
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
{:else if block.type == "paragraph"}
    <p>
        {#each block.children as child}
            <svelte:self block={child}/>
        {/each}
    </p>
{:else if block.type == "quote"}
    <div class='rich-text-quote'>
        {#each block.children as child}
        <div><svelte:self block={child}/></div>
        {/each}
    </div>
{:else if block.type == "heading"}
    <svelte:element this={"h"+heading.level}>
        {#each heading.children as child}
        <svelte:self block={child}/>
        {/each}
    </svelte:element>
{:else if block.type == "list"}
    {#if myList.format == 'ordered'}
        <ol>
            {#each myList.children as child}
            <svelte:self block={child}/>
            {/each}
        </ol>
    {:else}
        <ul>
            {#each myList.children as child}
            <svelte:self block={child}/>
            {/each}
        </ul>
    {/if}
{:else if block.type == "text"}
    {#if text.bold}
        <b>{text.text}</b>
    {:else if text.italic}
        <i>{text.text}</i>
    {:else if text.underline}
        <u>{text.text}</u>
    {:else if text.strikethrough}
        <s>{text.text}</s>
    {:else if text.code}
        <code>{text.text}</code>
    {:else}
        {text.text}
    {/if}
{:else if block.type == "list-item"}
    <li>
        {#each block.children as child}
        <svelte:self block={child}/>
        {/each}
    </li>
{:else if block.type == "code"}
    <CodeBlock code={code}/>
{/if}
<script lang="ts">
    import type { richTextBlock, imageBlock, linkBlock, headingBlock, listBlock, textBlock } from "$lib/types/richTextBlock";
    import RichTextBlock from './RichTextBlock.svelte';
    export let content:richTextBlock[];



    function renderRichText(blocks:richTextBlock[]) {
        let res = "";
        let symbol:string;
        blocks.forEach(block => {
            switch (block.type) {
                case "image":
                    const image = block as imageBlock;
                    res+=`
                    <div class='image'>
                    <img src=${image.image.url} alt=${image.image.alternativeText}>
                    <p>${image.image.caption ? image.image.caption : ''}</p>
                    </div>
                    `;
                    break;
                case "link":
                    const link = block as linkBlock;
                    res+=`<a href='${link.url}'>${renderRichText(link.children)}</a>\n`
                    break;
                case "paragraph":
                    res+=`<p>\n${renderRichText(block.children)}</p>\n`;
                    break;
                case "quote":
                    res+=`<div class='rich-text-quote'><div>\n${renderRichText(block.children)}</div></div>\n`;
                    break;
                case "heading":
                    const heading = block as headingBlock;
                    res+=`<h${heading.level}>\n${renderRichText(block.children)}</h${heading.level}>\n`
                    break;
                case "list":
                    symbol = "";
                    const myList = block as listBlock;
                    if (myList.format == 'ordered') {
                        symbol = "ol"
                    } else {
                        symbol = "ul"
                    }
                    res+=`<${symbol}>\n${renderRichText(myList.children)}</${symbol}>\n`
                    break;
                case "text":
                    symbol = "";
                    const text = block as textBlock;
                    if (text.bold) {
                        symbol = "b"
                    } else if (text.italic) {
                        symbol = "i"
                    } else if (text.underline) {
                        symbol = "u"
                    } else if (text.strikethrough) {
                        symbol = "s"
                    } else if (text.code) {
                        symbol = "code"
                    }
                    if (symbol != "") {
                        res += `<${symbol}>${text.text}</${symbol}>`
                    } else {
                        res += text.text
                    }
                    break;
                case "list-item":
                    res+= `<li>${renderRichText(block.children)}</li>\n`
                    break;
                case "code":
                    console.log(block.children)
                    res+= `<Highlight language={xml} code=${renderRichText(block.children)}/>`
                    break;
                default:
                    console.log(block.type)
                    console.log(block)
                    break;
            }
        });
        return res
    }

    let res = "";
    res += renderRichText(content);

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
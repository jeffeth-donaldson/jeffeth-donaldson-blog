<script lang="ts">
    interface richTextBlock {
        type:"image" | "link" | "paragraph" | "quote" | "heading" | "list" | "text" | "list-item",
        children:any[]
    }
    interface paragraphBlock extends richTextBlock {
        type:"paragraph",
    }
    interface textBlock extends richTextBlock {
        type:'text',
        text:string,
        bold?:boolean,
        italic?:boolean,
        underline?:boolean,
        strikethrough?:boolean
        code?:boolean
    }
    interface imageBlock extends richTextBlock {
        type:'image',
        image: {
            name: string,
            alternativeText: string,
            url: string,
            caption:string,
            width: number,
            height: number,
            formats: any[],
            hash: string,
            ext: string,
            mime: string,
            size: number,
            previewUrl: string|null,
            provider: string,
            provider_metadata: any|null,
            createdAt: string,
            updatedAt: string
        }
    }
    interface headingBlock extends richTextBlock {
        type:'heading',
        level: number
    }
    interface listBlock extends richTextBlock {
        type:'list',
        format:'ordered'|'unordered'
    }
    interface linkBlock extends richTextBlock {
        type:'link',
        url:string
    }
    export let content:richTextBlock[];
    console.log(content[0].children)

    function renderRichText(blocks:richTextBlock[]) {
        let res = "";
        let symbol:string;
        blocks.forEach(block => {
            switch (block.type) {
                case "image":
                    const image = block as imageBlock;
                    res+=`<img src=${image.image.url} alt=${image.image.alternativeText}>`;
                    break;
                case "link":
                    const link = block as linkBlock;
                    res+=`<a href='${link.url}'>${renderRichText(link.children)}</a>\n`
                    break;
                case "paragraph":
                    res+=`<p>\n${renderRichText(block.children)}</p>\n`;
                    break;
                case "quote":
                    res+=`<div class='rich-text-quote'>\n${renderRichText(block.children)}</div>\n`;
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
                default:
                    console.log(block.type)
                    console.log(block)
                    break;
            }
        });
        return res
    }

</script>

<style>
    .post-body h1 {
        @apply text-3xl font-bold;
    }

</style>

<div class="post-body">
    {@html renderRichText(content)}
</div>
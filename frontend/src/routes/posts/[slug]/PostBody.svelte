<script lang="ts">
    interface richTextBlock {
        type:"image" | "code" | "paragraph" | "quote" | "heading" | "list" | "text",
        children:any[]
    }
    interface paragraphBlock extends richTextBlock {
        type:"paragraph",
    }
    interface textBlock extends richTextBlock {
        type:'text',
        text:string
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
    export let content:richTextBlock[];
    console.log(content[0].children)

    function renderRichText(blocks:richTextBlock[]) {
        let res = "";

        blocks.forEach(block => {
            switch (block.type) {
                case "image":
                    const image = block as imageBlock;
                    res+=`<img src=${image.image.url} alt=${image.image.alternativeText}>`;
                    break;
                case "code":
                    break;
                case "paragraph":
                    res+=`<p>\n${renderRichText(block.children)}</p>\n`;
                    break;
                case "quote":
                    break;
                case "heading":
                    const heading = block as headingBlock;
                    res+=`<h${heading.level}>\n${renderRichText(block.children)}</h${heading.level}>\n`
                    break;
                case "list":
                    
                    break;
                case "text":
                    const text = block as textBlock;
                    res+=text.text
                    break;
                default:
                    break;
            }
        });
        return res
    }

</script>

<div>
    {@html renderRichText(content)}
</div>
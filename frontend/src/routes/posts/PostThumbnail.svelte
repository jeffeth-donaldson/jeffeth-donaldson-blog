<script lang="ts">
import type { APIResponseData } from "$lib/types/types";
import type { imageFormats, imageFormat, image } from "$lib/types/imageTypes";
import { strapi_url } from "$lib/client/constants"
import { formatTZDate } from "$lib/client/functions";
import type { richTextBlock, textBlock } from "$lib/types/richTextBlock";
import Tag from "$lib/commonComponents/Tag.svelte";

export let post:APIResponseData<"api::blog-post.blog-post">;
export let tagsOther:string[]=[];
export let search:string="";
export let pageSize:string="";
export let page:string="";

let cover_image = post.attributes.cover?.data?.attributes;
let cover_image_alt:string; 
let cover_image_url:string;

if (cover_image == undefined) {
    
} else {
    cover_image_alt=cover_image.alternativeText || "";
    let formats = cover_image.formats as unknown as imageFormats;
    cover_image_url=formats.thumbnail.url;
}

const getPostSummary = (blocks:richTextBlock[], summary="") => {
    blocks.forEach(element => {
        if (summary.length >= 280) {
            //console.log("return")
            return summary.slice(0,280).trimEnd()
        }
        if (element.type == "text") {
            let text = element as textBlock
            summary += text.text + " "
        } else if (element.children.length > 0) {
            summary = getPostSummary(element.children, summary+" ")
            //console.log(summary.length)
        }
    });
    return summary.slice(0,280).trimEnd();
}
// Get Post summary (first n characters in the post's content)
const postSummary = getPostSummary(post.attributes.Body as unknown as richTextBlock[])+"...";

// Get tags
const tags = post.attributes.tags?.split(',').sort() || []

</script>

<a href={"/posts/"+post.attributes.slug}>
<div class="post-thumbnail">
    <div class="post-thumbnail-header">
        <h1>{post.attributes.Title}</h1>
        <h4>{formatTZDate(post.attributes.updatedAt?.toLocaleString()||"")}</h4>
    </div>
    <div class="post-thumbnail-content">
        <div class="post-thumbnail-image">
            {#if cover_image_url}
            <img src={strapi_url + cover_image_url} alt={cover_image_alt} />
            {/if}
        </div>
        <div class="post-thumbnail-text">
            <p>{postSummary}</p>
            {#if tags.length > 0}
            <div class="post-thumbnail-tags">
                Tags: 
            {#each tags as tag}
                <Tag 
                    tagName={tag || ""}
                    page={page}
                    pageSize={pageSize}
                    search={search}
                    tagsOther={tagsOther}
                />
            {/each}
            </div>
            {/if}
        </div>
    </div>
</div>
</a>

<style>
    .post-thumbnail {
        background-color: var(--tertiary-bg);
        border-radius: 10px;
        transition: box-shadow 0.3s, background-color 0.3s;
        padding: 0.5em;
        width: 100%;
    }  
    
    .post-thumbnail:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    
    a {
        margin-top: 1em;
        text-decoration: none;
        color: inherit;
        width: 95%;
        display:flex;
    }

    .post-thumbnail-header h1 {
        margin-left: 1em;
        color: var(--accent-color-primary)
    }
    .post-thumbnail-header h4 {
        margin-right: 1em;
        color: var(--accent-color-tertiary)
    }
    .post-thumbnail-header {
        display:flex;
        justify-content: space-between;
        justify-items: center;
    }

    .post-thumbnail-image {
        width:234px;
        height:156px;
    }

    .post-thumbnail-content {
        display: flex;
        flex-direction: row;
        padding: 1em;
    }

    .post-thumbnail-text {
        margin-left: 1em;
    }

    .post-thumbnail-content p {
        font-size: large;
        font-style:italic;
        color: var(--text-color-muted);
    }

    .post-thumbnail-tags {
        display:flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    @media screen and (max-width: 800px) {
        .post-thumbnail-content {
            flex-direction: column;
            align-items: center;
        }
        .post-thumbnail-header {
            flex-direction: column;
            align-items: center;
        }
        .post-thumbnail-header h1 {
            margin:0px;
        }
        .post-thumbnail-header h4 {
            margin:0px;
        }
        a {
            max-width:95vw;
            margin-left:1em;
            margin-right:1em;
        }

    }
</style>
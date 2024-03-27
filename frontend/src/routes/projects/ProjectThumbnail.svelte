<script lang="ts">
import type { APIResponseData } from "$lib/types/types";
import type { imageFormats, imageFormat, image } from "$lib/types/imageTypes";
import { strapi_url } from "$lib/client/constants"
import { formatTZDate } from "$lib/client/functions";
import type { richTextBlock, textBlock } from "$lib/types/richTextBlock";
import Tag from "$lib/commonComponents/Tag.svelte";

export let project:APIResponseData<"api::project.project">;
export let tagsOther:string[]=[];
export let search:string="";
export let pageSize:string="";
export let page:string="";

let cover_image = project.attributes.icon?.data?.attributes;
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
// Get project summary (first n characters in the project's content)
const postSummary = project.attributes.description;

// Get tags
const tags = project.attributes.tags?.split(',').sort() || []

</script>

<a href={"/projects/"+project.attributes.slug}>
<div class="project-thumbnail">
    <div class="project-thumbnail-header">
        <h1>{project.attributes.name}</h1>
        <h4>{formatTZDate(project.attributes.updatedAt?.toLocaleString()||"")}</h4>
    </div>
    <div class="project-thumbnail-content">
        <div class="project-thumbnail-image">
            <img src={strapi_url + cover_image_url} alt={cover_image_alt} />
        </div>
        <div class="project-thumbnail-text">
            <p>{postSummary}</p>
            {#if tags.length > 0}
            <div class="project-thumbnail-tags">
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
    .project-thumbnail {
        background-color: var(--tertiary-bg);
        border-radius: 10px;
        transition: box-shadow 0.3s, background-color 0.3s;
        padding: 0.5em;
        width: 100%;
    }  
    
    .project-thumbnail:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    
    a {
        margin-top: 1em;
        text-decoration: none;
        color: inherit;
        width: 95%;
        display: flex;
    }

    .project-thumbnail-header h1 {
        margin-left: 1em;
        color: var(--accent-color-primary)
    }
    .project-thumbnail-header h4 {
        margin-right: 1em;
        color: var(--accent-color-tertiary)
    }
    .project-thumbnail-header {
        display:flex;
        justify-content: space-between;
        justify-items: center;
    }

    .project-thumbnail-image {
        width:234px;
        height:156px;
    }

    .project-thumbnail-content {
        display: flex;
        flex-direction: row;
        padding: 1em;
    }

    .project-thumbnail-text {
        margin-left: 1em;
    }

    .project-thumbnail-content p {
        font-size: large;
        font-style:italic;
        color: var(--text-color-muted);
    }

    .project-thumbnail-tags {
        display:flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 800px) {
        .project-thumbnail-content {
            flex-direction: column;
            align-items: center;
        }
        .project-thumbnail-header {
            flex-direction: column;
            align-items: center;
        }
        .project-thumbnail-header h1 {
            margin:0px;
        }
        .project-thumbnail-header h4 {
            margin:0px;
        }
        a {
            max-width:95vw;
            margin-left:1em;
            margin-right:1em;
        }
    }
</style>
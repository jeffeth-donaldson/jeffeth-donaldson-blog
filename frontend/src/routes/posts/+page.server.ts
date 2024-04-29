import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";
import { strapi_url } from '$lib/client/constants';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
    let tags:string[] = [];
    let tagsQuery = "";
    let search = "";
    let pageSize = "10";
    let page = "1";
    let sort = "Title:asc";
    for (const [key, value] of url.searchParams) {
        switch (key) {
            case "search":
                search = value;
                break;
            case "pagesize":
                pageSize = value;
                break;
            case "sort":
                sort = value;
                break;
            case "page":
                page = value;
                break;
            case "tags":
                tags = value.split(',');
                break;
            default:
                break;
        }
        if (tags.length > 0 ) {
            // console.log(tags)
            tagsQuery=""
            for (let i = 0; i < tags.length; i++) {
                tagsQuery += `&filters[$and][1][$or][${i}][tags][$containsi]=${tags[i]}`; 
            }
            // console.log(tagsQuery)
        }
    }
    const query = `api/blog-posts?sort[0]=${sort}&filters[$and][0][$or][0][slug][$containsi]=${search}&filters[$and][0][$or][1][Title][$containsi]=${search}&filters[$and][0][$or][2][Body][$containsi]=${search}${tagsQuery}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`
	const res = await fetch(`http://${strapi_url}/${query}`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    if (res.status < 300) {
        const item = await res.json() as APIResponseCollection<"api::blog-post.blog-post">;
        return { 
            posts:item.data,
            search:search,
            tags:tags,
            pageSize:pageSize,
            page:page,
            pageCount:item.meta.pagination.pageCount,
            postCount:item.meta.pagination.total
        };
    } else {
        error(404, 'Post Not found')
    }
}
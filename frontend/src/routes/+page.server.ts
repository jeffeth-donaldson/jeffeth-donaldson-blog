import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const pageSize = "3";
    const page = "1";
    const sort = "updatedAt:desc";

    const query = `api/blog-posts?sort[0]=${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`
	const res = await fetch(`http://localhost:1337/${query}`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    if (res.status < 300) {
        const item = await res.json() as APIResponseCollection<"api::blog-post.blog-post">;
        return { 
            posts:item.data,

        };
    } else {
        error(404, 'Post Not found')
    }
}
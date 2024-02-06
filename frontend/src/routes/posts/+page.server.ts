import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`http://localhost:1337/api/blog-posts?populate=*`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    if (res.status < 300) {
        const item = await res.json() as APIResponseCollection<"api::blog-post.blog-post">;
        return { post:item.data };
    } else {
        error(404, 'Post Not found')
    }
}
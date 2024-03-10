import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const query = `api/about?populate=*`
	const res = await fetch(`http://localhost:1337/${query}`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    if (res.status < 300) {
        // console.log(await res.json())
        const about = await res.json() as APIResponseCollection<"api::about.about">;
        return { 
            about:about.data,
        };
    } else {
        error(404, 'Post Not found')
    }
}
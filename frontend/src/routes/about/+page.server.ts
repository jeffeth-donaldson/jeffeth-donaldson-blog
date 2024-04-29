import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";
import { strapi_url } from '$lib/client/constants';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const query = `api/about?populate=*`
	const res = await fetch(`http://${strapi_url}/${query}`,
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
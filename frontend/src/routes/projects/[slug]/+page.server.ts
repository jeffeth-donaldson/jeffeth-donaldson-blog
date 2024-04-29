import { error } from '@sveltejs/kit';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";
import { strapi_url } from '$lib/client/constants';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`http://${strapi_url}/api/projects?filters[slug][$eq]=${params.slug}&populate=*`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    if (res.status < 300) {
        const item = await res.json() as APIResponseCollection<"api::project.project">;
        return { project:item.data[0].attributes };
    } else {
        error(404, 'Post Not found')
    }
}
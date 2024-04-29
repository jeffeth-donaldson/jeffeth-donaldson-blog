import { strapi_url } from '$lib/client/constants';
import { strapi_key } from '$lib/server/secrets.js';
import type { APIResponseCollection } from "$lib/types/types.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const pageSize = "3";
    const page = "1";
    const sort = "updatedAt:desc";

    const postQuery = `api/blog-posts?sort[0]=${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`
	const postRes = await fetch(`http://${strapi_url}/${postQuery}`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    let posts:APIResponseCollection<"api::blog-post.blog-post"> | undefined = undefined;
    if (postRes.status < 300) {
        posts = await postRes.json() as APIResponseCollection<"api::blog-post.blog-post">;
    }

    const projectQuery = `api/projects?sort[0]=${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`
	const projectRes = await fetch(`http://${strapi_url}/${projectQuery}`,
    {
        headers:{'Authorization':`Bearer ${strapi_key}`}
    });
    let projects:APIResponseCollection<"api::project.project"> | undefined = undefined;
    if (projectRes.status < 300) {
        projects = await projectRes.json() as APIResponseCollection<"api::project.project">;
    }
    return { 
        posts:posts?.data,
        projects:projects?.data
    };
};
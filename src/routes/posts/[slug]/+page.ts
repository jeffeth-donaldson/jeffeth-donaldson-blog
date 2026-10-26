import { error } from '@sveltejs/kit';
import { getPost } from '#lib/content';
import { resolveImage } from '#lib/utils/images';

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');

	return {
		slug: post.slug,
		title: post.title,
		description: post.description,
		date: post.date,
		tags: post.tags,
		project: post.project,
		banner: resolveImage(post.banner)
	};
}

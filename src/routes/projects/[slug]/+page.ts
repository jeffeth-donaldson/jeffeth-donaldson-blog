import { error } from '@sveltejs/kit';
import { getProject } from '#lib/content';

export function load({ params }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');

	return {
		slug: project.slug,
		title: project.title,
		description: project.description,
		date: project.date,
		tags: project.tags,
		github: project.github
	};
}

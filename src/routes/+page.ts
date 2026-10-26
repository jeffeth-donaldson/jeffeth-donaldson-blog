import { getPosts, getProjects, toSummary } from '#lib/content';

export function load() {
	return {
		posts: getPosts().slice(0, 3).map(toSummary),
		projects: getProjects().slice(0, 3).map(toSummary)
	};
}

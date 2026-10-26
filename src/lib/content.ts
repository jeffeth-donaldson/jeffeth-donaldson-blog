import type { Component } from 'svelte';

export interface ContentMetadata {
	title: string;
	description: string;
	date: string;
	tags: string[];
	project?: string;
	github?: string;
	banner?: string;
}

export interface ContentSummary extends ContentMetadata {
	slug: string;
}

interface ContentModule {
	default: Component;
	metadata: ContentMetadata;
}

interface ContentEntry extends ContentSummary {
	component: Component;
}

const postModules = import.meta.glob('/src/content/posts/*.md', {
	eager: true
}) as Record<string, ContentModule>;
const projectModules = import.meta.glob('/src/content/projects/*.md', {
	eager: true
}) as Record<string, ContentModule>;

const slugFromPath = (path: string) => path.split('/').pop()?.replace(/\.md$/, '') || '';

const entriesFromModules = (modules: Record<string, ContentModule>): ContentEntry[] =>
	Object.entries(modules).map(([path, module]) => ({
		...module.metadata,
		slug: slugFromPath(path),
		component: module.default
	}));

const sortByDate = (entries: ContentEntry[]) =>
	[...entries].sort((a, b) => b.date.localeCompare(a.date));

export const getPosts = () => sortByDate(entriesFromModules(postModules));
export const getProjects = () => sortByDate(entriesFromModules(projectModules));

export const getPost = (slug: string) => getPosts().find((post) => post.slug === slug);
export const getProject = (slug: string) => getProjects().find((project) => project.slug === slug);

export const getPostsForProject = (project: string) =>
	getPosts().filter((post) => post.project === project);

export const toSummary = (entry: ContentEntry): ContentSummary => ({
	slug: entry.slug,
	title: entry.title,
	description: entry.description,
	date: entry.date,
	tags: entry.tags,
	...(entry.project ? { project: entry.project } : {}),
	...(entry.github ? { github: entry.github } : {})
});

export const filterContent = (
	entries: ContentEntry[],
	search: string,
	tags: string[]
): ContentEntry[] => {
	const normalizedSearch = search.trim().toLowerCase();
	return entries.filter((entry) => {
		const matchesSearch =
			!normalizedSearch ||
			[entry.title, entry.description, entry.tags.join(' ')].some((value) =>
				value.toLowerCase().includes(normalizedSearch)
			);
		const matchesTags = tags.every((tag) => entry.tags.includes(tag));
		return matchesSearch && matchesTags;
	});
};

export const paginate = <T>(entries: T[], page: number, pageSize: number) => {
	const pageCount = Math.max(1, Math.ceil(entries.length / pageSize));
	const currentPage = Math.min(Math.max(page, 1), pageCount);
	const start = (currentPage - 1) * pageSize;
	return {
		entries: entries.slice(start, start + pageSize),
		page: currentPage,
		pageCount,
		total: entries.length
	};
};

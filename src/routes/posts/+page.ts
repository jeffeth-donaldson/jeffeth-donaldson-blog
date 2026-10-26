import { filterContent, getPosts, paginate, toSummary } from '#lib/content';

export function load({ url }) {
	const search = url.searchParams.get('search') || '';
	const tags = [...new Set((url.searchParams.get('tags') || '').split(',').filter(Boolean))];
	const pageSize = Math.max(1, Number(url.searchParams.get('pagesize') || 10));
	const requestedPage = Math.max(1, Number(url.searchParams.get('page') || 1));
	const filtered = filterContent(getPosts(), search, tags);
	const result = paginate(filtered, requestedPage, pageSize);

	return {
		posts: result.entries.map(toSummary),
		search,
		tags,
		pageSize: String(pageSize),
		page: String(result.page),
		pageCount: result.pageCount,
		postCount: result.total
	};
}

import type { Picture } from '@sveltejs/enhanced-img';

const images = import.meta.glob('/src/lib/assets/*.{jpeg,jpg,png,webp}', {
	eager: true,
	query: { enhanced: true }
}) as Record<string, { default: Picture }>;

export function resolveImage(filename?: string): Picture | null {
	if (!filename) return null;
	const key = `/src/lib/assets/${filename.replace(/^\/+/, '')}`;
	return images[key]?.default ?? null;
}

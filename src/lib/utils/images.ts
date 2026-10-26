const images = import.meta.glob('/src/lib/assets/*.{jpeg,jpg,png,webp}', {
	eager: true,
	query: { enhanced: true }
}) as Record<string, { default: never }>;

export function resolveImage(filename?: string) {
	if (!filename) return null;
	const key = `/src/lib/assets/${filename}`;
	console.log(Object.keys(images).length);
	const res = images[key];
	console.log(res);
	return images[key]?.default || null;
}

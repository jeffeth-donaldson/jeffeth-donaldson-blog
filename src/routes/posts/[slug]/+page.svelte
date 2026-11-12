<script lang="ts">
	import type { Action } from 'svelte/action';
	import { resolve } from '$app/paths';
	import { getPost } from '#lib/content';
	import Tag from '#lib/commonComponents/Tag.svelte';
	import { resolveImage } from '#lib/utils/images';
	import type { PageData } from './$types';
	import './hopscotch.css';

	let { data }: { data: PageData } = $props();
	const post = $derived(getPost(data.slug));
	const Content = $derived(post?.component);
	const banner = $derived(resolveImage(post?.banner));

	const addCopyButtons: Action<HTMLElement> = (container) => {
		const cleanups = Array.from(container.querySelectorAll('pre')).map((block) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'copy-code-button';
			button.textContent = 'Copy';
			button.setAttribute('aria-label', 'Copy code');

			let resetTimeout: ReturnType<typeof setTimeout>;
			const copy = async () => {
				try {
					await navigator.clipboard.writeText(block.querySelector('code')?.textContent ?? '');
					button.textContent = 'Copied';
				} catch {
					button.textContent = 'Copy failed';
				} finally {
					button.className = 'copy-code-button clicked';
				}
				clearTimeout(resetTimeout);
				resetTimeout = setTimeout(() => {
					button.textContent = 'Copy';
					button.className = 'copy-code-button';
				}, 2000);
			};

			button.addEventListener('click', copy);
			block.append(button);
			return () => {
				button.removeEventListener('click', copy);
				button.remove();
				clearTimeout(resetTimeout);
			};
		});

		return { destroy: () => cleanups.forEach((cleanup) => cleanup()) };
	};
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="post">
	{#if banner}
		<enhanced:img class="background-image" src={banner} alt="" />
	{/if}
	<div class="heading">
		<h1 class="sixtyfour">{data.title}</h1>
		{#if data.project}
			<div>
				Part of the <a href={resolve('/projects/[slug]', { slug: data.project })}>{data.project}</a>
			</div>
		{/if}
		<div class="tags">
			Tags:
			{#each data.tags as tag (tag)}
				<Tag tagName={tag} />
			{/each}
		</div>
		<div class="last-updated">
			{'Published: ' + data.date}
		</div>
	</div>
	<div class="post-body" use:addCopyButtons>
		{#if Content}
			<Content />
		{/if}
	</div>
</div>

<style>
	.post {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* min-height: 100%; Ensure the post takes at least the full height of the viewport */
		border-radius: 8px;
		background-color: var(--secondary-bg);
		min-width: 65vw;
		max-width: 95vw;
		z-index: 0;
		padding: 1em;
	}
	.heading h1 {
		color: var(--accent-color-primary);
		font-size: 3em;
		margin-left: 1em;
	}
	.last-updated {
		margin-right: 1em;
		word-wrap: break-word;
		max-width: 70%;
		color: var(--accent-color-tertiary);
		margin-bottom: 1em;
	}
	.heading {
		width: 100%;
		display: flex;
		margin-top: 200px;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		padding-left: 1em;
		padding-right: 1em;
	}
	.background-image {
		border-radius: 8px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 250px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: -1; /* Ensure the background image sits behind other content */
		mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
	}
	.tags {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}
	.post-body :global(pre) {
		position: relative;
		padding-top: 3.25em;
	}
	.post-body :global(.copy-code-button) {
		position: absolute;
		top: 0.6em;
		right: 0.6em;
		padding: 0.35em 0.7em;
		border: 1px solid #797379;
		border-radius: 4px;
		background: #403640;
		color: #f0edf0;
		font: inherit;
		font-size: 0.8rem;
		cursor: pointer;
		transition: transform 0.3s ease;
	}
	.post-body :global(.copy-code-button:hover) {
		background: #514551;
	}
	.post-body :global(.copy-code-button:focus-visible) {
		outline: 2px solid var(--accent-color-tertiary);
		outline-offset: 2px;
	}

	.post-body :global(.clicked) {
		transform: scale(0.95); /* Scale down the button slightly */
	}

	@media screen and (max-width: 800px) {
		.heading {
			flex-direction: column;
		}
		.heading h1 {
			font-size: 2em;
		}
	}
</style>

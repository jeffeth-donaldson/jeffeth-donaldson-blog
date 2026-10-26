---
title: Building This Blog with SvelteKit
description: A first look at the tools and decisions behind this site.
date: 2026-10-25
tags:
  - svelte
  - markdown
  - web development
project: joshtech-blog
banner: 'large_joshtechblog_940bbec9ea.png'
---

# Building This Blog with SvelteKit

This is a starter post written in Markdown. Posts live in the repository, so publishing a new article means adding a file with frontmatter and Markdown content.

## A small example

Fenced code blocks are rendered by mdsvex and Svelte's built-in Markdown pipeline:

```ts
const publish = (title: string) => {
	console.log(`Publishing: ${title}`);
};

publish('A new post');
```

The rest of the article can stay focused on writing. There is no external content model or custom rich-text component to maintain.

---
title: JoshTech Blog
description: This site is a SvelteKit blog powered by Markdown and mdsvex.
date: 2026-10-25
tags:
  - sveltekit
  - mdsvex
  - typescript
github: https://github.com/jeffeth-donaldson/jeffeth-donaldson-blog
---

# JoshTech Blog

This project is the home for notes, experiments, and longer articles about software development.

## Why Markdown?

Content stays close to the code, works well with version control, and keeps writing separate from the page layout. Add a new Markdown file in `src/content/projects` to create another project entry.

```ts
export const content = 'written in Markdown';
```

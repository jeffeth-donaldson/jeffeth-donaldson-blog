<script lang="ts">
	import type { APIResponseData } from "$lib/types/types";
	import type { PageData } from "./$types";
	import PostThumbnail from "./posts/PostThumbnail.svelte";
	import ProjectThumbnail from "./projects/ProjectThumbnail.svelte";
	export let data:PageData;
	let posts:APIResponseData<"api::blog-post.blog-post">[];
	let projects:APIResponseData<"api::project.project">[];
	if (data.posts == undefined) {
		posts = [];
	} else {
		posts = data.posts;
	}
	if (data.projects == undefined) {
		projects= [];
	} else {
		projects = data.projects;
	}
</script>

<svelte:head>
	<title>JoshTech Blog</title>
	<meta name="description" content="Tech Blog by Josh McClung" />
</svelte:head>
	<div class="page-body">
		<div class="body-header">
			<h1 class="sixtyfour">JoshTech Blog</h1>
		</div>
		<div class="body-description">
			<h2>Hey There!</h2>
			<p>
				Hello and Welcome to my Blog. Here is where I'll show off any projects I've been working on 
				(including this site). As well as share anything I find somewhat useful/insightful. This will 
				tend to focus on things relating to python, web development, game development, shell scripting,
				and linux, but don't be surprised to see anything here! Try searching for something in the <code>posts</code>
				page, or click on a tag anywhere on the site to search for articles relating to that tag! 
				In the <code>projects</code> page you will be able to see projects I've worked on,
				as well as find all the articles associated with that project.
			</p>
		</div>
		<div class="body-links sixtyfour">
			<a href="/posts">Posts</a>
			<a href="/projects">Projects</a>
			<a href="/about">About</a>
		</div>
		<div>
			<h2 class="check-this-out">Check this out:</h2>
			<div class="body-check-this-out">
				<div class="posts">
					<h2>Recent Posts</h2>
				{#each posts as post}
					<PostThumbnail 
						post={post}
					/>
				{/each}
				</div>
				<div class="projects">
					<h2>Recent Projects</h2>
					{#each projects as project}
						<ProjectThumbnail
							project={project}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>


<style>
	.page-body {
		min-width: 65%;
		max-width: 100%;
		min-height: 100vh;
		background-color: var(--tertiary-bg);
		border-radius: 20px;
		padding: 2em;
	}

	.body-header {
		/* background: linear-gradient(45deg, #836901, #8a3652, #1a4d80, #358650); */
		background: linear-gradient(
			45deg, 
			var(--accent-color-primary), 
			var(--accent-color-secondary),
			var(--accent-color-tertiary));
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
		border-radius: 20px;
		text-align: center;
		font-size: xx-large;
		border-color: var(--secondary-bg);
		border-width: .5em;
		border-style: solid;
		color: #fff;
	}

    /* Define the keyframes for the animation */
    @keyframes gradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
	.body-description {
		background-color: var(--secondary-bg);
		border-radius: 15px;
		padding: 2px;
		margin-top: 1em;
	}
	.body-description h2 {
		margin: 10px;
	}
	.body-description p {
		margin: 10px;
		font-size: larger;
	}
	.body-links {
		background-color: var(--secondary-bg);
		border-radius: 15px;
		padding: 2px;
		margin-top: 1em;
		display:flex;
		flex-direction: row;
		justify-content:space-between
	}
	.body-links a {
		text-decoration: none;
		animation: colorAnimation 10s ease infinite;
		width:30%;
		padding: 1em;
		background-color: var(--tertiary-bg);
		text-align: center;
		border-radius: 15px;
		margin: 1em;
		transition: background 0.3s ease;
		transition: width 0.3s ease;
		font-size: x-large
	}
	.body-links a:hover {
		background: linear-gradient(
			45deg, 
			var(--accent-color-primary), 
			var(--accent-color-secondary),
			var(--accent-color-tertiary));
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
		color:#fff;
		width:60%;
	}

	@keyframes colorAnimation {
      0% {
        color: var(--accent-color-primary);
      }
      33% {
        color: var(--accent-color-secondary);
      }
	  66% {
		color: var(--accent-color-tertiary);
	  }
      100% {
        color: var(--accent-color-primary);
      }
    }

	.body-check-this-out {
		min-width: 90%;
		display:flex;
		flex-direction:row;
		justify-content: space-evenly;
	}
	
	.posts {
		border-radius:10px;
		display:flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		text-align: center;
		width:46%;
		background-color: var(--secondary-bg);
		padding: 1em;
	}

	.projects {
		border-radius:10px;
		display:flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		text-align: center;
		width:46%;
		background-color: var(--secondary-bg);
		padding: 1em;
	}
	@media screen and (max-width: 800px) {
		.page-body {
			width:87vw;
			padding:1em;
		}
		.sixtyfour {
			font-size: 9vw;
		}
		.body-links {
			flex-direction: column;
		}
		.body-links a {
			width:auto;
		}

		.body-links a:hover {
			width:auto;
		}
		.check-this-out {
			text-align:center;
		}
		.body-check-this-out {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			width:100%;
		}
		.posts {
			width:95%;
		}
		.projects {
			width:95%;
		}
	}
</style>

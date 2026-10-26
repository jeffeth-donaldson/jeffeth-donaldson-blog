<script lang="ts">
	import headshot from '../../lib/assets/headshot.jpg';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About me" />
</svelte:head>

<div class="about-container">
	<div class="title">
		<h1 class="sixtyfour">About Me</h1>
	</div>
	<div class="content-spacer">
		<div class="content">
			<h2>Nice to meet you! I'm Josh McClung</h2>
			<div class="sub-content">
				<enhanced:img class="pfp" src={headshot} alt="Me" />
				<p>
					Hi! I'm a software developer who enjoys beaches, nature, and warm weather. I Graduated
					with a BS in Computer Science in 2023 and I love technology. I currently work as a MLOps
					Engineer, but I've also worked in fullstack web development, as well as Devops and Test
					Automation. I'm familiar with quite a few languages, but the one I probably end up using
					the most is python. The point of this blog is to document my experiences working on
					projects and hopefully guide a few lost souls on their development journeys! While I'll
					mostly be focused on software development, you'll probably hear me talk about mechanical
					keyboards, home automation, hobby electronics, and games from time to time.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.sub-content {
		display: flex;
		padding: 2em;
	}
	.sub-content p {
		margin: 1em;
	}
	.pfp {
		width: clamp(120px, 18vw, 280px);
		flex: 0 0 auto;
		height: auto;
		border-radius: 1rem;
	}
	:global(.pfp img) {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
	}
	.content-spacer {
		display: flex;
		justify-content: space-around;
		min-height: 60vh;
	}
	.content p {
		font-size: x-large;
		color: var(--text-color);
		margin-right: 1em;
	}
	.content {
		background-color: var(--tertiary-bg);
		border-radius: 10px;
		width: 95%;
		height: fit-content;
		padding: 1em;
	}
	.about-container {
		background-color: var(--secondary-bg);
		width: 95%;
		border-radius: 15px;
		display: flex;
		min-height: 90vh;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}

	.title {
		background: linear-gradient(
			45deg,
			var(--accent-color-primary),
			var(--accent-color-secondary),
			var(--accent-color-tertiary)
		);
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
		border-radius: 20px;
		text-align: center;
		font-size: x-large;
		border-color: var(--secondary-bg);
		border-width: 0.5em;
		border-style: solid;
		color: #fff;
		width: 95%;
		height: fit-content;
	}
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
</style>

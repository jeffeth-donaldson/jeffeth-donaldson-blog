<script>
</script>

<header>
	<div class="padding">
		<a class="sixtyfour home" href="/">JoshTech Blog</a>
	</div>
	<nav>
		<a href="/">Home</a>
		<a href="/projects">Projects</a>
		<a href="/about">About Me</a>
		<a href="/posts">Posts</a>
	</nav>
	<div class="padding"></div>
</header>

<style>
	header {
		display: flex;
		justify-content:center;
		align-items:center;
		width:100%;
		min-height:5%;
		margin-bottom:0.5em;
		background: linear-gradient(
			45deg, 
			var(--accent-color-primary), 
			var(--accent-color-secondary),
			var(--accent-color-tertiary));
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
		border-radius: 8px;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		height:100%;
		width:100%;
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
	nav a {
		padding: 0.5em;
		background-color: #00000000;
		text-decoration:none;
		color: var(--text-color);
		transition: background-color ease 0.3s;
		border-radius:5px;
		margin:0.2em;
	}
	nav a:hover {
		background-color: var(--tertiary-bg);
	}
	.home {
		text-decoration: none;
		color: var(--text-color);
		width:33%;
		font-size:x-large;
		margin-left:1em;
	}
	.padding {
		width:33%;
	}
</style>

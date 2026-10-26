<script>
	import { github_url } from '#lib/client/constants';
</script>

<footer>
	<p>Made with 😎 by Joshua McClung</p>
	<a href={`#/${github_url}`} aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
	<a href="https://ko-fi.com/Q2S62936RC">Support me on Ko-fi</a>
</footer>

<style>
	footer {
		width: 100%;
		min-height: 5%;
		margin-top: 0.5em;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: baseline;
		width: 100%;
		min-height: 10%;
		background: linear-gradient(
			45deg,
			var(--accent-color-primary),
			var(--accent-color-secondary),
			var(--accent-color-tertiary)
		);
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
	}
	footer a {
		padding: 0.5em;
		text-decoration: none;
		color: var(--text-color);
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

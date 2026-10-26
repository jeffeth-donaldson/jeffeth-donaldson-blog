<script>
	import '../app.css';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import './styles.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>

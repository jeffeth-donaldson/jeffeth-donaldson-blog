<script>
	import "../app.pcss";
	import Footer from "./Footer.svelte";
    import Header from './Header.svelte';
    import './styles.css';
</script>

<div class="app">
	<Header></Header>

	<main>
		<slot></slot>
	</main>

	<Footer/>
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

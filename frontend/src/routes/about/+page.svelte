<script lang="ts">
	import type { PageData } from "./$types";
	import type { APIResponseData } from "$lib/types/types";
	import type { image } from "$lib/types/imageTypes"
	import { strapi_url } from "$lib/client/constants";

	export let data:PageData;
	const about = data.about as unknown as APIResponseData<"api::about.about">;
	const bio = about.attributes.Bio || "UwU-psies!! The bio didn't load 😫";
	const img = about.attributes.avatar?.data.attributes as unknown as image;
	console.log(img)
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
			<div class="pfp">
				<img src={strapi_url + img.url} alt={img.alternativeText} />
			</div>
			<h2>
				Nice to meet you! I'm {about.attributes.Name}
			</h2>
			<p>
				{bio}
			</p>
		</div>
	</div>
	
</div>

<style>
	.content-spacer {
		display:flex;
		justify-content: space-around;
		min-height:60vh;
	}
	.pfp {
		float: left;
		margin: 1em;
	}
	.pfp img {
		border-radius: 5px;
	}
	.content p {
		font-size:x-large;
		color:var(--text-color);
		margin-right: 1em;
	}
	.content {
		background-color: var(--tertiary-bg);
		border-radius: 10px;
		width:95%;
		height:fit-content;
	}
	.about-container {
		background-color: var(--secondary-bg);
		width: 95%;
		border-radius: 15px;
		display: flex;
		min-height: 90vh;
		align-items: center;
		flex-direction: column;
		justify-content:space-between;
	}

	.title {
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
		font-size: x-large;
		border-color: var(--secondary-bg);
		border-width: .5em;
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

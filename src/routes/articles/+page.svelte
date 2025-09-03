<script>
	import { onMount } from 'svelte';
	import { strapi } from '@strapi/client';
    import ArticleRow from '$lib/ArticleRow.svelte';

    let articles = $state();
	
	onMount(async () => {
		try {
			const client = strapi({
				baseURL: 'http://localhost:1337/api',
				auth: 'd31ef63080249aba54850efe7b5cd8dc3b25e25cddb4555883c17555004dfab20f115392830f668ed5152314bd8ebf64e96f00cb37dbdfe7aee029ff37a8a9eb7dd580f851351293485cc095ce67277256f1c754ee99d8416a7cc72c62619f1accf5c1832eafab5123f2213f02c58076851834f84e86ca0ee4421e4747a4c8a2'
			});
			const collection = client.collection('articles');
			articles = await collection.find();

		} catch(error)
		{
			console.log('Article Fetch error: ', error);
		}
	});
</script>

<div class="flex justify-center flex-col items-center">
    <h1 class="text-6xl font-bold font-serif my-8">Articles</h1>
    {#each articles?.data as article}
         <ArticleRow article={article}></ArticleRow>
    {/each}

</div>
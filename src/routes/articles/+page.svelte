<script>
	import { onMount } from 'svelte';
	import { strapi } from '@strapi/client';
	import qs from 'qs';
    import ArticleRow from '$lib/ArticleRow.svelte';
	import { cmsApiBase, cmsAuth } from '$lib/cms-link';

    let articles = $state();
	
	onMount(async () => {
		try {
			const client = strapi({
				baseURL: cmsApiBase,
				auth: cmsAuth
			});
			const collection = client.collection('articles');
			articles = await collection.find({ populate: 'icon'});

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
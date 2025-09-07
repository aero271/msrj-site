<script>
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
    
    import { page } from '$app/state';
    import { strapi } from '@strapi/client';
    import { cmsApiBase, cmsAuth } from '$lib/cms-link';
    import { get } from 'svelte/store';

    let article = $state();

    const getArticleData = async () => {

        try {
            const client = strapi({
                baseURL: cmsApiBase,
                auth: cmsAuth
            });
            const collection = client.collection('articles');
            article = await collection.findOne(page.params.article);
            for (let a of article.data.content)
            {
                console.log(a);
            }

        } catch(error)
        {
            console.log('Article Fetch error: ', error);
        }
    }
    getArticleData();
</script>

<div class="flex flex-col items-center mt-12">

    <div class="w-3/4">
        <h1 class="font-cantata text-6xl mb-3">{article?.data.title}</h1>
        <h2 class="font-roboto-serif italic ml-5">By {article?.data.author}</h2>
        <div class="bg-black w-[100%] h-[2px] my-2"></div>

        <div class="flex flex-col items-center">
            <article class="flex flex-col mt-6 min-w-1/2 max-w-[600px]">
                {#each article?.data.content as text}
                    {#if text.type === 'paragraph'}
                        {#each text?.children as child}
                            <p class="font-roboto-serif my-2">{child.text}</p>
                        {/each}
                    {/if}
                {/each}
            </article>
            <div class="w-[100%] flex flex-col items-center mt-12">
                <div class="bg-black w-[100%] h-[2px] mb-2"></div>
                <div class="flex flex-col w-3/4 font-roboto-serif">
                    <div class="text-lg mb-1">References</div>
                    <ol>
                        <li class="ml-4 text-sm">TODO</li>
                        <li class="ml-4 text-sm">Add</li>
                        <li class="ml-4 text-sm">this</li>
                    </ol>
                </div>
            </div>

        </div>

    </div>

</div>
<div class="h-40"></div>
<script>
    import ArticleElement from "$lib/ArticleElement.svelte";
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
    let article = $state(data.article);

</script>

<div class="flex flex-col items-center mt-12 font-roboto-serif">

    <div class="w-3/4">
        <h1 class="font-cantata text-6xl mb-3">{data.metadata.title.en}</h1>
        <div class="flex h-8 items-center">
            <h2 class="font-roboto-serif italic ml-5">By {data.metadata.authorsString}</h2>
        </div>
        <div class="bg-black w-[100%] h-[2px] my-2"></div>

        <div class="flex flex-col items-center">
            <h class="font-roboto-serif text-4xl mt-4">Article Editor</h>
            <article class="flex flex-col mt-6 min-w-1/2 max-w-[700px]">

                <div class="flex text-xl">
                    <button class="p-2 border-1 m-1 hover:bg-gray-200">Auto-Generate Content From PDF</button>
                    <button class="p-2 border-1 m-1 hover:bg-gray-200 ml-auto">Add Element</button>
                </div>
                {#if article.length === 0}
                    <div>This article currently has no elements</div>
                {/if}
                <ArticleElement />
                {#each article as element}
                    {#if element.type === 'h'}
                        <h>{element.content}</h>
                    {:else if element.type === 'p'}
                        <p>{element.content}</p>
                    {:else if element.type === 'linebreak'}
                        <p class="h-4"></p>
                    {/if}
                {/each}
            </article>
            {#if article.length > 5}
                <div class="w-[100%] flex flex-col items-center mt-12">
                    <div class="bg-black w-[100%] h-[2px] mb-2"></div>
                </div>
            {/if}
        </div>
    </div>
</div>
<div class="h-40"></div>
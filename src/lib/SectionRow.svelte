
<script>
    let { name, articles } = $props();
    import ArticleBig from "./ArticleBig.svelte";
    if (articles.length > 4) {
        articles = [ articles[0], articles[1], articles[2], articles[3] ];
    }
</script>

<div class="w-full">
    <h class="font-cantata text-xl">{name}</h>
    <div class="w-full flex mt-2.5">
        {#each articles as article, i}
            <div class="w-[24%]">
                <ArticleBig article={article} />
            </div>
            <div class="w-[.5%]"></div>

            {#if i != 3}<div class="w-[1px] bg-gray-600"></div>{/if}
            <div class="w-[.5%]"></div>
        {/each}
    </div>
</div>
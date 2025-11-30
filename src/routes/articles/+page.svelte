<script>
    import ArticleRow from "$lib/ArticleRow.svelte";
    let { data } = $props();
    let articles = $state();
</script>

<main class="flex flex-col items-center">
    <h1 class="text-7xl font-serif my-8">Articles</h1>
    <div class="min-w-1/2 max-w-[1000px]">
        <div class="bg-gray-600 h-[1px] w-full mb-3"></div>
        {#each data.articles as article}
            <ArticleRow article={article}></ArticleRow>
        {/each}

    </div>
</main>

<svelte:head>
    <title>Articles - Mastery: The Student Research Journal</title>
</svelte:head>
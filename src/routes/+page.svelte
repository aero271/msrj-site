<script>
    import ArticleBig from "$lib/ArticleBig.svelte";
    import SectionRow from "$lib/SectionRow.svelte";
    let { data } = $props();
</script>

<main class="flex items-center flex-col mt-4">
    <h class="text-6xl font-cantata font-bold mt-4">Mastery: The Student Research Journal</h>
    <h class="font-roboto-serif italic my-2">A research journal for students, by students. Created at the Mastery School of Hawken in Cleveland, Ohio</h>
    <div class="w-2/3 h-[1px] bg-black"></div>
    <div class="w-2/3 flex justify-center max-h-[90vh] mt-7">
        <div class="w-[72%]">
            <ArticleBig article={data.frontArticle}></ArticleBig>
        </div>

        <div class="w-[25%] flex flex-col items-center ml-6">
            <div class="max-h-1/2 w-[100%] mb-1">
                <ArticleBig article={data.new1}></ArticleBig>
            </div>
            <div class="max-h-1/2 w-[100%] mt-4">
                <ArticleBig article={data.new2}></ArticleBig>
            </div>

            <div class="w-[100%] ml-2">
                <a class="font-cantata hover:text-gray-400 transition-all" href="/new-articles">More New Articles...</a>
            </div>
        </div>
    </div>
    <div class="w-2/3 mt-12 font-roboto-serif">
        {#if data.sciences?.length > 0}
            <SectionRow articles={data.sciences} name={'Natural and Physical Sciences'} />
        {/if}
    </div>
    <div class="w-2/3 mt-12 font-roboto-serif">
        {#if data.social?.length > 0}
            <SectionRow articles={data.social} name={'Social Sciences, Policy, and Law'} />
        {/if}
    </div>
    <div class="w-2/3 mt-12 font-roboto-serif">
        {#if data.hum?.length > 0}
            <SectionRow articles={data.hum} name={'Humanities and Culture'} />
        {/if}
    </div>
</main>

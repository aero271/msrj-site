<script>
    import ArticleBig from "$lib/ArticleBig.svelte";
    import SectionRow from "$lib/SectionRow.svelte";
    let { data } = $props();
</script>

<main class="flex items-center flex-col mt-4 w-full mx-2">
    <div class="w-full max-w-[1300px] flex flex-col items-center mx-auto">
        <h class="text-[55px] font-cantata font-bold mt-4">Mastery: The Student Research Journal</h>
        <h class="font-roboto-serif italic my-2">A research journal for students, by students. Created at the Mastery School of Hawken in Cleveland, Ohio</h>
        <div class="w-full h-[1px] bg-black"></div>
    </div>
    <div class="w-full max-w-[1300px] mx-auto flex justify-center min-h-[90vh] mt-7">
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
        </div>
    </div>
    <div class="w-full max-w-[1300px]">
        <div class="mt-12 font-roboto-serif">
            {#if data.sciences?.length > 0}
                <SectionRow articles={data.sciences} name={'Natural and Physical Sciences'} />
            {/if}
        </div>
        <div class="mt-12 font-roboto-serif">
            {#if data.social?.length > 0}
                <SectionRow articles={data.social} name={'Social Sciences, Policy, and Law'} />
            {/if}
        </div>
        <div class="mt-12 font-roboto-serif">
            {#if data.hum?.length > 0}
                <SectionRow articles={data.hum} name={'Humanities and Culture'} />
            {/if}
        </div>

    </div>
</main>

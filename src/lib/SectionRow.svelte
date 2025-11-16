
<script>
    let { name, articles } = $props();
    import ArticleBig from "./ArticleBig.svelte";
</script>

<div class="w-full">
    <h class="font-cantata text-xl">{name}</h>
    <div class="w-full flex mt-2.5">
        <div class="w-[24%]">
            <ArticleBig article={articles[0]} />
        </div>
        <div class="w-[.5%]"></div>
        <div class="w-[1px] bg-gray-600"></div>
        <div class="w-[.5%]"></div>
        <div class="w-[24%]">
            <ArticleBig article={articles[0]} />
        </div>
        <div class="w-[.5%]"></div>
        <div class="w-[1px] bg-gray-600"></div>
        <div class="w-[.5%]"></div>
        <div class="w-[24%]">
            <ArticleBig article={articles[0]} />
        </div>
        <div class="w-[.5%]"></div>
        <div class="w-[1px] bg-gray-600"></div>
        <div class="w-[.5%]"></div>
        <div class="w-[24%]">
            <ArticleBig article={articles[0]} />
        </div>
    </div>

</div>
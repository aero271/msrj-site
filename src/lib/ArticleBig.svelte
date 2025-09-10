<script>
    import { cmsBase } from "./cms-link";
    import { onMount } from "svelte";

    let { article } = $props();
    let imgUrl = $derived(cmsBase + article?.data.display_image[0].url);

</script>

<a href="/articles/{article?.data.documentId}"
class="w-[100%] min-h-[100%] flex flex-col items-center queryable">
    <img src={imgUrl} alt="article display_image" class="w-[100%] h-[100%]">
    <div class="h-[1px] bg-black w-[100%] mt-1"></div>
    <h class="font-cantata title-size w-[100%]">{article?.data.title}</h>

    <div class="w-[100%] mt-auto">
        <div class="font-roboto-serif italic">{article?.data.author}</div>
        <div class="h-[1px] bg-black w-[100%]"></div>
    </div>

</a>

<style>
    .queryable {
        container-type: inline-size;
    }

    .queryable > .title-size {
        font-size: clamp(10pt, 6cqi, 32pt);
    }
</style>
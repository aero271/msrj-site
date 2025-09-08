<script>
    import { cmsBase } from "./cms-link";
    import { onMount } from "svelte";

    let { article } = $props();
    let imgUrl = $derived(cmsBase + article?.data.display_image[0].url);

</script>

<div class="w-[95%] aspect-[3-2] flex flex-col items-center">
    <img src={imgUrl} alt="article display_image" class="w-[100%] h-[100%]">
    <div class="h-[1px] bg-black w-[100%] mt-1"></div>
    <div class="font-cantata title-size">{article?.data.title}</div>
</div>

<style>
    .title-size {
        font-size: clamp();
    }
</style>
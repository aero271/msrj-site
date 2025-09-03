
<script>
    import { onMount } from "svelte";
    import { cmsBase } from "./cms-link";

    let { article } = $props();
    let imgUrl = $state('');

    onMount(async () => {
        imgUrl = cmsBase + article.icon.url;
    });

</script>

<a href="/articles/{article.documentId}" class="h-36 min-w-[633px] max-w-1/3">
    <div class="flex items-center h-[100%]">
        <img src={imgUrl} alt="article icon" class="h-[90%] aspect-square ml-2">

        
        <div class="flex flex-col mx-4 h-[95%]">
            <div class="h-[80%] text-2xl">{article.title}</div>
            <div class="h-[20%] text-sm">{article.author}</div>
        </div>
    </div>

    <div class="w-[100%] h-[1px] bg-gray-600"></div>
</a>
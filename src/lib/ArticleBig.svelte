<script>
    import { cmsBase } from "./cms-link";
    import { onMount } from "svelte";

    let { article } = $props();
    let imgUrl = $state();

    onMount(() => {
        imgUrl = cmsBase + article.data.display_image[0].url;
        console.log(article);
    });


</script>

<div class="w-[70%] h-[80vh]">
    <img src={imgUrl} alt="display_image">
</div>

<script>
    let { article } = $props();
</script>

<a href="/articles/{article.id}" class="font-cantata">
    <div class="flex h-full min-h-32">
        <div class="my-1 flex items-center">
            <img src={article.iconImg} alt="article icon" class="max-w-32 h-auto ml-2">
        </div>

        
        <div class="flex flex-col mx-4 h-[95%]">
            <div class="h-[80%] text-2xl">{article.title}</div>
            <div class="h-[20%] text-sm font-roboto-serif italic">{article.authors}</div>
        </div>
    </div>

    <div class="w-full h-[1px] bg-gray-600 my-3"></div>
</a>
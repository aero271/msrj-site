
<script>
    let { article } = $props();
</script>

<a href="/articles/{article.documentId}" class="h-36 min-w-1/3 max-w-[633px]">
    <div class="flex items-center h-[100%]">
        <div class="h-[90%] aspect-square bg-red-600 ml-2">pic here</div>
        
        <div class="flex flex-col mx-4 h-[95%]">
            <div class="h-[80%] text-2xl">{article.title}</div>
            <div class="h-[20%] text-sm">{article.author}</div>
        </div>
    </div>

    <div class="w-[100%] h-[1px] bg-gray-600"></div>
</a>
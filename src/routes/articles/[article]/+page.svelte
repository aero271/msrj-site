<script>
    /** @type {import('./$types').PageProps} */
    import settingsIcon from '$lib/assets/settings-icon-14963.png';
    let { data } = $props();
    console.log(data)
</script>

<div class="flex flex-col items-center mt-12">

    <div class="w-3/4">
        <h1 class="font-cantata text-6xl mb-3">{data.metadata.title.en}</h1>
        <div class="flex h-8 items-center">
            <h2 class="font-roboto-serif italic ml-5">By {data.metadata.authorsString}</h2>
            <a href="/articles/{data.metadata.id}/admin" class="h-[100%] ml-auto hover:bg-gray-400 rounded-xl p-1">
                <img src={settingsIcon} alt="Settings icon" class="h-[100%] aspect-square ">
            </a>
        </div>
        <div class="bg-black w-[100%] h-[2px] my-2"></div>

        <div class="flex flex-col items-center">
            <article class="flex flex-col mt-6 min-w-1/2 max-w-[600px]">
                {#each data.article as element}
                    {#if element.type === 'h'}
                        <h>{element.content}</h>
                    {:else if element.type === 'p'}
                        <p>{element.content}</p>
                    {:else if element.type === 'linebreak'}
                        <p class="h-4"></p>
                    {/if}
                {/each}
            </article>
            <div class="w-[100%] flex flex-col items-center mt-12">
                <div class="bg-black w-[100%] h-[2px] mb-2"></div>
                <div class="flex flex-col w-3/4 font-roboto-serif">
                    <div class="text-lg mb-1">References</div>
                    <ol>
                        <li class="ml-4 text-sm">TODO</li>
                        <li class="ml-4 text-sm">Add</li>
                        <li class="ml-4 text-sm">this</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="h-40"></div>
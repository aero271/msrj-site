<script>
    /** @type {import('./$types').PageProps} */
    import settingsIcon from '$lib/assets/settings-icon-14963.png';
    import downloadIcon from '$lib/assets/download_1-1024-374789711.png';
    import { enhance } from '$app/forms';
    let { data } = $props();

    function getPDF(event) {
        event.preventDefault();

        let params = new URLSearchParams({ id: data.metadata.id }).toString();
        const a = document.createElement('a');
        a.href = 'http://localhost:5173/api/getPDF?' + params;
        a.download = 'article'; 
        a.click();
    }

</script>

<main class="flex flex-col items-center mt-12 font-roboto-serif">

    <div class="w-3/4">
        <h1 class="font-cantata text-6xl mb-3">{data.metadata.title}</h1>
        <div class="flex h-8 items-center">
            <h2 class="font-roboto-serif italic ml-5">By {data.metadata.authors}</h2>
                <button onclick={getPDF} class="h-full ml-auto hover:bg-gray-400 rounded-xl p-1">
                    <img src={downloadIcon} alt="Settings icon" class="h-[100%] aspect-square ">
                </button>   
            <a href="/articles/{data.metadata.id}/admin" class="h-[100%] hover:bg-gray-400 rounded-xl ml-3 p-1">
                <img src={settingsIcon} alt="Settings icon" class="h-[100%] aspect-square ">
            </a>
        </div>
        <div class="bg-black w-[100%] h-[2px] my-2"></div>

        <div class="flex flex-col items-center">
            <article class="flex flex-col mt-6 min-w-1/2 max-w-[600px]">
                {@html data.article}
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
<div class="h-40"></div>
</main>
<script>
    import { enhance } from "$app/forms";
    import xIcon from '$lib/assets/x-icon-png-25-1047506122.png'
    import gotoArrow from '$lib/assets/arrow-up-right-from-square-svgrepo-com.svg'

    /** @type {import('./$types').PageProps} */
    let { data } = $props();

    let popup = $state();
    function closePopup() {
        popup.classList.add('scale-0');
    }
    function openPopup() {
        popup.classList.remove('scale-0');
    }

    let possibleNewArticles = $state([]);
    for (let i = 0; i < data.titles.length; i++) {
        let skip = false;
        for (let k = 0; k < data.articles.length; k++) {
            if (data.titles[i].id === data.articles[k].id) {
                skip = true;
                break;
            }
        }
        if (!skip) possibleNewArticles.push(data.titles[i]);
    }
</script>


<main class="flex flex-col items-center font-roboto-serif">
    <div class="w-3/4 mt-10 flex flex-col">
        <h class="text-5xl font-cantata ">Admin Panel</h>

        <div class="text-xl mt-4">Front Page Settings</div>
        <form method="POST" action="?/saveSettings" class="flex font-roboto-serif border-1 py-1.5 max-w-[900px] items-center" use:enhance>
            <div class="ml-2">
                <div>Front Article</div>
                <select name="frontArticle" class="w-64">
                    {#each data.articles as title}
                        <option value={title.id}>{title.title}</option>
                    {/each}
                </select>
            </div>
            <div class="ml-2">
                <div>New Article 1</div>
                <select name="newArticle1" class="w-64">
                    {#each data.articles as title}
                        <option value={title.id}>{title.title}</option>
                    {/each}
                </select>
            </div>
            <div class="ml-2">
                <div>New Article 2</div>
                <select name="newArticle2" class="w-64">
                    {#each data.articles as title}
                        <option value={title.id}>{title.title}</option>
                    {/each}
                </select>
            </div>
            <div class="ml-auto mr-2"> 
                <button class="ml-auto border-1 p-1.5 px-2.5" type="submit">Save</button>
            </div>
        </form>
        <div class="flex w-full items-center mt-6">
            <h class="text-xl mr-8">Article Editor</h>
            <button class="font-roboto-serif p-1 border-1 w-32 text-center hover:bg-gray-200" onclick={openPopup}>Create Article</button> 
        </div>
        <div class="mt-2 border-1 min-h-[400px] max-w-[900px]">
            <ul class="ml-4 mt-3">
                {#each data.articles as article}
                    <li class="min-w-[500px] flex">
                        <a href="articles/{article.id}/admin" class="hover:text-blue-400">{article.title}</a>
                    </li>
                {/each}
            </ul>
        </div>

        <a class="text-xl mt-5 flex items-center hover:text-blue-400" href="/issues/admin">Issue Editor  <img src={gotoArrow} alt="Goto" class="h-5 ml-2"></a>

    </div>

    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] h-[200px] bg-gray-300 scale-0" bind:this={popup}>
        <div class="flex m-1.5">
            <h class="text-2xl m-2">New Article </h>
            <button class="ml-auto w-6 m-2" onclick={closePopup}><img src={xIcon} alt="x icon"></button>
        </div>
        <form class="mx-3.5" method="POST" action="?/newArticle" use:enhance={() => {
            closePopup();
            return async () => { window.location.reload(); };
        }}>
            <div>Article</div>
            <select name="article" class="w-full">
                {#each possibleNewArticles as art}
                    <option value={art.id}>{art.title}</option>
                {/each}
            </select>
            <div class="flex justify-center">
                <button class="translate-y-1/2 p-1 px-2 bg-white border-1" type="submit">Create</button>
            </div>

        </form>
    </div>
</main>

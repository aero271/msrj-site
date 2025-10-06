<script>
    import { enhance } from "$app/forms";

    /** @type {import('./$types').PageProps} */
    let { data, form } = $props();
</script>


<main class="flex flex-col items-center">
    <div class="w-3/4 mt-10">
        <h class="text-5xl font-cantata ">Admin Panel</h>

        <form method="POST" class="mt-8 font-roboto-serif" use:enhance>
            <div>Front Article</div>
            <select id="frontArticle" name="frontArticle" class="w-64">
                {#each data.titles as title}
                    <option value={title.id}>{title.title}</option>
                {/each}
            </select>
            <div class="mt-5">Password</div>
            <input name="password" type="password" class="w-64">
            {#if form?.success === false}
                <div class="text-sm text-red-500">Incorrect Password</div>
            {:else if form?.success === true}
                <div class="text-sm text-green-500">Updated Successfully!</div>
            {/if}

        </form>
    </div>

</main>

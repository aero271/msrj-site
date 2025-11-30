
<script>
    /** @type {import('./$types').PageProps} */
    import downloadIcon from '$lib/assets/download_1-1024-374789711.png'
    import Issue from '$lib/Issue.svelte';
    let { data } = $props();
    let mostRecentIssue = $state(data.issues[0]);
</script>

<main class="flex items-center flex-col mt-4 font-roboto-serif mx-2">
    <div class="w-full max-w-[1300px] flex flex-col mt-7 ">
        <h class="font-cantata text-5xl">Issues</h>
        <div class="w-full h-[1px] bg-black mt-2"></div>
        {#each data.issues as issue}
            <Issue issue={issue} />
        {/each}
    </div>  
</main>

<svelte:head>
    <title>Issues - Mastery: The Student Research Journal</title>
</svelte:head>
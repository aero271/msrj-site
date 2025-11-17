<script>
    /** @type {import('./$types').PageProps} */
    import Issue from '$lib/Issue.svelte';
    import { enhance } from '$app/forms';
    let { data } = $props();
    let mostRecentIssue = $state(data.issues[0]);

    let imageFileElements = $state([]);
    let textFileElements = $state([]);
    let imageFiles = [];
    let textFiles = [];

    function handleImage(i) { 
        imageFiles[i] = imageFileElements[i].files[0];
        console.log(imageFiles[i]);
    }
    function handleText(i) {
        textFiles[i] = textFileElements[i].files[0];
    }

</script>

<main class="flex items-center flex-col mt-4 font-roboto-serif">
    <div class="w-2/3 flex flex-col mt-7 ">
        <h class="font-cantata text-5xl">Issues</h>
        <div class="w-full h-[1px] bg-black mt-2"></div>
        {#each data.issues as issue, i}
            <div class="flex">
                <Issue issue={issue} />
                <div class="w-40 h-full flex flex-col items-center ml-2">
                    <div class="w-full mt-2 flex justify-center">
                        <input class="p-2 border-1" type="file" hidden bind:this={imageFileElements[i]} onchange={handleImage(i)}> 
                        <button class="p-2 border-1 w-3/4 hover:bg-gray-200" onclick={imageFileElements[i].click()} accept="image/*">Add Image</button> 
                    </div>
                    <div class="w-full mt-2 flex justify-center">
                        <input class="p-2 border-1" type="file" hidden bind:this={textFileElements[i]} onchange={handleText(i)} accept="application/pdf">
                        <button class="p-2 border-1 w-3/4 hover:bg-gray-200" onclick={textFileElements[i].click()}>Add Article Text</button> 
                    </div>
                    <form method="POST" action="?/save" enctype="multipart/form-data" class="mt-2 flex justify-center w-full" use:enhance={({ formData }) => {
                        formData.set('image', imageFiles[i]);
                        formData.set('text', textFiles[i]);
                        formData.set('id', issue.id);
                        return async () => { window.location.reload(); };
                    }}>
                        <button class="p-2 border-1 w-3/4 hover:bg-gray-200" type="submit">Save</button>
                    </form>
                </div>
            </div>
        {/each}
    </div>  
</main>
<script>
    import { enhance } from "$app/forms";
    import { updated } from "$app/state";
    import ImgPreview from "$lib/ImgPreview.svelte";
    import { onDestroy } from "svelte";

    let { data } = $props();

    let coverImgEl = $state();
    let iconImgEl = $state();
    let coverImgName = $state('');
    let iconImgName = $state('');
    let coverImgFile = null;
    let iconImgFile = null;

    import { EdraEditor, EdraToolBar, EdraBubbleMenu } from '$lib/components/edra/headless/index.js'
	import DragHandle from '$lib/components/edra/components/DragHandle.svelte';

    let content = $state(data.article);
	let editor = $state();
	let showSlashCommands = $state(true);
	let showLinkBubbleMenu = $state(true);
	let showTableBubbleMenu = $state(true);

    function onUpdate(props) {
		content = props.editor.getHTML();
	}

    onDestroy(() => {
        if (coverImgName != '') {
            URL.revokeObjectURL(data.metadata.coverImg);
        }
        if (iconImgName != '') {
            URL.revokeObjectURL(data.metadata.iconImg);
        }
    });

    function handleCoverImg() {
        coverImgFile = coverImgEl.files[0];
        coverImgName = coverImgFile.name;
        data.metadata.coverImg = URL.createObjectURL(coverImgFile);
    }
    function handleIconImg() {
        iconImgFile = iconImgEl.files[0];
        iconImgName = iconImgEl.name;
        data.metadata.iconImg = URL.createObjectURL(iconImgFile);
    }

</script>

<main class="flex flex-col items-center mt-12 font-roboto-serif">

    <div class="w-3/4">
        <form method="POST" action="?/saveMetadata">
            <input type="text" name="title" class="font-cantata text-6xl mb-3 w-full" bind:value={data.metadata.title}>
            <div class="flex h-8 items-center">
                <label for="author" class="italic">By</label>
                <input class="font-roboto-serif italic ml-5" id="author" name="authors" bind:value={data.metadata.authors}>
                <label for="section" class="ml-2">Section: </label>
                <select name="section" id="section" class="ml-2" bind:value={data.metadata.section}>
                    <option>None</option>
                    <option>Natural and Physical Sciences</option>
                    <option>Social Sciences</option>
                    <option>Humanities</option>
                </select>
                <label for="issue" class="ml-2">Issue: </label>
                <select name="issue" id="issue" class="ml-2" bind:value={data.metadata.issueId}>
                    {#each data.issues as issue}
                        <option value={issue.id}>{issue.title}</option>
                    {/each}
                </select>
                <button type="submit" class="ml-2 border-1 p-2 px-3 hover:bg-gray-200">Save Metadata</button>
            </div>
        </form>

        <div class="flex mt-4 w-full">
            <div class="w-[200px]">
                <div>
                    <input class="p-2 border-1" type="file" hidden bind:this={coverImgEl} onchange={handleCoverImg}> 
                    <button class="p-2 border-1 hover:bg-gray-200" onclick={coverImgEl.click()}>Add Cover Image</button> 
                </div>
                <div class="text-xs">Should be ~16:9</div>
                {#if data.metadata.coverImg}
                    {#key coverImgName} 
                        <ImgPreview imgSrc={data.metadata.coverImg} imgAlt="Article Cover" />
                    {/key}
                {/if}
            </div>
            <div class="w-[200px]">
                <div>
                    <input class="p-2 border-1" type="file" hidden bind:this={iconImgEl} onchange={handleIconImg}> 
                    <button class="p-2 border-1 hover:bg-gray-200" onclick={iconImgEl.click()}>Add Icon Image</button> 
                </div>
                <div class="text-xs">Should be ~1:1</div>
                {#if data.metadata.iconImg}
                    {#key iconImgName}
                        <ImgPreview imgSrc={data.metadata.iconImg} imgAlt="Article Icon" />
                    {/key}
                {/if}
            </div>
            
            <form method="POST" action="?/saveImages" enctype="multipart/form-data" use:enhance={({ formData }) => {
                formData.set('coverImg', coverImgFile);
                formData.set('iconImg', iconImgFile);
                return async () => { window.location.reload(); };
            }}>
                <input name="coverImg" type="file" hidden>
                <input name="iconImg" type="file" hidden>
                <button class="ml-15 p-2 border-1 hover:bg-gray-200" type="submit">Save Images</button>
            </form>
        </div>


        <div class="bg-black w-[100%] h-[2px] my-2"></div>

        <div class="flex flex-col items-center">
            <h class="font-roboto-serif text-4xl mt-4">Article Editor</h>
            <article class="flex flex-col mt-6 min-w-1/2 max-w-[700px]">

                <div class="flex text-xl">
                    <form method="POST" action="?/save" use:enhance={({ formData }) => {
                        formData.set('article', content);
                    }}>
                        <button type="submit" class="p-2 border-1 my-1 hover:bg-gray-200">Save</button>
                        <input type="hidden" name="article">
                    </form>
                </div>
                {#if editor}
                    <div class="border-x border-t p-1 w-full ">
                        <EdraToolBar {editor} class="p-1 items-center" />
                    </div>
                    <EdraBubbleMenu {editor} />
                    <DragHandle {editor} />
                {/if}
                <div class="border-b">
                    <EdraEditor
                        class="min-h-80 border-x p-2"
                        bind:editor
                        {content}
                        {showSlashCommands}
                        {showLinkBubbleMenu}
                        {showTableBubbleMenu}
                        {onUpdate}
                    />
                </div>

            </article>

            <div class="w-[100%] flex flex-col items-center mt-12">
                <div class="bg-black w-[100%] h-[2px] mb-2"></div>
            </div>
        </div>
    </div>
</main>
<div class="h-40"></div>

<style>
    select {
        appearance: none;
        background-image: none;
    }
</style>
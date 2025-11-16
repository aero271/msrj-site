
<script>
    // !! DEPRICATED AND CURRENT NOT USED !!
    // I just couldn't bring myself to delete it

    import trashCan from '$lib/assets/toppng.com-big-trash-can-vector-trash-can-icon-351x401.png'
    let { typeChangeHandler, contentChangeHandler, initialValues, deleteHandler, index } = $props();
    let type = $state();
    let content = $state();

    if (initialValues.type === 'p') {
        type = 'Paragraph';
    } else if (initialValues.type === 'h') {
        type = 'Header';
    } else if (initialValues.type === 'linebreak') {
        type = 'Linebreak';
    }
    content = initialValues.content

    $effect(() => {
        let newType = '';
        if (type === 'Paragraph') {
            newType = 'p';
        } else if (type === 'Header') {
            newType = 'h';
        } else if (type === 'Linebreak') {
            newType = 'linebreak';
        }
        typeChangeHandler(newType, index);
    });
    $effect(() => {
        contentChangeHandler(content, index);
    });
</script>

<div class="mt-1 w-full h-16 bg-gray-200 flex items-center rounded-sm">

    <label for="type" class="mx-5">Type:</label>
    <select name="type" bind:value={type}>
        <option>Paragraph</option>
        <option>Header</option>
        <option>Linebreak</option>
    </select> 
    <label for="content" class="ml-9 mr-5">Content:</label>
    {#if type === 'Paragraph' || type === 'Header'}
        <input name="content" type="text" class="mr-5 w-2/5" bind:value={content}>
    {:else if type === 'Linebreak'}
        <div name="content" class="italic">null</div>
    {/if}
    <button onclick={() => {deleteHandler(index)}} class="ml-auto mr-4 bg-white aspect-square min-w-10 border-1 flex items-center justify-center hover:bg-gray-200">
        <img src={trashCan} alt="Trash can" class="aspect-square w-7">
    </button>
</div>
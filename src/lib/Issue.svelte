
<script>
    import downloadIcon from '$lib/assets/download_1-1024-374789711.png'
    let { issue } = $props();
    
    const date = new Date(issue.datePublished);
    let formattedDate = $state();
    const months = [ //this is literally cave man shit, why does JS date API not have this feature??
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    formattedDate = `${months[date.getMonth()]} ${date.getFullYear()}`;

    function download() {
        const a = document.createElement('a');
        a.href = issue.text;
        a.download = 'issue'; 
        a.click();
    }
</script>

<div class="min-h-[500px] border-1 mt-2 bg-gray-200 flex w-full">
    <div class="w-1/2 m-4">
        <div class="w-full flex">
            <h3 class="font-cantata text-3xl">{issue.title.en}, {formattedDate}</h3>
            <button class="max-w-8 ml-auto hover:bg-gray-400 rounded-lg aspect-square" onclick={download}><img src={downloadIcon} alt="Download" class="max-w-full"></button>
        </div>
        <p class="text-lg">{@html issue.description.en}</p>
    </div>
    <div class="ml-auto max-w-1/3 flex justify-center m-4">
        <img src={issue.image} alt="Issue Cover">
    </div>
</div>
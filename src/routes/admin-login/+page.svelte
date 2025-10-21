<script>
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
</script>

<main class="flex flex-col items-center">
    <div class="w-3/4">
        <h class="font-roboto-serif">Admin Password</h>
        <form method="POST">
            <input type="password" name="password" class="w-64">
        </form>

    </div>

</main>
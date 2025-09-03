<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();




</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex w-screen bg-gray-600 h-20">

</nav>
{@render children?.()}

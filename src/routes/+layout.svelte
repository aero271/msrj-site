<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/msrj-logo.png';

	let { children } = $props();


</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Cantata+One&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet">
</svelte:head>

<header class="w-screen h-20 sticky top-0 z-10 bg-white">
	<div class="flex h-[100%]">
		<a href="/">
			<img src={logo} alt="msrj-logo.png" class="ml-20 h-[100%] w-auto block">
		</a>

	</div>

	<div class="w-screen h-[4px] bg-black"></div>
</header>

{@render children?.()}

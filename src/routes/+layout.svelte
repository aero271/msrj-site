<script>
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import logo from "$lib/assets/msrj-logo.png";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Cantata+One&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>Mastery: The Student Research Journal</title>
</svelte:head>

<header
	class="w-screen h-20 sticky top-0 z-10 bg-white flex flex-col items-center font-roboto-serif"
>
	<div class="flex h-[95%] w-full max-w-[1300px] items-center">
		<a href="/" class="h-full">
			<img src={logo} alt="MSRJ Logo" class="h-full block" />
		</a>
		<a
			href="/articles"
			class="h-[95%] flex justify-center items-center ml-auto px-3 text-xl hover:bg-gray-200"
			><div>Articles</div></a
		>
		<a
			href="/issues"
			class="h-[95%] flex justify-center items-center px-3 text-xl hover:bg-gray-200"
			><div>Issues</div></a
		>
		<a
			href="/about"
			class="h-[95%] flex justify-center items-center px-3 text-xl hover:bg-gray-200"
			><div>About</div></a
		>
		<a href="/editorial" class="h-[95%] flex justify-center items-center px-3 text-xl hover:bg-gray-200">
			<div>Editorial Board</div>
		</a>
	</div>
	<div class="w-screen h-[4px] bg-black"></div>
</header>
{@render children?.()}
<footer class="min-h-[32vh] w-screen mt-20 bg-gray-100 flex flex-col items-center font-roboto-serif justify-center">
	<div class="bg-black w-full h-[1px]"></div>
	<div class="w-2/3 h-full mt-2 flex justify-center">
		<div class="w-2/5">
			<h class="font-cantata w-full text-lg">Mastery: The Student Research Journal</h>
			<p class="italic text-sm my-2">
				A research journal for the rest of us.
			</p>
			<img src={logo} alt="MSRJ Logo" class="w-1/2 mt-2" />
			<p class="mt-2 text-sm">Contact: 26husimr@hawken.edu</p>
		</div>
		<div class="w-2/5 flex flex-col underline mt-18">
			<a href="/" class="hover:text-gray-400 my-1">Home</a>
			<a href="/articles" class="hover:text-gray-400 my-1">Articles</a>
			<a href="/about" class="hover:text-gray-400 my-1">About</a>
			<a href="/admin" class="hover:text-gray-400 my-1">For Administrators</a>
			<a href="https://masteryjournel.freedynamicdns.org" class="hover:text-gray-400 my-1">For Authors</a>
		</div>
	</div>
</footer>

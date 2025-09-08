
<script>
    import { cmsApiBase, cmsAuth } from "$lib/cms-link";
    import { strapi } from "@strapi/client";
    import ArticleBig from "$lib/ArticleBig.svelte";
    
    let frontArticle = $state();

    async function getHomePage() {
        const client = strapi({
            baseURL: cmsApiBase,
            auth: cmsAuth
        });
        const s = client.single('home-page');
        const home = await s.find({ populate: ['front_article', 'featured_articles']});
        const c = client.collection('articles');

        frontArticle = await c.findOne(home.data.front_article.documentId, { populate: 'display_image' });
    }
    getHomePage();

</script>

<div class="flex justify-center mt-4">
    <div class="lg:w-2/3 flex justify-center">
        <div class="w-[70%] ">
            <ArticleBig article={frontArticle} ></ArticleBig>
        </div>

        <div class="w-[25%] flex flex-col items-center">
            <ArticleBig article={frontArticle}></ArticleBig>

            <div class="w-[100%] ml-2">
                <a class="font-cantata hover:text-gray-400 transition-all"
                 href="/new-articles">More New Articles...</a>
            </div>
        </div>

    </div>

</div>

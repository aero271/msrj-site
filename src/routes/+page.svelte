
<script>
    import { cmsApiBase, cmsAuth } from "$lib/cms-link";
    import { strapi } from "@strapi/client";
    import ArticleBig from "$lib/ArticleBig.svelte";
    
    let frontArticle = $state();
    let newArticles = $state(new Array());

    async function getHomePage() {
        const client = strapi({
            baseURL: cmsApiBase,
            auth: cmsAuth
        });
        const s = client.single('home-page');
        const home = await s.find({ populate: ['front_article', 'featured_articles', 'new_articles']});
        const c = client.collection('articles');

        frontArticle = await c.findOne(home.data.front_article.documentId, { populate: 'display_image' });
        for (let newArt of home.data.new_articles) {
            const n = await c.findOne(newArt.documentId, { populate: 'display_image' });
            newArticles.push(n);
        }

    }
    getHomePage();

</script>

<div class="flex justify-center mt-4">
    <div class="lg:w-2/3 flex justify-center">
        <div class="w-[70%] ">
            <ArticleBig article={frontArticle} ></ArticleBig>
        </div>

        <div class="w-[25%] flex flex-col items-center">
            <div class="h-1/2 w-[100%]">
                <ArticleBig article={newArticles[0]}></ArticleBig>
            </div>
            <div class="h-1/2 w-[100%]">
                <ArticleBig article={newArticles[1]}></ArticleBig>
            </div>

            <div class="bg-black w-[100%] h-[1px]"></div>
            <div class="w-[100%] ml-2">
                <a class="font-cantata hover:text-gray-400 transition-all"
                 href="/new-articles">More New Articles...</a>
            </div>
        </div>

    </div>

</div>

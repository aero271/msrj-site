
<script>
    import { cmsApiBase, cmsAuth } from "$lib/cms-link";
    import { strapi } from "@strapi/client";
    import ArticleBig from "$lib/ArticleBig.svelte";
    
    let frontArticle = $state();
    let newArticles = $state(new Array());

    async function getHomePage() {
        try {
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
        } catch (error) {
            console.error("Home Page Fetching Error: \n", error);
        }
    }
    getHomePage();

</script>

<div class="flex items-center flex-col mt-4">
    <div class="w-2/3 flex justify-center max-h-[90vh]">
        <div class="w-[70%] ">
            <ArticleBig article={frontArticle} ></ArticleBig>
        </div>

        <div class="w-[25%] flex flex-col items-center ml-6">
            <div class="max-h-1/2 w-[100%] mb-1">
                <ArticleBig article={newArticles[0]}></ArticleBig>
            </div>
            <div class="max-h-1/2 w-[100%]">
                <ArticleBig article={newArticles[1]}></ArticleBig>
            </div>

            <div class="w-[100%] ml-2">
                <a class="font-cantata hover:text-gray-400 transition-all"
                 href="/new-articles">More New Articles...</a>
            </div>
        </div>
    </div>
    <div>

    </div>

</div>

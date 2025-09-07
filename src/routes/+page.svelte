
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
        console.log(frontArticle)
    }
    getHomePage();

</script>

<div>
    <div class="w-screen flex">
        <ArticleBig article={frontArticle}></ArticleBig>

        <div class="w-[25%]">

        </div>
    </div>

</div>

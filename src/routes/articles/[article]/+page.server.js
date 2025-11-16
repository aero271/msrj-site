import { pool } from '$lib/server/db';
import { cmsApiBase, cmsBase } from '$lib/cms-link';
import { OJS_API, FILE_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [params.article]);
    const article = rows[0].content;

    return { 
        article: article,
        metadata: {
            title: rows[0].title,
            authors: rows[0].authors,
            coverImg: rows[0].cover_img,
            iconImg: rows[0].icon_img,
            id: params.article,
        }
     };
};

export const actions = {
    getPDF: async ({ params }) => {

    }
}
import { pool } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [rows] = await pool.query('SELECT * FROM articles;');
    let articles = [];
    for (let article of rows) {
        articles.push({
            id: article.id,
            title: article.title,
            authors: article.authors,
            coverImg: article.cover_img,
            iconImg: article.icon_img,
            issue: {
                id: article.issue_id,
                name: article.issue_name,
            }
        });
    }

    return { articles };
};
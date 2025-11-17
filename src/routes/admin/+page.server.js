import { createHash } from 'crypto';
import { cmsApiBase } from '$lib/cms-link';
import { OJS_API, ADMIN_KEY } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { pool } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.authed) {
        throw redirect(302, '/admin-login');
    }
    
    const url = cmsApiBase + 'submissions';
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const submissions = await response.json();
    let titles = new Array();
    for (let i = 0; i < submissions.items.length; i++) {
        try {
            titles.push({ 
                title: submissions.items[i].publications[0].fullTitle.en, 
                id: submissions.items[i].id
            });
        } catch (e) {
            console.error(`Submission title parsing error: ${e}`);
        }
    }

    const [rows] = await pool.query("SELECT * FROM articles;");
    let articles = new Array();
    for (let article of rows) {
        articles.push({
            title: article.title,
            id: article.id 
        });
    }

    return { titles, articles };
};

export const actions = {
    newArticle: async ({ request }) => {
        const data = await request.formData();
        const articleId = Number(data.get('article'));

        const url = cmsApiBase + 'submissions/' + articleId;
        const response = await fetch(url, { 
            headers: { 'Authorization': `Bearer ${OJS_API}` }
        });
        const article = await response.json();

        const authors = article.publications[0].authorsString;
        const title = article.publications[0].fullTitle.en;
        let issueId = null;
        let issueName = null;
        if (article.issueToBePublished) {
            issueId = article.issueToBePublished.id;
            issueName = article.issueToBePublished.label;
        }
        
        const insertSql =  `INSERT INTO articles (id, content, title, authors, issue_id, issue_name)
                            VALUES (?, ?, ?, ?, ?, ?);`
        await pool.execute(insertSql, [articleId, '<p></p>', title, authors, issueId, issueName]);
    },
    saveSettings: async ({ request }) => {
        const data = await request.formData();
        const front = data.get('frontArticle');
        const new1 = data.get('newArticle1');
        const new2 = data.get('newArticle2');

        writeFileSync('config.json', JSON.stringify({ 
            frontArticle: front,
            newArticle1: new1,
            newArticle2: new2,
        }));
    }
}
import { fail, redirect } from '@sveltejs/kit';
import { pool } from '$lib/server/db';
import { OJS_API, FILE_API_KEY } from '$env/static/private';
import { cmsApiBase, cmsBase } from '$lib/cms-link';
import { parsePDF } from '$lib/server/parsePDF';
import { randomUUID } from 'crypto';
import { extname, basename } from 'path';
import { parse } from 'node-html-parser';
import { executionAsyncId } from 'async_hooks';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (!locals.authed) {
        throw redirect(302, '/admin-login');
    }

    let url = cmsApiBase + 'submissions/' + params.article;
    let response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const articleMetadata = await response.json();

    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?;", [params.article]);
    const article = rows[0].content;

    let possibleIssues = [];
    url = cmsApiBase + 'issues';
    response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const issues = await response.json();
    for (let i = 0; i < issues.items.length; i++) {
        possibleIssues.push({
            id: issues.items[i].id,
            title: issues.items[i].title.en,
        });
    }
    

    return { 
        article: article,
        metadata: {
            title: rows[0].title,
            authors: rows[0].authors,
            coverImg: rows[0].cover_img,
            iconImg: rows[0].icon_img,
            section: rows[0].section,
            issueId: rows[0].issue_id,
            issueName: rows[0].issue_name,
        },
        issues: possibleIssues,
     };
};

async function postImage(file, imgName) {
    let params = new URLSearchParams({ path: imgName }).toString();
    const response = await fetch(`${cmsBase}file-api/?${params}`, {
        headers: { 'Authorization': `${FILE_API_KEY}` },
        method: 'POST',
        body: await file.arrayBuffer(),
    });
    if (response.status !== 200) {
        console.error(`Image POST failed with ${response.status}`);
        return false;
    }
    else return true;
}

function handleNewImage(src) {
    
}

export const actions = {
    save: async ({ request, params, locals }) => { 
        if (!locals.authed) return fail(401);

        const form = await request.formData();
        const article = form.get('article');

        const insertSql =  `INSERT INTO articles (id, content)
                            VALUES (?, ?)
                            ON DUPLICATE KEY UPDATE
                            content = VALUES(content);`
        try {
            pool.execute(insertSql, [params.article, article]);
        } catch (error) {
            console.error('Error inserting into SQL table', error);
        }
    },
    saveImages: async ({ request, params, locals }) => {
        if (!locals.authed) return fail(401);
        const data = await request.formData();
        const cover = data.get('coverImg');
        const icon = data.get('iconImg');
        
        let imgID = '';
        let imgName = '';

        // if image already exists, do this to overwrite existing one instead of making infinite untraceable duplicates
        const [article] = await pool.query('SELECT * FROM articles WHERE id = ?;', [params.article]);

        if (cover && cover.size > 0) {
            if (article[0].cover_img) {
                const url = new URL(article[0].cover_img);
                const fullName = url.searchParams.get('path');
                imgID = basename(fullName, extname(fullName));

            } else imgID = randomUUID();
            imgName = imgID + extname(cover.name);
            
            if(!await postImage(cover, imgName)) {
                console.error('Image Upload Error');
                fail(500, { error: 'Image upload failed' });
                return;
            }

            const updateSql = `UPDATE articles
            SET cover_img = ? WHERE id = ?;`
            let searchParams = new URLSearchParams({ path: imgName }).toString();
            const imgPath = `${cmsBase}file-api/?${searchParams}`
            pool.execute(updateSql, [imgPath, params.article])
        }
        if (icon && icon.size > 0) {
            if (article[0].icon_img) {
                const url = new URL(article[0].icon_img);
                const fullName = url.searchParams.get('path');
                imgID = basename(fullName, extname(fullName));
            } else imgID = randomUUID();
            imgName = imgID + extname(icon.name);

            if(!await postImage(icon, imgName)) {
                console.error('Image Upload Error');
                fail(500, { error: 'Image upload failed' });
                return;
            }

            const updateSql = `UPDATE articles
            SET icon_img = ? WHERE id = ?;`
            let searchParams = new URLSearchParams({ path: imgName }).toString();
            const imgPath = `${cmsBase}file-api/?${searchParams}`
            pool.execute(updateSql, [imgPath, params.article])
        }
    },
    saveMetadata: async ({ request, params, locals }) => {
        if (!locals.authed) return fail(401);
        const data = await request.formData();
        const title = data.get('title');
        const authors = data.get('authors');
        const section = data.get('section');
        const issue = data.get('issue');
        let issueName = ''; 
        if (issue) {
            const url = cmsApiBase + 'issues/' + issue;
            const response = await fetch(url, { 
                headers: { 'Authorization': `Bearer ${OJS_API}` }
            });
            issueName = (await response.json()).title.en;
        }

        let updateSql = `UPDATE articles
        SET title = ?, authors = ?, section = ?, issue_id = ?, issue_name = ? WHERE id = ?;`
    
        try {
            await pool.execute(updateSql, [title, authors, section, issue, issueName, params.article]);
        } catch (error) {
            fail(401, `Article metadata update error: ${error}`);
        }
    }
}

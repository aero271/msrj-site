import { cmsApiBase, cmsBase } from '$lib/cms-link';
import { OJS_API, FILE_API_KEY } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { pool } from '$lib/server/db';
import { randomUUID } from 'crypto'
import { extname, basename } from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.authed) throw redirect(302, '/admin-login');

    const url = cmsApiBase + 'issues';
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    let issues = await response.json();
    const [rows] = await pool.query('SELECT * FROM issues;');
    for (let i = 0; i < rows.length; i++) {
        for (let k = 0; k < issues.items.length; k++) {
            if (rows[i].id === issues.items[k].id) {
                issues.items[k].image = rows[i].image;
                issues.items[k].text = rows[i].text;
            }
        }
    }
    return { 
        issues: issues.items
    };
};

export const actions = {
    save: async ({ request, locals }) => {
        if (!locals.authed) fail(401);
        
        const data = await request.formData();
        const image = data.get('image');
        const text = data.get('text')
        const id = Number(data.get('id'));

        const [rows] = await pool.query('SELECT * FROM issues WHERE id = ?;', [id]);

        if (image.size > 0) {
            let imgId = '';
            if (rows && rows[0]?.image) {
                const url = new URL(rows[0].image);
                const fullName = url.searchParams.get('path');
                imgId = basename(fullName, extname(fullName));
            } else {
                imgId = randomUUID();
            }
            const params = new URLSearchParams({ path: `${imgId}${extname(image.name)}`})
            const path = `${cmsBase}file-api/?${params.toString()}`;

            const response = await fetch(path, {
                headers: { 'Authorization': `${FILE_API_KEY}` },
                method: 'POST',
                body: await image.arrayBuffer(),
            });
            if (response.status !== 200) {
                console.error(`Image POST failed with ${response.status}`);
                fail(500);
            }
            const insertSql =  `INSERT INTO issues (id, image)
                                VALUES (?, ?)
                                ON DUPLICATE KEY UPDATE
                                image = VALUES(image);`
            await pool.execute(insertSql, [id, path]);
        }
        if (text.size > 0) {
            let textId = '';
            if (rows && rows[0]?.text) {
                const url = new URL(rows[0].text);
                const fullName = url.searchParams.get('path');
                textId = basename(fullName, extname(fullName));
            } else {
                textId = randomUUID();
            }
            const params = new URLSearchParams({ path: `${textId}${extname(text.name)}`})
            const path = `${cmsBase}file-api/?${params.toString()}`;

            const response = await fetch(path, {
                headers: { 'Authorization': `${FILE_API_KEY}` },
                method: 'POST',
                body: await text.arrayBuffer(),
            });
            if (response.status !== 200) {
                console.error(`Image POST failed with ${response.status}`);
                fail(500);
            }
            const insertSql =  `INSERT INTO issues (id, text)
                                VALUES (?, ?)
                                ON DUPLICATE KEY UPDATE
                                text = VALUES(text);`
            await pool.execute(insertSql, [id, path]);
        }
    }
}

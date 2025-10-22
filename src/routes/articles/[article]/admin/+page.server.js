import { redirect } from '@sveltejs/kit';
import { pool } from '$lib/server/db';
import { OJS_API } from '$env/static/private';
import { cmsApiBase } from '$lib/cms-link';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (!locals.authed) {
        throw redirect(302, '/admin-login');
    }

    const url = cmsApiBase + 'submissions/' + params.article;
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const articleMetadata = await response.json();

    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [params.article]);

    return { 
        article: rows,
        metadata: articleMetadata.publications[0]
     };
};
import { cmsApiBase } from '$lib/cms-link';
import { OJS_API } from '$env/static/private';
import { pool } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {

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

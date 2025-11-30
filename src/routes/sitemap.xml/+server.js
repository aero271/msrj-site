import { pool } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let urls = [
        '/about',
        '/articles',
        '/editorial',
        '/issues'
    ];
    
    const [articles] = await pool.query('SELECT * FROM articles;');
    for (let a of articles) {
        urls.push(`/articles/${a.id}`);
    }
    let xmlBody = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for (let url of urls) {
        xmlBody += `<url><loc>https://masteryjournal.org${url}</loc></url>`
    }
    xmlBody += '</urlset>'

    return new Response(xmlBody, { headers: { 'Content-Type': 'application/xml' }});
};
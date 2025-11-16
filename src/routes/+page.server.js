import { pool } from '$lib/server/db';
import { readFileSync } from 'fs';
import { toMetadata } from '$lib/server/toMetadata';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const config = JSON.parse(readFileSync('config.json'));
    const [front] = await pool.query('SELECT * FROM articles WHERE id = ?;', [config.frontArticle]);
    const [new1] = await pool.query('SELECT * FROM articles WHERE id = ?;', [config.newArticle1]);
    const [new2] = await pool.query('SELECT * FROM articles WHERE id = ?;', [config.newArticle2]);

    let sciences = [];
    let social = [];
    let hum = [];
    let [articles] = await pool.query('SELECT * FROM articles;');
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].section === 'Natural and Physical Sciences') {
            sciences.push(toMetadata(articles[i]));
            continue;
        } 
        if (articles[i].section === 'Social Sciences') {
            social.push(toMetadata(articles[i]));
            continue;
        }
        if (articles[i].section === 'Humanities') {
            hum.push(toMetadata(articles[i]));
            continue;
        }
    }
    
    return { 
        frontArticle: {
            title: front[0].title,
            authors: front[0].authors,
            coverImg: front[0].cover_img,
            iconImg: front[0].icon_img,
            id: front[0].id
        },
        new1: {
            title: new1[0].title,
            authors: new1[0].authors,
            coverImg: new1[0].cover_img,
            iconImg: new1[0].icon_img,
            id: new1[0].id

        },
        new2: {
            title: new2[0].title,
            authors: new2[0].authors,
            coverImg: new2[0].cover_img,
            iconImg: new2[0].icon_img,
            id: new2[0].id
        },
        sciences,
        social,
        hum,
    };
};
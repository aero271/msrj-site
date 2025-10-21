import { createHash } from 'crypto';
import { cmsApiBase } from '$lib/cms-link';
import { OJS_API, ADMIN_KEY } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';

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
                id: submissions.items[i].currentPublicationId
            });
        } catch (e) {
            console.error(`Submission title parsing error: ${e}`);
        }
    }

    return { titles };
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const password = data.get('password');
        if (createHash('sha256').update(password).digest('hex') !== ADMIN_KEY)
            return fail(401, { success: false, message: 'Incorrect Password' });

        const contentConfig = {
            frontArticle: Number(data.get('frontArticle')),
        }
        writeFileSync('./config.json', JSON.stringify(contentConfig));
        
        return { success: true };
    },

}
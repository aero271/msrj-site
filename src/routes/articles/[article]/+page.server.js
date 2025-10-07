import { cmsApiBase } from '$lib/cms-link';
import { OJS_API } from '$env/static/private';
import { parsePDF } from '$lib/server/parsePDF';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const url = cmsApiBase + 'submissions/' + params.article;
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const articleMetadata = await response.json();
    /**
     * TODO: check cache here to avoid pdf parsing happening repeatidly
    */
    const pdfData = await parsePDF(params.article);

    return {
         metadata: articleMetadata.publications[0],
    };
};
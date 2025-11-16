import { cmsApiBase, cmsBase } from '$lib/cms-link';
import { OJS_API, FILE_API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const id = url.searchParams.get('id');
    const fileUrl = `${cmsApiBase}/submissions/${id}/files`;
    const response = await fetch(fileUrl , { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const fileMetadata = await response.json();

    let searchParams = new URLSearchParams({ path: fileMetadata.items[0].path }).toString();
    const fileResponse= await fetch(`${cmsBase}file-api/?` + searchParams, {
        headers: { 'Authorization': `${FILE_API_KEY}` }
    });
    const pdfRaw = await fileResponse.arrayBuffer();
    return new Response(pdfRaw, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=article.pdf'
        }
    });
};
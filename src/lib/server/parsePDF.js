import { PDFExtract } from "pdf.js-extract";
import { cmsApiBase } from "$lib/cms-link";
import { OJS_API } from "$env/static/private";

export async function parsePDF(articleId) {
    const url = `${cmsApiBase}/submissions/${articleId}/files`;
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const fileMetadata = await response.json();
    const pdfRaw = await fetch(fileMetadata.items[0].url, {
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    console.log(pdfRaw.headers)
}
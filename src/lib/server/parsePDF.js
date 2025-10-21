import { PDFExtract } from "pdf.js-extract";
import { cmsApiBase, cmsBase } from "$lib/cms-link";
import { OJS_API, FILE_API_KEY } from "$env/static/private";

export async function parsePDF(articleId) {
    const url = `${cmsApiBase}/submissions/${articleId}/files`;
    const response = await fetch(url, { 
        headers: { 'Authorization': `Bearer ${OJS_API}` }
    });
    const fileMetadata = await response.json();

    let params = new URLSearchParams({ path: fileMetadata.items[0].path }).toString();
    const fileResponse= await fetch(`${cmsBase}file-api/?` + params, {
        headers: { 'Authorization': `${FILE_API_KEY}` }
    });
    const pdfRaw = await fileResponse.arrayBuffer();

    // now that we have the article pdf, use PDFExtract to get the text content then walk through the output and format it in paragraphs
    const pdfExtract = new PDFExtract();
    const extractOutput = await pdfExtract.extractBuffer(pdfRaw, {});

    let processed = new Array();
    let isLastElementLinebreak = true;
    for (let page of extractOutput.pages) {
        for (let i = 0; i < page.content.length; i++) { 
            const element = page.content[i];
            if (element.height < 11) {
                continue;
            }

            if (element.str === '') {
                processed.push({ type: 'linebreak', content: null });
                isLastElementLinebreak = true;
            } else {
                if (!isNaN(element.str)) continue; // to get rid of page numbers

                if (isLastElementLinebreak && page.content.length > i + 1) { //checking for heading
                    if (page.content[i + 1].str === '' && element.str !== '') {
                        processed.push({ type: 'h', content: element.str});
                        isLastElementLinebreak = false;
                        continue;
                    }
                }

                if (processed[processed.length - 1]?.type === 'p') { // continuing previous paragraph case
                    processed[processed.length - 1].content += ` ${element.str}`;

                } else { // new paragraph case
                    processed.push({ type: 'p', content: element.str });
                }
                isLastElementLinebreak = false;
            }
        }
    }
    return processed;
}

export function toMetadata(article) {
    return {
        title: article.title,
        authors: article.authors,
        coverImg: article.cover_img,
        iconImg: article.icon_img,
        section: article.section,
        id: article.id
    };
}
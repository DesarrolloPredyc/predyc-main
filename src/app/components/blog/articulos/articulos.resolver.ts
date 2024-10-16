import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleService, ArticleWithAuthorName } from '../../../shared/services/article.service';

// Define the resolver function
export const _articlesResolver: ResolveFn<Observable<any>> = (route, state) => {
  const articleService = inject(ArticleService);
  const articleSlug = route.paramMap.get('slug')
  return articleService.getArticleWithAuthorNameBySlug(articleSlug).pipe(
    map(async (articleWithAuthorName: ArticleWithAuthorName)  => {
      const htmlUrl = articleWithAuthorName['dataHTMLUrl']
      const response = await fetch(htmlUrl);
      const htmlContent = await response.text(); // Obtener el contenido como texto
      articleWithAuthorName['dataHTML'] = htmlContent; // Asignar el HTML al campo dataHTML
      return {
          title: articleWithAuthorName.titleSEO,
          description: articleWithAuthorName.metaDescription ? articleWithAuthorName.metaDescription : articleWithAuthorName.summary,
          robots: articleWithAuthorName.isDraft ? "nofollow, noindex" : "follow, index",
          // ogUrl: null,
          // ogTitle: null,
          // ogDescription: null,
          // ogImage: null,
          keywords: articleWithAuthorName['keyWords'],
          canonical: `https://predyc.com/articulos/${articleSlug}`,
          articleWithAuthorName
      }
    })
  )
};


export const articlesResolver: ResolveFn<Promise<any>> = async (route, state) => {
  const articleService = inject(ArticleService);
  const articleSlug = route.paramMap.get('slug');

  try {
    let articleWithAuthorName = null
    if (false){
    // Importar dinámicamente el JSON basado en el slug
   }
    else{
      articleWithAuthorName = await articleService.getArticleWithAuthorNameBySlugNew(articleSlug);
      const htmlUrl = articleWithAuthorName.dataHTMLUrl
      const response = await fetch(htmlUrl);
      const htmlContent = await response.text(); // Obtener el contenido como texto
      articleWithAuthorName.dataHTML = htmlContent; // Asignar el HTML al campo dataHTML
    }
    const data = {
      title: articleWithAuthorName.titleSEO,
      description: articleWithAuthorName.metaDescription || articleWithAuthorName.summary,
      robots: articleWithAuthorName.isDraft ? "nofollow, noindex" : "follow, index",
      keywords: articleWithAuthorName['keyWords'],
      canonical: `https://predyc.com/blog/${articleSlug}`,
      ogUrl: `https://predyc.com/blog/${articleSlug}`,
      ogTitle: articleWithAuthorName.titleSEO,
      ogDescription: articleWithAuthorName.metaDescription || articleWithAuthorName.summary,
      ogImage: articleWithAuthorName.photoUrl ? articleWithAuthorName.photoUrl : null,
      articleWithAuthorName
    };

    //seoService.setMetaTagsForResolvers(metaService, titleService, data);

    console.log("Meta tags set for article");

    return data;

  } catch (error) {
    // console.error('Error resolving article:', error);
    throw error;
  }
};
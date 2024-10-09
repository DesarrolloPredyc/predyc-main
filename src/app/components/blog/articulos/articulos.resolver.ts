import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleService, ArticleWithAuthorName } from '../../../shared/services/article.service';

// Define the resolver function
export const articlesResolver: ResolveFn<Observable<any>> = (route, state) => {
  const articleService = inject(ArticleService);
  const articleSlug = route.paramMap.get('slug')
  return articleService.getArticleWithAuthorNameBySlug(articleSlug).pipe(
    map((articleWithAuthorName: ArticleWithAuthorName)  => {
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
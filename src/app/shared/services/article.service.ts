import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, from, map, of, switchMap, throwError } from 'rxjs';
import { Article, ArticleCategory, ArticleCategoryJson, ArticleData, ArticleJson, ArticleTag, ArticleTagJson } from '../models/article.model';
import { CategoryJson } from '../models/category.model';
import { Curso } from '../models/course.model';
import { CategoryService } from './category.service';
import { AuthorService } from './author.service';
import { CourseService } from './course.service';

export interface ArticleWithAuthorName extends ArticleData {
  author: any;
    tags: ArticleTagJson[]
    pillars: CategoryJson[]
    categories: ArticleCategoryJson[]
    courses: Curso[]
    authorName: string;
    authorId: string
  }

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private afs: AngularFirestore,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private courseService: CourseService
  ) { }

  // route.paramMap.get('slug')
  getArticleWithAuthorNameBySlug(slug): Observable<ArticleWithAuthorName> {
    return this.getArticleWithDataBySlug$(slug).pipe(
      switchMap((article: ArticleData) => {
        console.log('article',article)
        const ids = {
          tagsIds: article.tagsRef?.map(x => x.id),
          pillarsIds: article.pillarsRef?.map(x => x.id),
          categoriesIds: article.categoriesRef?.map(x => x.id),
          coursesIds: article.coursesRef?.map(x => x.id),
          authorId: article?.authorRef?.id
        };
        const dataSources: Observable<any>[] = [
          this.getArticleTagsByIds$(ids.tagsIds),
          this.categoryService.getCategoriesByIds(ids.pillarsIds),
          this.authorService.getAuthorById$(ids.authorId),
          this.getArticleCategoriesByIds$(ids.categoriesIds),
          this.courseService.getCoursesByIds$(ids.coursesIds)
        ]
        return combineLatest(dataSources).pipe(
          map(([tags, pillars, author, categories, courses]) => {
            return {
              ...article,
              tags,
              pillars,
              categories,
              courses,
              author:author,
              authorName: author.name,
              authorId: author.id
            }
          })
        )}))
  }

  getArticles$(): Observable<ArticleJson[]> {
    return this.afs.collection<ArticleJson>(Article.collection, ref => ref.orderBy("orderNumber", "asc")).valueChanges();
  }
  
  // getNonDraftArticles$(): Observable<ArticleJson[]> {
  //   return this.afs.collection<ArticleJson>(Article.collection, ref => ref.orderBy("orderNumber", "asc").where("isDraft", "==", false)).valueChanges();
  // } 

  getNonDraftArticles$(source: 'all' | 'predyc'| 'predictiva'): Observable<ArticleJson[]> {
    if (source === 'predyc') return this.afs.collection<ArticleJson>(
      Article.collection, ref => ref.orderBy("orderNumber", "asc").where("isDraft", "==", false).where("isFromPredyc", "==", true)
    ).valueChanges();

    else if (source === 'predictiva') return this.afs.collection<ArticleJson>(
      Article.collection, ref => ref.orderBy("orderNumber", "asc").where("isDraft", "==", false).where("isFromPredyc", "==", false)
    ).valueChanges();

    else return this.afs.collection<ArticleJson>(Article.collection, ref => ref.orderBy("orderNumber", "asc").where("isDraft", "==", false)).valueChanges();
    
  } 

  getArticleWithDataById$(articleId: string): Observable<ArticleData> {
    return combineLatest([
      this.afs.collection(Article.collection).doc(articleId).valueChanges(),
      this.afs.collection(Article.collection).doc(articleId).collection(Article.objectSubcollectionName).valueChanges(),
      this.afs.collection(Article.collection).doc(articleId).collection(Article.HTMLSubcollectionName).valueChanges()
    ]).pipe(
      map(([articleMainData, dataChunks, htmlChunks]: [any, any[], any[]]) => {
        const data = [];
        dataChunks.forEach(chunk => {
          const chunkContent: any[] = chunk.content;
          data.push(...chunkContent);
        });
        const dataHTML = htmlChunks.map(chunk => chunk.content).join('');
        return {
          ...articleMainData,
          data,
          dataHTML
        };
      })
    );
  }

  getArticleWithDataBySlug$(slug: string): Observable<ArticleData> {
    // Query to find the document with the matching slug
    return this.afs.collection<ArticleJson>(Article.collection, ref => ref.where('slug', '==', slug)).valueChanges().pipe(
      switchMap(actions => {
        if (actions.length === 0) return of([]); // Return empty array if no article is found
        const articleId = actions[0].id;
        return combineLatest([
          this.afs.collection(Article.collection).doc(articleId).valueChanges(),
          this.afs.collection(Article.collection).doc(articleId).collection(Article.objectSubcollectionName).valueChanges(),
          this.afs.collection(Article.collection).doc(articleId).collection(Article.HTMLSubcollectionName).valueChanges()
        ]).pipe(
          map(([articleMainData, dataChunks, htmlChunks]: [any, any[], any[]]) => {
            const data = [];
            dataChunks.forEach(chunk => {
              const chunkContent: any[] = chunk.content;
              data.push(...chunkContent);
            });
            const dataHTML = htmlChunks.map(chunk => chunk.content).join('');
            return {
              ...articleMainData,
              data,
              dataHTML
            };
          })
        );
      })
    );
  }

  getAllArticlesWithData$(): Observable<ArticleData[]> {
    return this.getArticles$().pipe(
      switchMap((articles: ArticleJson[]) => {
        const articleWithDataObservables = articles.map(article =>
          this.getArticleWithDataById$(article.id)
        );
        return combineLatest(articleWithDataObservables);
      })
    );
  }

  getAllNonDraftArticlesWithData$(source: 'all' | 'predyc'| 'predictiva'): Observable<ArticleData[]> {
    return this.getNonDraftArticles$(source).pipe(
      switchMap((articles: ArticleJson[]) => {
        const articleWithDataObservables = articles.map(article =>
          this.getArticleWithDataById$(article.id)
        );
        return combineLatest(articleWithDataObservables);
      })
    );
  }


  // getArticleTest$(slug): Observable<any[]> {
  //   return this.afs.collection<ArticleJson>(Article.collection, ref => ref.where('slug', '==', slug)).valueChanges()
  // }

  // --------- TAGS
  getArticleTagRefById(tagId: string): DocumentReference<ArticleTag> {
    return this.afs.collection<ArticleTag>(ArticleTag.collection).doc(tagId).ref
  }

  getAllArticleTags$(): Observable<ArticleTagJson[]> {
    return this.afs.collection<ArticleTag>(ArticleTag.collection).valueChanges()
  }

  getArticleTagsByIds$(tagsIds: string[]): Observable<ArticleTagJson[]> {
    if (!tagsIds || tagsIds.length === 0) {
      return of([]);
    }

    const tagObservables = tagsIds.map(tagId => this.afs.collection<ArticleTagJson>(ArticleTag.collection).doc(tagId).valueChanges());
    return combineLatest(tagObservables)
  }

  // --------- CATEGORIES
  getArticleCategoriesByIds$(categoriesIds: string[]): Observable<ArticleCategoryJson[]> {
    if (!categoriesIds || categoriesIds.length === 0) {
      return of([]);
    }

    const categoryObservables = categoriesIds.map(categoryId => this.afs.collection<ArticleCategoryJson>(ArticleCategory.collection).doc(categoryId).valueChanges());
    return combineLatest(categoryObservables)
  }

  
  
}

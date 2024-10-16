import { DocumentReference } from "@angular/fire/compat/firestore"
import { Category } from "./category.model"
import { Author } from "./author.model"
import { Curso } from "./course.model"

export interface ArticleJson {
    authorRef: DocumentReference<Author>
    isDraft: boolean
    isFromPredyc: boolean
    categoriesRef: DocumentReference<ArticleCategory>[]
    createdAt: any
    id: string
    metaDescription: string
    keyWords:string
    photoUrl: string
    pillarsRef: DocumentReference<Category>[]
    slug: string
    summary: string
    tagsRef: DocumentReference<ArticleTag>[]
    title: string
    titleSEO: string
    updatedAt: any
    orderNumber: number
    coursesRef: DocumentReference<Curso>[]
    relatedArticlesRef: DocumentReference<Article>[],
    cursosDatos:any,
    categoriesData:any,
    authorData:any,
    pillarsData:any,
    articleRelatedArticlesData:any,
    articleTagsData:any
    
}

export class Article {

    public static collection = 'article'
    public static objectSubcollectionName = "dataChunks"
    public static HTMLSubcollectionName = "dataChunksHTML"

    constructor(
        public authorRef: DocumentReference<Author>,
        public isDraft: boolean,
        public isFromPredyc: boolean,
        public categoriesRef: DocumentReference<ArticleCategory>[],
        public createdAt: any,
        public id: string,
        public metaDescription: string,
        public keyWords: string,
        public photoUrl: string,
        public pillarsRef: DocumentReference<Category>[],
        public slug: string,
        public summary: string,
        public tagsRef: DocumentReference<ArticleTag>[],
        public title: string,
        public titleSEO: string,
        public updatedAt: any,
        public orderNumber: number,
        public coursesRef: DocumentReference<Curso>[],
        public relatedArticlesRef: DocumentReference<Article>[],
        public cursosDatos:any,
        public categoriesData:any,
        public authorData:any,
        public pillarsData:any,
        public articleRelatedArticlesData:any,
        public articleTagsData:any
    ) {}

    public static fromJson(articleJson: ArticleJson): Article {
        return new Article(
            articleJson.authorRef,
            articleJson.isDraft,
            articleJson.isFromPredyc,
            articleJson.categoriesRef,
            articleJson.createdAt,
            articleJson.id,
            articleJson.metaDescription,
            articleJson.keyWords,
            articleJson.photoUrl,
            articleJson.pillarsRef,
            articleJson.slug,
            articleJson.summary,
            articleJson.tagsRef,
            articleJson.title,
            articleJson.titleSEO,
            articleJson.updatedAt,
            articleJson.orderNumber,
            articleJson.coursesRef,
            articleJson.relatedArticlesRef,
            articleJson.cursosDatos,
            articleJson.categoriesData,
            articleJson.authorData,
            articleJson.pillarsData,
            articleJson.articleRelatedArticlesData,
            articleJson.articleTagsData
        )
    }

    public toJson(): ArticleJson {
        return {
            authorRef: this.authorRef,
            isDraft: this.isDraft,
            isFromPredyc: this.isFromPredyc,
            categoriesRef: this.categoriesRef,
            createdAt: this.createdAt,
            id: this.id,
            metaDescription: this.metaDescription,
            keyWords: this.keyWords,
            photoUrl: this.photoUrl,
            pillarsRef: this.pillarsRef,
            slug: this.slug,
            summary: this.summary,
            tagsRef: this.tagsRef,
            title: this.title,
            titleSEO: this.titleSEO,
            updatedAt: this.updatedAt,
            orderNumber: this.orderNumber,
            coursesRef: this.coursesRef,
            relatedArticlesRef: this.relatedArticlesRef,
            cursosDatos:this.cursosDatos,
            categoriesData:this.categoriesData,
            authorData:this.authorData,
            pillarsData:this.pillarsData,
            articleRelatedArticlesData:this.articleRelatedArticlesData,
            articleTagsData:this.articleTagsData
        }
    }
}

export interface ArticleSubCollectionData {
    content: Object[]
}

export interface ArticleData extends ArticleJson {
    data: Object[],
}

export interface ArticleTagJson {
    id: string | null,
    name: string,
}

export class ArticleTag {

    public static collection = 'article-tag'

    constructor(
        public id: string | null,
        public name: string,
    ){}

    public static fromJson(articleJson: ArticleTagJson): ArticleTag {
        return new ArticleTag(
            articleJson.id,
            articleJson.name,
        )
    }

    public toJson(): ArticleTagJson {
        return {
            id: this.id,
            name: this.name,
        }
    }

}

export interface ArticleCategoryJson {
    id: string | null,
    name: string,
}

export class ArticleCategory {

    public static collection = 'article-category'

    constructor(
        public id: string | null,
        public name: string,
    ){}

    public static fromJson(articleJson: ArticleCategoryJson): ArticleCategory {
        return new ArticleCategory(
            articleJson.id,
            articleJson.name,
        )
    }

    public toJson(): ArticleCategoryJson {
        return {
            id: this.id,
            name: this.name,
        }
    }

}
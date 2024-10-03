import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticleJson } from '../shared/models/article.model';
import { Curso } from '../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    public title: Title,
    public meta: Meta
  ) { }

  setCanonicalURL(url?: string){
    const canURL = url == undefined ? this._document.URL : url;
    const head = this._document.getElementsByTagName('head')[0]
    let element: HTMLLinkElement | null = this._document.querySelector(`link [rel ='canonical']`) || null 
    if (!element){
      element = this._document.createElement('link') as HTMLLinkElement;
      head.appendChild(element)
    }
    element.setAttribute('rel', 'canonical')
    element.setAttribute('href',canURL)
  }

  setKeyWords(keyWords: string) {
    const keyWordsGet = this.meta.getTag('name="keywords"');
    if (keyWordsGet) {
      this.meta.updateTag({ name: 'keywords', content: keyWords });
    } else {
      this.meta.addTag({ name: 'keywords', content: keyWords });
    }
  }

  setIndexFollow(state: boolean = true){
    this.meta.updateTag({name: 'robots', content:state? "index,follow" : "noindex, nofollow"})
  }

  removeCanonicalURL() {
    const head = this._document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this._document.querySelector(`link[rel='canonical']`);
    if (element) {
      head.removeChild(element);
    }
  }  

  removeIndexFollow() {
    this.meta.removeTag( "name = 'robots'" )
  }

  removeTags() {
    if (this.meta.getTag('name="description"')) this.meta.removeTag( "name = 'description'" )
    if (this.meta.getTag('name="keywords"')) this.meta.removeTag( "name = 'keywords'" )
    if (this.meta.getTag('name="author"')) this.meta.removeTag( "name = 'author'" )
    if (this.meta.getTag('name="robots"')) this.meta.removeTag( "name = 'robots'" )
    this.removeCanonicalURL()
  }

  setMetaTagsForArticle(article: ArticleJson) {
    this.title.setTitle(article.titleSEO);
    this.meta.updateTag({ name: 'description', content: article.metaDescription ? article.metaDescription : article.summary});
    this.meta.updateTag({ name: 'og:description', content: article.metaDescription ? article.metaDescription : article.summary});
    this.meta.updateTag({ name: 'og:image', content: article.photoUrl });
    this.meta.updateTag({ name: 'og:title', content: article.titleSEO });
  }

  setMetaTagsForCourses(course: Curso) {
    this.title.setTitle(course.titulo);
    this.meta.updateTag({ name: 'description', content: course.metaDescripcion ? course.metaDescripcion : course.descripcion });
    this.meta.updateTag({ name: 'og:description', content: course.metaDescripcion ? course.metaDescripcion : course.descripcion });
    this.meta.updateTag({ name: 'og:image', content: course.foto });
    this.meta.updateTag({ name: 'og:title', content: course.titulo });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconService } from '../../services/icon.service';
import { combineLatest, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { SeoService } from '../../services/seo.service';
import { ArticleTagJson } from '../../shared/models/article.model';
import { Freebie } from '../../shared/models/freebie.model';
import { ArticleService } from '../../shared/services/article.service';
import { AuthorService } from '../../shared/services/author.service';
import { FreebieService } from '../../shared/services/freebie.service';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FooterComponent } from '../footer/footer.component';
import { SearchInputBoxComponent } from '../../shared/widgets/search-input-box/search-input-box.component';
import { FilterListComponent } from '../../shared/widgets/filter-list/filter-list.component';
import { AuthorJson } from '../../shared/models/author.model';

export interface ArticlePreview {
  authorName: string,
  authorPhoto: string,
  authorId: string
  data: Object[],
  photoUrl: string,
  previewContent: string,
  slug: string,
  tagsNames: string[],
  tagsIds: string[],
  title: string,
}

interface TagsWithArticleQty extends ArticleTagJson {
  articlesQty: number
}

interface AuthorWithArticleQty extends AuthorJson {
  articlesQty: number
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FlexLayoutServerModule, FooterComponent, RouterModule, SearchInputBoxComponent, FilterListComponent, MatPaginator],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  constructor(
    public icon: IconService,
    public articleService: ArticleService,
    public authorService: AuthorService,
    public freebieService: FreebieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platform: Object,
  ){}

  environment = environment;

  fotoDestacada = "assets/images/logos/destacada.png"
  mini = "assets/images/design/industry.jpg"
  lourival = "assets/images/logos/lourival.jpg"
  articulo = "assets/images/logos/articulo.png"

  freebies: Freebie[] = []

  combinedSubscription: Subscription
  allArticles: ArticlePreview[] = []
  articles: ArticlePreview[] = []
  articleTags: TagsWithArticleQty[] = []
  tags: TagsWithArticleQty[] = []
  articleAuthors: AuthorWithArticleQty[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  totalLength: number
  pageSize: number = 6
  pageIndex: number = 0;

  queryParamsSubscription: Subscription

  freebieSubscription: Subscription

  articlesSource: 'all' | 'predyc'| 'predictiva' = 'predyc'

  ngOnInit() {
    this.combinedSubscription = combineLatest([
      this.articleService.getAllNonDraftArticlesWithData$(this.articlesSource),
      this.authorService.getAuthors$(),
      this.articleService.getAllArticleTags$()
    ]).subscribe(([articles, authors, allTags]) => {
      const articleTagIds = articles.flatMap(article => article.tagsRef.map(tagRef => tagRef.id));
      const articleAuthorIds = articles.flatMap(article => article.authorRef.id);
      // Filter tags and authors to keep only those that are referenced by articles
      this.articleTags = allTags
      .filter(tag => articleTagIds.includes(tag.id))
      .map(tag => {
        const articlesQty = articles.filter(article => article.tagsRef.some(tagRef => tagRef.id === tag.id)).length;
        return { ...tag, articlesQty };
      });

      this.articleAuthors = authors
      .filter(author => articleAuthorIds.includes(author.id))
      .map(author => {
        const articlesQty = articles.filter(article => article.authorRef.id === author.id).length;
        return { ...author, articlesQty };
      });
      console.log("this.articleAuthors", this.articleAuthors)

      this.allArticles = articles.map(article => {
        const author = authors.find(x => x.id === article.authorRef.id);
        const tagsData = this.getMatchingTags(article.tagsRef, allTags);
        const tagsNames = tagsData.map(x => x.name.toLocaleLowerCase());
        const tagsIds = tagsData.map(x => x.id);
        // console.log('article',article)
        return {
          authorName: author.name || '',
          authorPhoto: author.photoUrl || '',
          authorId: author.id,
          data: article.data,
          summary:article.summary,
          previewContent: this.getPreviewContent(article.data, 200),
          photoUrl: article.photoUrl,
          slug: article.slug,
          tagsNames,
          tagsIds,
          title: article.title
        };
      });
      this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        const searchTerm = params['search'] || '';
        const filterTerm = params['tag'] || '';
        const filterTerm2 = params['author'] || '';
        //console.log("filterTerm:", filterTerm)
        this.performSearch(searchTerm, filterTerm, filterTerm2, page);
      });
    });

    this.freebieSubscription = this.freebieService.getFreebies$().subscribe(freebies => {
      //console.log("freebies", freebies)
      this.freebies = freebies
    })

  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageSize = this.pageSize; 
    }
  }

  performSearch(searchTerm: string, filterTag: string, filterAuthor: string, page: number) {

    const articlesSearchFilter = this.allArticles.filter(x => {
      if (!searchTerm || searchTerm === '') return true;
      return this.removeAccents(x.title.toLocaleLowerCase()).includes(this.removeAccents(searchTerm.toLocaleLowerCase()));
    });

    const filteredArticles = articlesSearchFilter.filter(x => {
      const matchesTag = filterTag ? x.tagsIds.includes(filterTag) : true;
      const matchesAuthor = filterAuthor ? x.authorId.toLocaleLowerCase() === filterAuthor.toLocaleLowerCase() : true;
      return matchesTag && matchesAuthor;
    }); 

    const filteredTagsToShow = this.articleTags.filter(x => {
      return true
      // if (!searchTerm || searchTerm === '') return true;
      // return this.removeAccents(x.name.toLocaleLowerCase()).includes(this.removeAccents(searchTerm.toLocaleLowerCase()));
    });

    this.articles = filteredArticles;
    this.tags = filteredTagsToShow;
    // console.log("this.tags", this.tags)

    this.pageIndex = page -1
    this.updateArticles();
    if (this.paginator) this.paginator.pageIndex = page - 1;

    //console.log("this.allArticles", this.allArticles)
    //console.log("filteredArticlesWithFilter", filteredArticles)

  }

  updateArticles() {
    const startIndex = 4 + this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // //console.log("startIndex", startIndex)
    // //console.log("endIndex", endIndex)
    this.dataSource.data = this.articles.slice(startIndex, endIndex);
  }

  showAllTags() {
    this.router.navigate([], {
      queryParams: { tag: "" , page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  showAllAuthors() {
    this.router.navigate([], {
      queryParams: { author: "" , page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getMatchingTags(articleTagsRef: DocumentReference[], allTags: ArticleTagJson[]) {
    return articleTagsRef.map(tagRef => {
      return allTags.find(tag => tag.id === tagRef.id);
    }).filter(tag => tag);
  };


  getPreviewContent(delta: any, previewLength: number): string {
    let previewData = '';
    let charCount = 0;

    for (let op of delta) {
      if (charCount >= previewLength) break;

      if (typeof op.insert === 'string') {
        if (charCount + op.insert.length > previewLength) previewData += op.insert.substring(0, previewLength - charCount);
       else previewData += op.insert;
        charCount += op.insert.length;
      }
    }

    return previewData + "...";
  }

  ngOnDestroy() {
    if (this.combinedSubscription) this.combinedSubscription.unsubscribe()
    if (this.freebieSubscription) this.freebieSubscription.unsubscribe()
    if (this.queryParamsSubscription) this.queryParamsSubscription.unsubscribe()
  }

}

import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { IconService } from '../../../services/icon.service';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, combineLatest, filter } from 'rxjs';
import { ArticleService } from '../../../shared/services/article.service';
import { environment } from '../../../../environments/environment';
import { AuthorService } from '../../../shared/services/author.service';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { ArticleTag, ArticleTagJson } from '../../../shared/models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchInputBoxComponent } from '../../../shared/widgets/search-input-box/search-input-box.component';
import { FilterListComponent } from '../../../shared/widgets/filter-list/filter-list.component';
import { FreebieService } from '../../../shared/services/freebie.service';
import { Freebie } from '../../../shared/models/freebie.model';
import { FooterMobileComponent } from '../../home-mobile/footer-mobile/footer-mobile.component';
import { SeoService } from '../../../services/seo.service';


export interface ArticlePreview {
  authorName: string,
  authorPhoto: string,
  data: Object[],
  photoUrl: string,
  previewContent: string,
  slug: string,
  tagsNames: string[],
  title: string,
}

@Component({
  selector: 'app-blog-mobile',
  standalone: true,
  imports: [CommonModule, FlexLayoutServerModule, FlexLayoutModule, FooterMobileComponent, RouterModule, SearchInputBoxComponent, FilterListComponent, MatPaginator],
  providers:[IconService],
  templateUrl: './blog-mobile.component.html',
  styleUrl: './blog-mobile.component.css'
})
export class BlogMobileComponent implements OnInit, AfterViewInit, OnDestroy {
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
  articleTags: ArticleTagJson[] = []
  tags: ArticleTagJson[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  totalLength: number
  pageSize: number = 8;
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
      // Filter tags to keep only those that are referenced by articles
      this.articleTags = allTags.filter(tag => articleTagIds.includes(tag.id));

      this.allArticles = articles.map(article => {
        const author = authors.find(x => x.id === article.authorRef.id);
        const tagsData = this.getMatchingTags(article.tagsRef, allTags);
        const tagsNames = tagsData.map(x => x.name.toLocaleLowerCase());
        // console.log('article',article)
        return {
          authorName: author?.name || '',
          authorPhoto: author?.photoUrl || '',
          data: article.data,
          summary:article.summary,
          previewContent: this.getPreviewContent(article.data, 200),
          photoUrl: article.photoUrl,
          slug: article.slug,
          tagsNames,
          title: article.title
        };
      });
      this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        const searchTerm = params['search'] || '';
        const filterTerm = params['tag'] || '';
        // //console.log("filterTerm:", filterTerm)
        this.performSearch(searchTerm, filterTerm, page);
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

  performSearch(searchTerm: string, filterTerm: string, page: number) {

    const articlesSearchFilter = this.allArticles.filter(x => {
      if (!searchTerm || searchTerm === '') return true;
      return this.removeAccents(x.title.toLocaleLowerCase()).includes(this.removeAccents(searchTerm.toLocaleLowerCase()));
    });

    const filteredArticles = articlesSearchFilter.filter(x => {
      if (!filterTerm || filterTerm === '') return true;
      return x.tagsNames.includes(filterTerm.toLocaleLowerCase());
    });

    const filteredTagsToShow = this.articleTags.filter(x => {
      return true
      // if (!searchTerm || searchTerm === '') return true;
      // return this.removeAccents(x.name.toLocaleLowerCase()).includes(this.removeAccents(searchTerm.toLocaleLowerCase()));
    });

    this.articles = filteredArticles;
    this.tags = filteredTagsToShow;

    this.pageIndex = page -1
    this.updateArticles()
    if (this.paginator) this.paginator.pageIndex = page - 1;

    // //console.log("this.allArticles", this.allArticles)
    // //console.log("filteredArticlesWithFilter", filteredArticles)

  }

  updateArticles() {
    const startIndex = this.pageIndex * this.pageSize;
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
  }

}

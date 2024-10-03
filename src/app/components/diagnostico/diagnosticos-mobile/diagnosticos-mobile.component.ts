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
import { CourseService } from '../../../shared/services/course.service';


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
  selector: 'app-diagnosticos-mobile',
  standalone: true,
  imports: [CommonModule, FlexLayoutServerModule, FlexLayoutModule, FooterMobileComponent, RouterModule, SearchInputBoxComponent, FilterListComponent, MatPaginator],
  providers:[IconService],
  templateUrl: './diagnosticos-mobile.component.html',
  styleUrl: './diagnosticos-mobile.component.css'
})

export class diagnosticosMobileComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public icon: IconService,
    public articleService: ArticleService,
    public authorService: AuthorService,
    public freebieService: FreebieService,
    private router: Router,
    private seo: SeoService,
    private courseService: CourseService,
    @Inject(PLATFORM_ID) private platform: Object,
  ){}

  test

  diagnosticosSubscription
  ngOnInit() {

    this.diagnosticosSubscription = this.courseService.getActivityCertifications().subscribe(test => {
      console.log('datos',test)
      this.test = test
 
    })

  }

  getFormattedDuration(tiempo) {
    const hours = Math.floor(tiempo / 60);
    const minutes = tiempo % 60;
    return `${hours} hrs ${minutes} min`;
  }

  ngAfterViewInit() {

  }



  ngOnDestroy() {

  }

  scrollToForm(){
    this.scrollToElement('formFooterMovile')
  }


  scrollToElement(id: string) {
    if (isPlatformBrowser(this.platform)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 100; // Ajuste del offset para considerar el header fijo
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } 
    }

  }


}
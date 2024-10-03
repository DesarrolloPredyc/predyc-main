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
  selector: 'app-free-courses-mobile',
  standalone: true,
  imports: [CommonModule, FlexLayoutServerModule, FlexLayoutModule, FooterMobileComponent, RouterModule, SearchInputBoxComponent, FilterListComponent, MatPaginator],
  providers:[IconService],
  templateUrl: './free-courses-mobile.component.html',
  styleUrl: './free-courses-mobile.component.css'
})

export class FreeCoursesMobileComponent implements OnInit, AfterViewInit, OnDestroy {
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

  courses
  ngOnInit() {


    this.courseService.getPredycCourses$().subscribe(courses => {
      courses = courses.filter(x=>x.isFree)
      courses.forEach(cursoRelacionado => {
        cursoRelacionado['duracionFormatted'] = this.getFormattedDuration(cursoRelacionado.duracion)
      });
      this.courses = courses
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
  irACruso(curso){
    this.router.navigate([`cursos/${curso.customUrl}`]);
  }



}
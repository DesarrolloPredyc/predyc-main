import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { IconService } from '../../../services/icon.service';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../../shared/services/article.service';
import { AuthorService } from '../../../shared/services/author.service';
import { MatPaginator } from '@angular/material/paginator';
import { SearchInputBoxComponent } from '../../../shared/widgets/search-input-box/search-input-box.component';
import { FilterListComponent } from '../../../shared/widgets/filter-list/filter-list.component';
import { FreebieService } from '../../../shared/services/freebie.service';
import { SeoService } from '../../../services/seo.service';
import { CourseService } from '../../../shared/services/course.service';

@Component({
  selector: 'app-diagnosticos-desktop',
  standalone: true,
  imports: [CommonModule, FlexLayoutServerModule, FlexLayoutModule, FooterComponent, RouterModule, SearchInputBoxComponent, FilterListComponent, MatPaginator],
  providers:[IconService],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class diagnosticosDesktopComponent implements OnInit, AfterViewInit, OnDestroy {
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

    const defaultMetaDescription: string = "Revista de Mantenimiento, Confiabilidad y Gestión de Activos. Más de 350 Artículos Gratis: Mantenimiento predictivo, preventivo, correctivo, industrial."

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
    this.scrollToElement('formFooter')
  }


  scrollToElement(id: string) {
    if (isPlatformBrowser(this.platform)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 0; // Ajuste del offset para considerar el header fijo
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

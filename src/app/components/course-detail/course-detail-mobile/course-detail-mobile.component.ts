import { Component, Inject, PLATFORM_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../services/seo.service';
import { IconService } from '../../../services/icon.service';
import { Curso } from '../../../shared/models/course.model';
import { IndexesService } from '../../../shared/services/indexes.service';
import { CourseService } from '../../../shared/services/course.service';
import { FooterMobileComponent } from '../../home-mobile/footer-mobile/footer-mobile.component';
import { PDFService } from '../../../services/pdf.service';


@Component({
  selector: 'app-course-detail-mobile',
  standalone: true,
  imports: [CommonModule,FlexLayoutModule, FlexLayoutServerModule, FooterMobileComponent],
  providers:[IconService],
    templateUrl: './course-detail-mobile.component.html',
  styleUrl: './course-detail-mobile.component.css'
})
export class CourseDetailMobileComponent {
  constructor(
    private router: Router,
    private courseServices: CourseService,
    private route: ActivatedRoute,
    public icon: IconService,
    public pdfService:PDFService,
    @Inject(PLATFORM_ID) private platform: Object
  ){}


  id: string = this.route.snapshot.paramMap.get('id');
  course: any
  relatedCourses = []

  seo = inject(SeoService)
  cursos = []

  logo ="/assets/images/design/predyc.png"


  async ngOnInit(){
    this.route.params.subscribe(routeParams => {
      this.loadCourse(routeParams.id);
      // this.courseServices.getPredycCourses$().subscribe(cursos => {
      //   this.cursos = cursos
      // })
    });
  }

  getRelated(){
    this.relatedCourses = this.cursos.filter(x => x.categoria == this.course.categoria)
  }

  instructor;

  async downloadFichaTecnica(){
    await this.pdfService.downloadFichaTecnica(this.course,this.instructor)
  }

  async loadCourse(url) {
    let course = await firstValueFrom(this.courseServices.getCourseByCustomUrl(url))

    if (course && course.fetchedBy === 'id' && course.customUrl) {
      this.router.navigate(['/cursos', course.customUrl]);
    }
    
    this.instructor = await firstValueFrom(this.courseServices.getInstructorById(course.instructorRef.id))
    this.courseServices

    this.course = course
    this.course.modules.sort((a,b) => a.numero - b.numero)
    this.course.modules.forEach(module => {
      module.clases.sort((a,b) => b.numero - a.numero)
    })

    let duracion = 0
    let numero = 1
    course.modules.forEach(modulo => {
      modulo.clases.forEach(clase => {
        duracion+=clase.duracion
        clase.numero = numero
        numero++
      });
    });
    //console.log('duracion',duracion,course.duracion,course)
    if(course.duracion>=duracion){
      this.course.modules.push({titulo:'Examen Final',clases:[{titulo:'Examen Final',duracion:course.duracion-duracion}]})
    }
    else{
      this.course.modules.push({titulo:'Examen Final',clases:[{titulo:'Examen Final',duracion:null}]})
    }
    // //console.log(this.course)
    //this.relatedCourses = this.courseServices.getRelated(course)
  }

  getFormattedDuration(tiempo) {
    if(!tiempo){
      return ''
    }
    const hours = Math.floor(tiempo / 60);
    const minutes = tiempo % 60;
    if(hours>0){
      if(hours>1){
        if(minutes>0){
          return `${hours} hrs ${minutes} min`;
        }
        else{
          return `${hours} hrs`;
        }
      }
      else{
        if(minutes>0){
          return `${hours} hr ${minutes} min`;
        }
        else{
          return `${hours} hr`;
        }
      }
    }
    else{
      return `${minutes} min`;
    }

  }

  scrolltoForm(){
    this.scrollToElement('formFooterMovile')
  }

  scrollToElement(id: string) {
    if (isPlatformBrowser(this.platform)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 80; // Ajuste del offset para considerar el header fijo
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


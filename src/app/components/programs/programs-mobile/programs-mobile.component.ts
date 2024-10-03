import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { jsPDF } from 'jspdf';
import { SeoService } from '../../../services/seo.service';
import { IconService } from '../../../services/icon.service';
import { ProgramService } from '../../../shared/services/program.service';
import { FooterMobileComponent } from '../../home-mobile/footer-mobile/footer-mobile.component';
import { InstructorService } from '../../../services/instructor.service';
import Swal from "sweetalert2";
import { PDFService } from '../../../services/pdf.service';
import { CourseService } from '../../../shared/services/course.service';
import { FloatingNotificationComponent } from '../../floating-notification/floating-notification.component';
import { DiplomadoJson } from '../../../shared/models/diplomado.model';



@Component({
  selector: 'app-programs-mobile',
  standalone: true,
  imports: [CommonModule, FooterMobileComponent,FloatingNotificationComponent],
  providers: [IconService],
    templateUrl: './programs-mobile.component.html',
  styleUrl: './programs-mobile.component.css'
})
export class ProgramsMobileComponent  implements OnInit {
  id: string;
  program: any = {};
  pdf: jsPDF | null = null;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    public icon: IconService,
    @Inject(PLATFORM_ID) private platform: Object,
    private seo: SeoService,
    private instructorService:InstructorService,
    private pdfService:PDFService,
    private courseService:CourseService
  ) {}

  ngOnInit(): void {
    // this.loadProgram(this.id);
    // if (isPlatformBrowser(this.platform)) {
    //   window.scroll(0, 0);
    // }
    this.route.params.subscribe(routeParams => {
      this.loadProgram(routeParams.id);
      if (isPlatformBrowser(this.platform)) {
        // here you can run any browser specific code, like:
        window.scroll(0,0)
      }
    });
  }
  instructors
  async loadProgram(id: string): Promise<void> {
    try {
      this.instructorService.getInstructorsObservable().subscribe(async instructors =>{
        const program = await firstValueFrom(this.programService.getProgramById(id));
        this.program = program;
        this.instructors = instructors
        //console.log('Program loaded:', program);
        // Load courses and unique instructors
        await this.loadCourses(program);
      })


    } catch (error) {
      console.error('Error loading program:', error);
    }
  }

  private async loadCourses(program: any): Promise<void> {
    if (program.coursesRef) {
      //console.log('Courses references:', program.coursesRef);
      try {
        const courses = await Promise.all(
          program.coursesRef.map(async (courseRef: any) => {
            const course = await firstValueFrom(this.programService.getCourseDetails(courseRef.courseRef));
            //console.log('Course details for', courseRef.courseRef, ':', course);
            return { ...course, ref: courseRef.courseRef, studyPlanOrder: courseRef.studyPlanOrder };
          })
        );

        // Use Set to filter unique instructors by instructorNombre
        const uniqueInstructorsMap = new Map<string, any>();
        courses.forEach(course => {
          course.instructorData = this.instructors.find(x=>x.id == course.instructorRef.id)
          if (course.instructorRef.id && !uniqueInstructorsMap.has(course.instructorRef.id)) {
            uniqueInstructorsMap.set(course.instructorRef.id, course.instructorData);
          }
        });

        // Convert uniqueInstructorsMap values back to array
        this.program.instructors = Array.from(uniqueInstructorsMap.values());
        
        // Sort courses by studyPlanOrder
        this.program.courses = courses.sort((a: any, b: any) => a.studyPlanOrder - b.studyPlanOrder);

        //console.log('Loaded courses:', this.program.courses);
        //console.log('Unique instructors:', this.program.instructors);
      } catch (error) {
        console.error('Error loading courses:', error);
      }
    }
  }

  showNotification: boolean = false;
  notificationMessage: string = '';

  async downloadProgramInfo(): Promise<void> {
    this.showNotification = true;
    this.notificationMessage = "Descargando archivo... Por favor, espera.";

    let idsCourses = this.program.courses.map(element => {
      return element.id
    });

    try {
      let courses = await this.courseService.getCoursesByIds(idsCourses);
      courses.forEach(course => {
        course.instructorData = this.instructors.find(x => x.id == course.instructorRef.id);
        course.modules.sort((a, b) => a.numero - b.numero);
        course.modules.forEach(module => {
          module.clases.sort((a, b) => b.numero - a.numero);
        });
        let duracion = 0;
        course.modules.forEach(modulo => {
          modulo.clases.forEach(clase => {
            duracion += clase.duracion;
          });
        });
        if (course.duracion >= duracion) {
          course.modules.push({ titulo: 'Examen Final', clases: [{ titulo: 'Examen Final', duracion: course.duracion - duracion }] });
        } else {
          course.modules.push({ titulo: 'Examen Final', clases: [{ titulo: 'Examen Final', duracion: null }] });
        }
      });

      let cursosPDF = []
      idsCourses.forEach(idCurso => {
        cursosPDF.push(courses.find(x => x.id == idCurso));
      });
      console.log(cursosPDF);

      await this.pdfService.downloadFichaTecnicaMultiple(cursosPDF, `Ficha técnica ${this.program.name}`, false);
    } catch (error) {
      console.error(error);
    } finally {
      this.showNotification = false;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platform)) {
      this.seo.removeTags()
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
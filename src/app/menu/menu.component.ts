import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import { IconService } from '../services/icon.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { coursesData } from '../../assets/data/courses.data';
import { CourseFinderComponent } from '../components/course-finder/course-finder.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ResourcesFinderComponent } from '../components/resources-finder/resources-finder.component';
import { MatDialog } from '@angular/material/dialog';
import { DemoRequestComponent } from '../demo-request/demo-request.component';
import { Subscription, interval } from 'rxjs';
import { Location } from '@angular/common';
import { DemoRequestPopupComponent } from '../home/demo-request-popup/demo-request-popup.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,FlexLayoutModule, FlexLayoutServerModule, RouterModule, CourseFinderComponent, ResourcesFinderComponent,DemoRequestPopupComponent],
  providers: [IconService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {

  constructor(public icon: IconService, public dialog: MatDialog,@Inject(PLATFORM_ID) private platformId: Object,  private location: Location,
  private router: Router

){}

  showCourseFinder = false
  showCourseFinderFree= false
  showResourcesFinder = false

  isPopupVisible = false

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  
  openDemoRequestDialog(): void {
    this.dialog.open(DemoRequestComponent, {
      width: '600px', // Ajusta según tus necesidades
      data: { /* puedes pasar datos aquí si es necesario */ }
    });
  }


  scrollToForm(){
    this.scrollToElement('formFooter')
  }

  private routerSubscription: Subscription;

  showEvent = false

  private checkUrl(url: string): void {
    if (url.includes('mantenimiento-en-accion')) {
      this.showEvent = false;
    } else {
      this.showEvent = true;
    }
  }

  ngOnInit(): void {

    this.checkUrl(this.router.url); // Comprobar la URL actual al inicializar

    // Suscribirse a los eventos de navegación para detectar cambios en la ruta
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUrl(event.urlAfterRedirects); // Comprobar la URL después de la redirección
      }
    });



    this.updateCountdown()
    if (isPlatformBrowser(this.platformId)) {
      interval(1000).subscribe(() => this.updateCountdown());
    }
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruya para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  


  scrollToElement(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 20; // Ajuste del offset para considerar el header fijo
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      else{
        this.isPopupVisible = true
      }
    }

  }

  targetDate = new Date('2024-10-01T01:00:00Z').getTime(); // 1 de octubre 2024, 1:00 AM GMT
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  showTime = true

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if(distance<=0){
      this.showTime = false
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  
}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { IconService } from '../services/icon.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DemoRequestComponent } from '../demo-request/demo-request.component';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FlexLayoutServerModule, RouterModule],
  providers: [IconService],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.css'
})
export class MenuMobileComponent {
  constructor(public dialog: MatDialog,  private router: Router,@Inject(PLATFORM_ID) private platformId: Object
  ) {}

  menuActive = false;
  icon = {
    MenuWhite: '/assets/images/icons/menu-white.svg',
    MenuBlack: '/assets/images/icons/menu-black.svg',
    predycLogo: '/assets/images/icons/LOGO-BLACK.webp',
    predycLogoWhite: '/assets/images/icons/PredycWhite.webp',

    MenuBackground: '/assets/iconsUI/menu-white-b.svg',
  };

  toggleMenu() {
    this.menuActive = !this.menuActive;
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

  openDemoRequestDialog(): void {
    this.dialog.open(DemoRequestComponent, {
      width: '600px', // Ajusta según tus necesidades
      data: { /* puedes pasar datos aquí si es necesario */ }
    });
  }
}
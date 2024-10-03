import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SeoService } from '../../services/seo.service';
import { ProfilesLogoComponent } from '../../home/profiles-logo/profiles-logo.component';
import { PlanGeneratorComponent } from '../../home/plan-generator/plan-generator.component';
import { CoursesHomeComponent } from '../../home/courses-home/courses-home.component';
import { LmsHomeComponent } from '../../home/lms-home/lms-home.component';
import { PlanTrainingComponent } from '../../home/plan-training/plan-training.component';
import { RhInfoComponent } from '../../home/rh-info/rh-info.component'; 
import { StudentPlanComponent } from '../../home/student-plan/student-plan.component';
import { PlanDiagnosticoComponent } from '../../home/plan-diagnostico/plan-diagnostico.component';
import { DemoRequestPopupComponent } from '../../home/demo-request-popup/demo-request-popup.component';
import { CardsPricingComponent } from '../cards-pricing/cards-pricing.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, PlanTrainingComponent,
     FlexLayoutServerModule, FooterComponent, ProfilesLogoComponent,
      PlanGeneratorComponent, CoursesHomeComponent, LmsHomeComponent,
      RhInfoComponent, CardsPricingComponent, StudentPlanComponent,PlanDiagnosticoComponent, DemoRequestPopupComponent
    ], 
  providers:[IconService ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  animhome = "assets/images/design/animhome.png";
  argos = "assets/images/logos/argos.svg";
  cocacola = "assets/images/logos/cocacola.svg";
  genteoil = "assets/images/logos/genteoil.svg";
  natgas = "assets/images/logos/natgas.svg";
  sapuchi = "assets/images/logos/sapuchi.svg";
  villegas = "assets/images/logos/villegas.png";
  recursosimg= "assets/images/design/asseticon.png";
  cerrejon = "/assets/images/logos/cerrejon.png";
  colgas ='/assets/images/logos/colgas.png';
  costena ='/assets/images/logos/costenia.png';
  deacero = '/assets/images/logos/deacero.png'
  litio = '/assets/images/logos/litio.png'

  revista = "assets/images/logos/revista.png";
  fotoDestacada = "assets/images/logos/destacada.png";
  mini = "assets/images/design/industry.jpg";

  // logos
  bimbo = "assets/images/logos-empresas/bimbo.png";
  arca = "assets/images/logos-empresas/arca.png";
  chaco = "assets/images/logos-empresas/chaco.png";
  delsur = "assets/images/logos-empresas/delsur.png";
  ica = "assets/images/logos-empresas/ica.png";
  antofagasta = "assets/images/logos-empresas/antofagasta.png";
  clariant = "assets/images/logos-empresas/clariant.png";
  iberdrola = "assets/images/logos-empresas/iberdrola.png";

  lourival = "assets/images/logos/lourival.jpg";
  gulati = "assets/images/logos/gulati.jpg";
  exito = "assets/images/logos/exito.png";
  asistencia = 'assets/images/demo/asistencia-predyc.webp';
  totis = '/assets/images/logos/totis.png';
  

  logosEmpresas = [this.cerrejon, this.colgas, this.deacero, this.litio, this.genteoil, this.ica, this.totis, this.delsur];
  isAnnual: boolean = true;

  isPopupVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}

  seo = inject(SeoService);

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // Verifica si el parámetro de consulta 'seePricing' está presente y es 'true'
      this.route.queryParams.subscribe(params => {
        const seePricing = params['seePricing'];
        if (seePricing === 'true') {
          // Hace scroll al componente con id 'seccionPrecios'
          setTimeout(() => {
            const element = document.getElementById('seccionPrecios');
            console.log('element',element)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
        }
      });
    }
 
  }
  
  togglePricing(event: any): void {
    this.isAnnual = event.target.checked;
  }

  contactSales(): void {
    window.location.href = 'mailto:liliana.giraldo@predictiva21.com';
  }
  showPopup(): void {
    this.isPopupVisible = true;
  }

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  scrollToElement(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 70; // Ajuste del offset para considerar el header fijo
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
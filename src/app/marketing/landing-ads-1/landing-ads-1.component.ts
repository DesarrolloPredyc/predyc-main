import { AfterViewInit, Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { IconService } from '../../services/icon.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanTrainingComponent } from '../../home/plan-training/plan-training.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProfilesLogoComponent } from '../../home/profiles-logo/profiles-logo.component';
import { PlanGeneratorComponent } from '../../home/plan-generator/plan-generator.component';
import { CoursesHomeComponent } from '../../home/courses-home/courses-home.component';
import { LmsHomeComponent } from '../../home/lms-home/lms-home.component';
import { RhInfoComponent } from '../../home/rh-info/rh-info.component';
import { CardsPricingComponent } from '../../components/cards-pricing/cards-pricing.component';
import { StudentPlanComponent } from '../../home/student-plan/student-plan.component';
import { PlanDiagnosticoComponent } from '../../home/plan-diagnostico/plan-diagnostico.component';
import { DemoRequestPopupComponent } from '../../home/demo-request-popup/demo-request-popup.component';
import { RhInfoMobileComponent } from '../../components/home-mobile/mobile-components/rh-info-mobile/rh-info-mobile.component';
import { CoursesHomeMobileComponent } from '../../components/home-mobile/mobile-components/courses-home-mobile/courses-home-mobile.component';
import { FooterMobileComponent } from '../../components/home-mobile/footer-mobile/footer-mobile.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Scroll } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formLead, ReunionFormComponent } from '../../shared/reunion-form/reunion-form.component';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-landing-ads-1',
  standalone: true,
  imports: [CommonModule, PlanTrainingComponent, ReunionFormComponent,
    NgxIntlTelInputModule, FormsModule,ReactiveFormsModule,
    FooterMobileComponent,RouterModule,
    FlexLayoutModule, MatIconModule,
    RhInfoMobileComponent, CoursesHomeMobileComponent,
    FlexLayoutServerModule, FooterComponent, ProfilesLogoComponent,
     PlanGeneratorComponent, CoursesHomeComponent, LmsHomeComponent,
     RhInfoComponent, CardsPricingComponent, StudentPlanComponent,PlanDiagnosticoComponent, DemoRequestPopupComponent
   ], 
 providers:[IconService ],
  templateUrl: './landing-ads-1.component.html',
  styleUrl: './landing-ads-1.component.css'
})
export class LandingAds1Component implements OnInit{

  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  
  

  nimhome = "assets/images/design/animhome.png";
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

  coordinador = '/assets/images/perfilesTecnicos/Coordinador.png'
  gerenteMant = '/assets/images/perfilesTecnicos/gerente-mantenimiento.webp'
  ingProy = '/assets/images/perfilesTecnicos/Ing-1.png'
  operador = '/assets/images/perfilesTecnicos/Operador.png'
  supervisor = '/assets/images/perfilesTecnicos/Supervisor.png'
  tecElectrico = '/assets/images/perfilesTecnicos/Técnico-eléctrico.png'
  tecEspecialista = '/assets/images/perfilesTecnicos/tecnico-especialista.webp'
  tecInstrumentista = '/assets/images/perfilesTecnicos/Tecnico-instrumentista.png'
  tecMecanico = '/assets/images/perfilesTecnicos/Tecnico-mecanico.png'
  tecPredictivo = '/assets/images/perfilesTecnicos/Tecnico-predictivo.png'
  ingConfiabilidad = '/assets/images/perfilesTecnicos/ing-confiabilidad.webp'
  ingMantenimiento = '/assets/images/perfilesTecnicos/ing-mant.png'
  

  logosEmpresas = [this.cerrejon, this.colgas, this.deacero, this.litio, this.genteoil, this.ica, this.totis, this.delsur];
  isAnnual: boolean = true;

  isPopupVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute, private userService: UserService,

  private router: Router,


){}

  reunionForm: FormGroup;


  seo = inject(SeoService);

  // utm_source=meta&utm_medium=meta_mailchimp_alike&utm_campaign=lms_predyc&utm_content=pocos_recursos_amarillo
  currentUrl
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.utmSource = params['utm_source'];
      this.utmMedium = params['utm_medium'];
      this.utmCampaign = params['utm_campaign'];
      this.utmContent = params['utm_content'];

    });
    if (isPlatformBrowser(this.platformId)) {
      this.seo.setIndexFollow(false)
    }

    this.reunionForm = new FormGroup({
      nombreCompleto: new FormControl('', [Validators.required]),
      emailProfesional: new FormControl('', [Validators.required, Validators.email]),
      telefonoMovil: new FormControl(undefined, [Validators.required]), // El componente ngx-intl-tel-input se maneja como un Control más
      cargo: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required])
    });

  }
  routerSubscription
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.currentUrl = this.router.url
      this.routerSubscription = this.router.events.subscribe(event => {
        // Verifica si el evento es de tipo Scroll
        if (event instanceof Scroll) {
          const navigationEndEvent = event.routerEvent; 
          // Ahora verifica si routerEvent es NavigationEnd
          if (navigationEndEvent instanceof NavigationEnd) {
            console.log('NavigationEnd event:', navigationEndEvent);
            this.currentUrl = navigationEndEvent.urlAfterRedirects;
          }
        }
      });
    }


  }
    

  onSubmit(): void {
    if (this.reunionForm.valid) {
      console.log('Form data:', this.reunionForm.value);
      // Aquí puedes hacer algo con los datos del formulario, como enviarlos a un servidor
    } else {
      console.log('Form is invalid');
    }
  }
  

  showPopup(): void {
    this.isPopupVisible = true;
  }

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  plans: any[] = [
    {
      title: '10 personas',
      monthlyPrice: '$71 USD al mes',
      annualPrice: '$850 USD anual',
      benefits: ['Acceso a todos los cursos', '10 rotaciones'],
      isBestSeller: false,
      link: 'https://wa.link/fs0yqe'

    },
    {
      title: '25 personas',
      monthlyPrice: '$57 USD al mes',
      annualPrice: '$680 USD anual',
      benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
      isBestSeller: true,
      link: 'https://wa.link/1pggft'

    },
    // {
    //   title: '+100 personas',
    //   monthlyPrice: '$49 USD al mes',
    //   annualPrice: '$588 USD anual',
    //   benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
    //   isBestSeller: true,
    //   link: 'https://wa.link/pu3cug'

    // },
    {
      title: 'Ilimitadas',
      monthlyPrice: 'Solicita una cotización',
      annualPrice: 'Solicita una cotización',
      benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
      isBestSeller: false,
      link: 'https://wa.link/obb1h3'

    }
  ];

  togglePricing(event: any): void {
    this.isAnnual = event.target.checked;
  }

  contactSales(plan:any): void {
    if(this.platformId){
      if (this.platformId) {
        window.scrollTo({
          top: 400,
          behavior: 'smooth'
        });
      }
    }
  }

  async handleFormSubmit(formData: formLead) {
    console.log('FormData', formData);
    const userData = {
      name: formData.nombre,
      createdAt: +new Date(),
      displayName: formData.nombre,
      job: formData.cargo,
      email: formData.email,
      phoneNumber: formData.telefono
    }
    let mailchimpTag = formData.lugar
    mailchimpTag = 'adsLms'
    await this.userService.createUser(userData, mailchimpTag)
  }

}

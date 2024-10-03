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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formLead, ReunionFormComponent } from '../../shared/reunion-form/reunion-form.component';
import { interval } from 'rxjs';
import { SVG } from '@svgdotjs/svg.js';
import { gsap } from 'gsap';
import Swiper from 'swiper';
import { MatExpansionModule } from '@angular/material/expansion';
import { Location } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { EventoService } from '../../shared/services/evento.service';

@Component({
  selector: 'app-asistencia-mantenimiento-accion',
  standalone: true,
  imports: [CommonModule, PlanTrainingComponent, ReunionFormComponent,
    NgxIntlTelInputModule, FormsModule,ReactiveFormsModule,
    FooterMobileComponent,RouterModule,
    FlexLayoutModule, MatIconModule,
    RhInfoMobileComponent, CoursesHomeMobileComponent,
    FlexLayoutServerModule, FooterComponent, ProfilesLogoComponent,
     PlanGeneratorComponent, CoursesHomeComponent, LmsHomeComponent,
     RhInfoComponent, CardsPricingComponent, StudentPlanComponent,PlanDiagnosticoComponent, DemoRequestPopupComponent,
     MatExpansionModule
   ], 
 providers:[IconService ],
  templateUrl: './asistencia-mantenimiento-accion.component.html',
  styleUrl: './asistencia-mantenimiento-accion.component.css'
})
export class AsistenciagMantenimientoAccionComponent implements OnInit{

  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  showRegister = false
  
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
  activeElements: { [key: string]: boolean } = {};


  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute, private location: Location, 
  private userService: UserService,
  private eventoService:EventoService

)
  {
    // Inicializa todos los elementos como inactivos
    this.activeElements = {
      procesos: false,
      kpis: false,
      indistria: false,
      factura: false,
      monitoreo: false,
      soluciones: false,
      iso: false,
      oee: false,
      energia: false,
      calidadE: false,
      analisis: false,
    };
  }

  reunionForm: FormGroup;

  // utm_source=meta&utm_medium=meta_mailchimp_alike&utm_campaign=lms_predyc&utm_content=pocos_recursos_amarillo

  targetDate = new Date('2024-10-01T01:00:00Z').getTime(); // 1 de octubre 2024, 1:00 AM GMT
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;


  async registrarAsistencia(slide){

    //console.log('slide',slide)


    let objAsistencia = {
      id:slide.id,
      date:new Date()
    }

    if( this.userData?.assistanceData){
      this.userData?.assistanceData.push(objAsistencia)
    }
    else{
      this.userData.assistanceData = [objAsistencia]
    }
    this.updateCountdown()
    await this.eventoService.updateAssistanceData(this.userData.id,objAsistencia )



  }

  updateCountdown() {
    const now = new Date().getTime();
    // const distance = this.targetDate - now;

    // this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // this.seconds = Math.floor((distance % (1000 * 60)) / 1000);


    //revisar dias 


    this.slides.forEach(element => {

      //console.log(element.minimumDate,element.registrationDeadline,now)
      if(now>=element.minimumDate && now<=element.registrationDeadline){
        element['canRegister'] = true
        //assistanceData

        //console.log('this.userData.assistanceData',this.userData?.assistanceData,element.id)
        if(this.userData && this.userData?.assistanceData?.find(x=>x.id == element.id)){ // ya esta registrado ese dia 
          element['registrado'] = true
          element.ctaText = 'Asistencia confirmada'
        }
      }
      else{
        if(now>element.registrationDeadline){
          element.ctaText = 'Ya terminó el tiempo para poder confirmar asistencia'
        }
        else{
          element.ctaText = 'Aún no puedes confirmar la asistencia'
        }
        element['canRegister'] = false
      }
      
    });

    //console.log(this.slides)




  }

  swiper: Swiper;  
  currentUrl
  ngOnInit(): void {

    this.currentUrl = this.location.path();

    this.updateCountdown()
    if (isPlatformBrowser(this.platformId)) {
      interval(60000).subscribe(() => this.updateCountdown());
    }
    this.route.queryParams.subscribe(params => {
      this.utmSource = params['utm_source'];
      this.utmMedium = params['utm_medium'];
      this.utmCampaign = params['utm_campaign'];
      this.utmContent = params['utm_content'];

    });

    this.reunionForm = new FormGroup({
      emailProfesional: new FormControl('', [Validators.required, Validators.email]),
    });

    this.reunionFormInit = true
    

  }

  reunionFormInit = false

  currentIndex = 0;

  getInstructorNames(index = this.currentIndex): string {
      return this.slides[index].instructors.map(i => i.name).join(', ');
  }

  getInstructorRoles(index = this.currentIndex): string {
      return this.slides[index].instructors.map(i => i.role).join(', ');
  }

  scrollToSlide(index: number) {
    const element = document.getElementById(`slide-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  instructores = [
    {
      nombre: 'Gyogi Mitsuta',
      descripcion: 'Consultor / facilitador, desarrollando implementación de prácticas de nuevos procesos desde la conceptualización del marco de desarrollo del dato con ERP/EAM/APM (SAP, Maximo, Oracle, Meridium), para la formulación de estrategias de gestión de activos (RCM, FMEA, ASM, RBI, Rondas Operacionales, SIL-SIS), facilitador en la solución de problemas (con técnicas como PROACT, TAPROOT, Kepner-Tregoe, APOLLO), gestión de riesgo por ISO 31000, he realizado distintos análisis de confiabilidad a través de distintas plataformas especializadas para el tratamiento de datos estadísticos y probabilísticos como APM Meridium, Crystal ball, @ Risk, RAMP, Raptor. Como evaluador de madurez organizacional en gestión de activos o en mantenimiento he seguido la estructura de ISO 55001 o BS-EN 16646. Ha sido conferencista en distintos congresos o simposios de Latinoamerica, como SMRP Perú, CMCM México, Ipeman Perú, AISTAC México, COLAGA Venezuela, entre otros. Es presidente fundador de la Asociación de Profesionales de Venezuela (AVEPMCO), Gerente general de Argymca y Director administrativo de Academia de Confiabilidad, además de haber colaborado como supervisor aprobado por SMRP para los exámenes de certificación desde el 2011 hasta Junio 2017.',
      fotoUrl: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20GYOGI.webp?alt=media&token=6ee3fe85-f893-4ae9-b63a-5d9d1795a04b',
      linkedinUrl: 'https://www.linkedin.com/in/gmitsuta/'
    },
    {
      nombre: 'Juan Carlos Córdova Carpio',
      descripcion: 'Ingeniero Mecánico con Diplomados en Mantenimiento y Confiabilidad, una Maestría en Dirección de Empresas, y un Doctorado en Administración Estratégica de Empresas. Posee la certificación PMP (Project Management Professional) del Project Management Institute y es Certified Maintenance & Reliability Professional (CMRP), es miembro del Comité Técnico de Mantenimiento y Gestión de Activos del Colegio de Ingenieros del Perú. Con una trayectoria destacada en gestión de ingeniería y mantenimiento, Juan Carlos actualmente ocupa el cargo de Gerente Regional de Proyectos de Ingeniería en Nestlé, además, desde mayo de 2020, se desempeña como Docente en la Maestría en Gerencia del Mantenimiento en la Universidad Nacional del Callao, impartiendo cursos sobre gestión y proyectos de mantenimiento. Se ha destacado por liderar la implementación de prácticas avanzadas de mantenimiento y la formación de futuros líderes en la industria.',
      fotoUrl: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20JUAN.webp?alt=media&token=94837ab4-3c95-4d16-9405-e2b9b2a339bd',
      linkedinUrl: 'https://www.linkedin.com/in/juancarloscordova/'
    },
    {
      nombre: 'Gillermo Morán',
      descripcion: 'Ingeniero Electrónico egresado de la Universidad Bolívar, con especialización en Ingeniería de Confiabilidad, cuenta con vasta experiencia liderando proyectos de confiabilidad desarrollando software para la industria Oil & Gas de México y Estados Unidos, gestionando hasta 10,000 activos físicos. Su trayectoria incluye la fundación de Predyc y un papel esencial como socio y miembro de la junta directiva de Predictiva21. Destacado emprendedor, ha liderado la creación de herramientas de capacitación, aplicaciones para el registro de activos y software para el análisis de causa raíz. Ha sido conferencista en diversos congresos como PRECONLUB México. Especializándose en la promoción de la innovación y mejora continua en todas sus iniciativas.',
      fotoUrl: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20GUILLERMO.webp?alt=media&token=030a22d3-03e9-4918-ac31-d3e5fa238b3e',
      linkedinUrl: 'https://www.linkedin.com/in/guilleamoran/'
    }
  ];

  slides = [
    {
      id:'day1',
      date: '30 Septiembre',
      imageUrl: 'assets/images/mantenimiento/day_1.png',
      tags: ['30 Septiembre','7 PM CDMX'],
      instructors: [
        { name: 'Gyogi Mitsuta', role: 'Consultor especialista en Mantenimiento y Confiabilidad, CMRP®, CQRM®', image: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20GYOGI.webp?alt=media&token=6ee3fe85-f893-4ae9-b63a-5d9d1795a04b' },
      ],
      title: 'Buenas prácticas para un proceso de Gestión de Mantenimiento',
      description: 'Esta primera sesión, dirigida por Gyogi Mitsuta, se centra en las mejores prácticas para la gestión eficaz del mantenimiento en la industria. Se explorará cómo implementar procesos sistemáticos y estructurados para mejorar la confiabilidad de los equipos y la eficiencia operacional. A través de la exposición de metodologías los participantes aprenderán cómo optimizar sus operaciones de mantenimiento para reducir costos y mejorar la seguridad y el rendimiento de los activos, siempre alineados con las normativas internacionales vigentes.',
      ctaText: 'Confirmar asistencia',
      registrationDeadline: this.calculateDeadline('2024-10-03T01:00:00Z', 26), // 1 de octubre a las 7 PM
      minimumDate: this.calculateDeadline('2024-10-01T01:00:00Z', 0), // 30 de septiembre a las 6 PM
    },
    {
      id:'day2',
      date: '1 Octubre',
      imageUrl: 'assets/images/mantenimiento/day_2.png',
      tags: ['1 Octubre','7 PM CDMX'],
      instructors: [
        { name: 'Juan Carlos Cordova', role: 'Gerente Regional de Ingeniería de Proyectos Nestlé, CMRP®, PMP®', image: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20JUAN.webp?alt=media&token=94837ab4-3c95-4d16-9405-e2b9b2a339bd' },
      ],
      title: 'Gestión de Mantenimiento en el día a día',
      description: 'En esta sesión especial, Juan Carlos Córdova nos llevará a la práctica en la gestión de mantenimiento diaria. Discutiremos cómo las metodologías de mantenimiento se implementan efectivamente en el campo para transformar la teoría en acciones concretas que maximizan la eficiencia y la productividad. Juan Carlos compartirá su experiencia para ilustrar cómo se pueden superar los desafíos comunes y aprovechar las oportunidades en el mantenimiento. Esta charla está diseñada para ofrecer a los profesionales del mantenimiento una visión de las herramientas prácticas y técnicas probadas por Juan Carlos para llevar su gestión de mantenimiento al siguiente nivel.',
      ctaText: 'Confirmar asistencia',
      registrationDeadline: this.calculateDeadline('2024-10-03T01:00:00Z', 26), // 2 de octubre a las 7 PM
      minimumDate: this.calculateDeadline('2024-10-02T01:00:00Z', 0), // 1 de octubre a las 6 PM
    },
    {
      id:'day3',
      date: '2 Octubre',
      imageUrl: 'assets/images/mantenimiento/day_3.png',
      tags: ['2 Octubre','7 PM CDMX'],
      instructors: [
        { name: 'Guillermo Morán', role: 'CTO y Cofundador de Predyc', image: 'https://firebasestorage.googleapis.com/v0/b/predyc2023.appspot.com/o/mantenimiento%20en%20accion%2Fcolor%2F1080X1080_WEBP%20COLOR%20FONDO%20AZUL%20GUILLERMO.webp?alt=media&token=030a22d3-03e9-4918-ac31-d3e5fa238b3e' },
      ],
      title: 'Diagnóstico de la Gestión de Mantenimiento',
      description: 'En nuestra tercera sesión Guillermo Morán abordará los aspectos fundamentales para realizar un diagnóstico efectivo de la gestión de mantenimiento en diversas industrias. Este taller se centrará en identificar y analizar los puntos críticos que afectan la eficiencia y efectividad del mantenimiento, ofreciendo una mirada profunda a las metodologías para evaluar prácticas actuales y detectar áreas de mejora. Los participantes aprenderán a utilizar herramientas y técnicas avanzadas para medir la madurez de sus procesos de mantenimiento, con el objetivo de optimizar recursos, prolongar la vida útil de los activos y mejorar la rentabilidad general de sus operaciones. El enfoque será en cómo las evaluaciones pueden conducir a transformaciones significativas en la gestión de mantenimiento.',
      ctaText: 'Confirmar asistencia',
      registrationDeadline: this.calculateDeadline('2024-10-03T01:00:00Z', 26), // 3 de octubre a las 7 PM
      minimumDate: this.calculateDeadline('2024-10-03T01:00:00Z', 0), // 2 de octubre a las 6 PM
    },
  ];


  // Función para calcular la fecha límite o mínima en timestamp (en GMT)
  calculateDeadline(dateString: string, hours: number): number {
    // Crear el objeto de fecha directamente desde un string en formato UTC (GMT)
    const date = new Date(dateString);

    // Modifica las horas según el parámetro
    date.setHours(date.getHours() + hours);

    // Devuelve el timestamp de la nueva fecha
    //console.log(dateString,hours,date)
    return date.getTime();
  }


  setCurrentSlide(index: number): void {
    this.currentIndex = index;
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isDescriptionVisible = false
    }
  }

  nextSlide(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.isDescriptionVisible = false
    }
  }

  isDescriptionVisible = false;
  toggleDescription() {
    this.isDescriptionVisible = !this.isDescriptionVisible;
  }



  drwaLines(){

    if (isPlatformBrowser(this.platformId)) {
      const svgContainer = document.querySelector('.svg-connector') as HTMLElement;
      const draw = SVG().addTo(svgContainer).size('100%', '100%');

      let path1; 
      let path2; 
      let path3; 
      let path4; 
      let path5; 
      let path6; 
      let path7; 
      let path8; 
      let path9;
  
      // Conexión: OEE -> Monitoreo
      const startElement = document.querySelector('.oee') as HTMLElement; // Elemento de inicio (OEE)
      const endElement = document.querySelector('.monitoreo') as HTMLElement; // Elemento de fin (Monitoreo)
  
      if (startElement && endElement) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
  
        const startX = startRect.left + startRect.width / 2 - svgRect.left;
        const startY = startRect.top - svgRect.top;
        const endX = endRect.left + endRect.width - svgRect.left;
        const endY = (endRect.top + endRect.height / 2 - svgRect.top) + 3;
  
        const curveRadius = 20; // Ajuste de radio de la curva
  
        path1 = draw.path(`M ${endX} ${endY} 
                   L ${startX - curveRadius} ${endY} 
                   Q ${startX} ${endY} ${startX} ${endY + curveRadius}
                   L ${startX} ${startY}`)
            .stroke({ width: 2, color: '#12aaf5' })
            .fill('none');
      }
  
      // Conexión: Monitoreo -> Factura
      const startElement2 = document.querySelector('.monitoreo') as HTMLElement;
      const endElement2 = document.querySelector('.factura') as HTMLElement;
  
      if (startElement2 && endElement2) {
        const svgRect2 = svgContainer.getBoundingClientRect();
        const startRect2 = startElement2.getBoundingClientRect();
        const endRect2 = endElement2.getBoundingClientRect();
  
        const startX2 = startRect2.right - svgRect2.left;
        const startY2 = (startRect2.top + startRect2.height / 2 - svgRect2.top) - 3;
        const endX2 = endRect2.left + endRect2.width / 2 - svgRect2.left;
        const endY2 = endRect2.bottom - svgRect2.top;
  
        const curveRadius2 = 20;
  
        path2 = draw.path(`M ${startX2} ${startY2}
                L ${endX2 - curveRadius2} ${startY2}
                Q ${endX2} ${startY2} ${endX2} ${startY2 - curveRadius2}
                L ${endX2} ${endY2}`)
        .stroke({ width: 2, color: '#12aaf5' })
        .fill('none');
  

      }
  
      // Conexión: Procesos -> KPIs
      const startElement3 = document.querySelector('.procesos') as HTMLElement;
      const endElement3 = document.querySelector('.kpis') as HTMLElement;
  
      if (startElement3 && endElement3) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect3 = startElement3.getBoundingClientRect();
        const endRect3 = endElement3.getBoundingClientRect();
  
        const startX3 = startRect3.right - svgRect.left;
        const startY3 = startRect3.top + startRect3.height / 2 - svgRect.top;
        const endX3 = endRect3.left - svgRect.left;
        const endY3 = endRect3.top + endRect3.height / 2 - svgRect.top;
  
        path3 = draw.line(startX3, startY3, endX3, endY3)
            .stroke({ width: 2, color: '#12aaf5' });

      }
  
      // Conexión: KPIs -> Soluciones
      const startElement4 = document.querySelector('.kpis') as HTMLElement;
      const endElement4 = document.querySelector('.soluciones') as HTMLElement;
  
      if (startElement4 && endElement4) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect4 = startElement4.getBoundingClientRect();
        const endRect4 = endElement4.getBoundingClientRect();
  
        const startX4 = startRect4.left + startRect4.width / 2 - svgRect.left;
        const startY4 = startRect4.bottom - svgRect.top;
        const endX4 = endRect4.left + endRect4.width / 2 - svgRect.left;
        const endY4 = endRect4.top - svgRect.top;
  
        path4 = draw.line(startX4, startY4, endX4, endY4)
            .stroke({ width: 2, color: '#12aaf5' });
  

      }
  
      // Conexión: Soluciones -> Energía
      const startElement5 = document.querySelector('.soluciones') as HTMLElement;
      const endElement5 = document.querySelector('.energia') as HTMLElement;
  
      if (startElement5 && endElement5) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect5 = startElement5.getBoundingClientRect();
        const endRect5 = endElement5.getBoundingClientRect();
  
        const startX5 = startRect5.left + startRect5.width / 2 - svgRect.left;
        const startY5 = startRect5.bottom - svgRect.top;
        const endX5 = endRect5.left + endRect5.width / 2 - svgRect.left;
        const endY5 = endRect5.top - svgRect.top;
  
        path5 = draw.line(startX5, startY5, endX5, endY5)
            .stroke({ width: 2, color: '#12aaf5' });

      }
  
      // Conexión: ISO -> Industria
      const startElement6 = document.querySelector('.iso') as HTMLElement;
      const endElement6 = document.querySelector('.industria') as HTMLElement;
  
      if (startElement6 && endElement6) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect6 = startElement6.getBoundingClientRect();
        const endRect6 = endElement6.getBoundingClientRect();
  
        const startX6 = startRect6.left + startRect6.width / 2 - svgRect.left;
        const startY6 = startRect6.top - svgRect.top;
        const endX6 = endRect6.left + endRect6.width - svgRect.left;
        const endY6 = endRect6.top + endRect6.height / 2 - svgRect.top;
  
        const curveRadius6 = 20; // Ajuste de radio de la curva
  
        path6 = draw.path(
          `M ${startX6} ${startY6} 
          L ${startX6} ${endY6 + curveRadius6} 
          Q ${startX6} ${endY6} ${startX6 - curveRadius6} ${endY6}
          L ${endX6} ${endY6}`)
        .stroke({ width: 2, color: '#12aaf5' })
        .fill('none');
  
      }
  
      // Conexión: ISO -> Análisis
      const startElement7 = document.querySelector('.iso') as HTMLElement;
      const endElement7 = document.querySelector('.analisis') as HTMLElement;
  
      if (startElement7 && endElement7) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect7 = startElement7.getBoundingClientRect();
        const endRect7 = endElement7.getBoundingClientRect();
  
        const startX7 = startRect7.left + startRect7.width / 2 - svgRect.left;
        const startY7 = startRect7.top + startRect7.height - svgRect.top;
        const endX7 = endRect7.left - svgRect.left;
        const endY7 = endRect7.top + endRect7.height / 2 - svgRect.top;
  
        const curveRadius7 = 20; // Ajuste de radio de la curva
  
        path7 = draw.path(
          `M ${startX7} ${startY7} 
          L ${startX7} ${endY7 - curveRadius7} 
          Q ${startX7} ${endY7} ${startX7 + curveRadius7} ${endY7}
          L ${endX7} ${endY7}`)
        .stroke({ width: 2, color: '#12aaf5' })
        .fill('none');
  

      }
  
      // Conexión: Monitoreo -> CalidadE
      const startElement8 = document.querySelector('.monitoreo') as HTMLElement;
      const endElement8 = document.querySelector('.calidadE') as HTMLElement;
  
      if (startElement8 && endElement8) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect8 = startElement8.getBoundingClientRect();
        const endRect8 = endElement8.getBoundingClientRect();
  
        const startX8 = startRect8.left + startRect8.width / 2 - svgRect.left;
        const startY8 = startRect8.top + startRect8.height - svgRect.top;
        const endX8 = endRect8.left + endRect8.width / 2 - svgRect.left;
        const endY8 = endRect8.top - svgRect.top;
  
        path8 = draw.path(
          `M ${startX8} ${startY8} 
          L ${startX8} ${endY8}`)
        .stroke({ width: 2, color: '#12aaf5' })
        .fill('none');
  
      }
  
      // Conexión: Industria -> Monitoreo
      const startElement9 = document.querySelector('.industria') as HTMLElement;
      const endElement9 = document.querySelector('.monitoreo') as HTMLElement;
  
      if (startElement9 && endElement9) {
        const svgRect = svgContainer.getBoundingClientRect();
        const startRect9 = startElement9.getBoundingClientRect();
        const endRect9 = endElement9.getBoundingClientRect();
  
        const startX9 = startRect9.left + startRect9.width / 2 - svgRect.left;
        const startY9 = startRect9.top + startRect9.height - svgRect.top;
        const endX9 = endRect9.left + endRect9.width / 2 - svgRect.left;
        const endY9 = endRect9.top - svgRect.top;
  
        path9 = draw.path(
          `M ${startX9} ${startY9} 
          L ${endX9} ${endY9}`)
        .stroke({ width: 2, color: '#12aaf5' })
        .fill('none');
  
      }

      this.animateLines(path1, path2, path3, path4, path5, path6, path7, path8, path9);

    }

  }

   // Método para activar un elemento
   setActive(element: string) {
    this.activeElements[element] = true;
  }

  // Método para desactivar un elemento
  setInactive(element: string) {
    this.activeElements[element] = false;
  }
  

  animateLines(path1, path2, path3, path4, path5, path6, path7, path8, path9){

    const pathLength = path1?.node?.getTotalLength();
    const pathLength2 = path2?.node?.getTotalLength();
    const pathLength3 = path3?.node?.getTotalLength();
    const pathLength4 = path4?.node?.getTotalLength();
    const pathLength5 = path5?.node?.getTotalLength();
    const pathLength6 = path6?.node?.getTotalLength();
    const pathLength7 = path7?.node?.getTotalLength();
    const pathLength8 = path8?.node?.getTotalLength();
    const pathLength9 = path9?.node?.getTotalLength();

    // Ocultar todas las líneas inicialmente
    path1.node.style.strokeDasharray = `${pathLength}`;
    path1.node.style.strokeDashoffset = `${pathLength}`;

    path2.node.style.strokeDasharray = `${pathLength2}`;
    path2.node.style.strokeDashoffset = `${pathLength2}`;

    path3.node.style.strokeDasharray = `${pathLength3}`;
    path3.node.style.strokeDashoffset = `${pathLength3}`;

    path4.node.style.strokeDasharray = `${pathLength4}`;
    path4.node.style.strokeDashoffset = `${pathLength4}`;

    path5.node.style.strokeDasharray = `${pathLength5}`;
    path5.node.style.strokeDashoffset = `${pathLength5}`;

    path6.node.style.strokeDasharray = `${pathLength6}`;
    path6.node.style.strokeDashoffset = `${pathLength6}`;

    path7.node.style.strokeDasharray = `${pathLength7}`;
    path7.node.style.strokeDashoffset = `${pathLength7}`;

    path8.node.style.strokeDasharray = `${pathLength8}`;
    path8.node.style.strokeDashoffset = `${pathLength8}`;

    path9.node.style.strokeDasharray = `${pathLength9}`;
    path9.node.style.strokeDashoffset = `${pathLength9}`;

    setTimeout(() => {
      gsap.fromTo(path1.node, 
        { strokeDasharray: pathLength, strokeDashoffset: -pathLength }, 
        { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut',onStart:()=>{
          this.setActive('oee')
        },onComplete:()=>{
          this.setActive('monitoreo')
        }
      }
      );
      setTimeout(() => {
        gsap.fromTo(path2.node, 
          { strokeDasharray: pathLength2, strokeDashoffset: pathLength2 }, 
          { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' , onComplete:()=>{
            this.setActive('factura')
          }}
        );
        setTimeout(() => {
          gsap.fromTo(path1.node, 
            { strokeDasharray: pathLength, strokeDashoffset: 0 }, 
            { strokeDashoffset: pathLength, duration: 1, ease: 'power1.inOut',onStart:()=>{
              this.setInactive('oee')
            } 
          }
          );
          setTimeout(() => {
            gsap.fromTo(path2.node, 
              { strokeDasharray: pathLength2, strokeDashoffset: 0 }, 
              { strokeDashoffset: -pathLength2, duration: 1, ease: 'power1.inOut',onStart:()=>{
                this.setInactive('monitoreo')
              },onComplete:()=>{
                this.setInactive('factura')
              } 
            }
            );
            setTimeout(() => {
              gsap.fromTo(path3.node, 
                { strokeDasharray: pathLength3, strokeDashoffset: pathLength3 }, 
                { strokeDashoffset: 0, duration: 0.75, ease: 'power1.inOut',onStart:()=>{
                  this.setActive('procesos')
                },onComplete:()=>{
                  this.setActive('kpis')
                }
              }
              );
              setTimeout(() => { 
                gsap.fromTo(path4.node, 
                    { strokeDasharray: pathLength4, strokeDashoffset: pathLength4 }, 
                    { strokeDashoffset: 0, duration: 0.75, ease: 'power1.inOut',onComplete:()=>{
                      this.setActive('soluciones')
                    }
                  }
                );
                setTimeout(() => {
                  gsap.fromTo(path5.node, 
                      { strokeDasharray: pathLength5, strokeDashoffset: pathLength5 }, 
                      { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut',onComplete:()=>{
                        this.setActive('energia')
                      } 
                    }
                  );
                  setTimeout(() => {
                    gsap.fromTo(path3.node, 
                      { strokeDasharray: pathLength3, strokeDashoffset: 0 }, 
                      { strokeDashoffset: -pathLength3, duration: 0.75, ease: 'power1.inOut',onStart:()=>{
                        this.setInactive('procesos')
                      } 
                    }
                    );
                    setTimeout(() => {
                      gsap.fromTo(path4.node, 
                        { strokeDasharray: pathLength4, strokeDashoffset: 0 }, 
                        { strokeDashoffset: -pathLength4, duration: 0.75, ease: 'power1.inOut',onStart:()=>{
                          this.setInactive('kpis')
                        } 
                        }
                      );
                      setTimeout(() => {
                        gsap.fromTo(path5.node, 
                          { strokeDasharray: pathLength5, strokeDashoffset: 0 }, 
                          { strokeDashoffset: -pathLength5, duration: 0.5, ease: 'power1.inOut',onStart:()=>{
                            this.setInactive('soluciones')
                          },onComplete:()=>{
                            this.setInactive('energia')
                          }
                        }
                        );
                        setTimeout(() => {
                          gsap.fromTo(path6.node, 
                            { strokeDasharray: pathLength6, strokeDashoffset: pathLength6 }, 
                            { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut',onStart:()=>{
                              this.setActive('iso')
                            },onComplete:()=>{
                              this.setActive('industria')
                            }
                          }
                          );
                          gsap.fromTo(path7.node, 
                            { strokeDasharray: pathLength7, strokeDashoffset: pathLength7 }, 
                            { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut',onComplete:()=>{
                              this.setActive('analisis')
                            } 
                          }
                          );
                          setTimeout(() => {

                            gsap.fromTo(path6.node, 
                              { strokeDasharray: pathLength6, strokeDashoffset: 0 }, 
                              { strokeDashoffset: -pathLength6, duration: 1, ease: 'power1.inOut',onStart:()=>{
                                this.setInactive('iso')
                              },
                              onComplete:()=>{
                                this.setInactive('industria')
                              }
                            }
                            );
                            gsap.fromTo(path7.node, 
                              { strokeDasharray: pathLength7, strokeDashoffset: 0 }, 
                              { strokeDashoffset: -pathLength7, duration: 1, ease: 'power1.inOut',onComplete:()=>{
                                this.setInactive('analisis')
                              } 
                            }
                            );
                            setTimeout(() => {
                              gsap.fromTo(path8.node, 
                                { strokeDasharray: pathLength8, strokeDashoffset: pathLength8 }, 
                                { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut',onStart:()=>{
                                  this.setActive('monitoreo')
                                },
                                onComplete:()=>{
                                  this.setActive('calidadE')
                                }
                              }
                              );
                              gsap.fromTo(path9.node, 
                                { strokeDasharray: pathLength9, strokeDashoffset: -pathLength9}, 
                                { strokeDashoffset:0, duration: 1, ease: 'power1.inOut',
                                  onComplete:()=>{
                                    this.setActive('industria')
                                  }
                                 }
                              );
                              setTimeout(() => {
                                gsap.fromTo(path8.node, 
                                  { strokeDasharray: pathLength8, strokeDashoffset: 0 }, 
                                  { strokeDashoffset: -pathLength8, duration: 1, ease: 'power1.inOut',
                                    onStart:()=>{
                                      this.setInactive('monitoreo')
                                    },
                                    onComplete:()=>{
                                      this.setInactive('calidadE')
                                    }
                                   }
                                );
                                gsap.fromTo(path9.node, 
                                  { strokeDasharray: pathLength9, strokeDashoffset: 0}, 
                                  { strokeDashoffset:pathLength9, duration: 1, ease: 'power1.inOut',onComplete:()=>{
                                    this.setInactive('industria')
                                  } 
                                  }
                                );
                                setTimeout(() => {
                                  this.animateLines(path1, path2, path3, path4, path5, path6, path7, path8, path9)
                                }, 500);
                              }, 2000);
                            }, 1000);
                          }, 1500);
                        }, 500);
                      }, 750);
                    }, 750);
                  }, 1000);
                }, 750);
              }, 750);
            }, 1000);
          }, 1000);
        }, 1500);
      }, 1000);
    }, 1000);
  }

  ngAfterViewInit() {

    this.drwaLines()

  }

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:40,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    items: 5, // Muestra cinco items por defecto
    responsive:{
      0:{
          items:5
      },
      700:{
          items:5
      },
      900:{
        items:6
    }
  }
  };

  showInitMailForm = true
  userData

  onSubmit(): void {
    if (this.reunionForm.valid) {
      //console.log('Form data:', this.reunionForm.value);

      let values = this.reunionForm.value
      // Aquí puedes hacer algo con los datos del formulario, como enviarlos a un servidor

      //buscar si correo esta registrado en evento eventoService
      this.eventoService.getLatestEventByEmail(values.emailProfesional.trim(), 'Mantenimiento en acción').then(event => {
        console.log('Evento encontrado:', event);

        if(event){
          this.showInitMailForm = false
          this.userData = event
          this.updateCountdown()
          this.userReady = true

          setTimeout(() => {
            const element = document.getElementById(`iconCronograma`);
            const elementMovil = document.getElementById(`iconCronogramaMovil`);
            let offsetPosition
            if(element && element.offsetParent !== null){
              const offset = 90; // Ajuste del offset para considerar el header fijo
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              offsetPosition = elementPosition - offset;
          
            }
            else if (elementMovil && elementMovil.offsetParent !== null){
              const offset = 90; // Ajuste del offset para considerar el header fijo
              const elementPosition = elementMovil.getBoundingClientRect().top + window.scrollY;
              offsetPosition = elementPosition - offset;
            }

            //console.log(element,elementMovil)

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }, 100);
        }
        else{
          this.showInitMailForm = false
          this.showRegister = true
        }

      }).catch(error => {
        console.error('Error al obtener el evento:', error);
      });
      
    } else {
      console.log('Form is invalid');
    }
  }

  userReady = false
  

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
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      });
    }
  }

  scrollTop(){
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  async handleFormSubmit(formData: formLead) {
    //console.log('FormData', formData);
    const userData = {
      name: formData.nombre,
      createdAt: +new Date(),
      displayName: formData.nombre,
      job: formData.cargo,
      email: formData.email,
      phoneNumber: formData.telefono
    }
    let mailchimpTag = formData.lugar
    mailchimpTag = 'eventoMantenimiento'

    await this.userService.createUser(userData, mailchimpTag)

      //buscar si correo esta registrado en evento eventoService
      this.eventoService.getLatestEventByEmail(userData.email.trim(), 'Mantenimiento en acción').then(event => {
        console.log('Evento encontrado:', event);

        if(event){
          this.showRegister = false
          this.showInitMailForm = false
          this.userData = event
          this.updateCountdown()
          this.userReady = true

          setTimeout(() => {
            const element = document.getElementById(`iconCronograma`);
            const elementMovil = document.getElementById(`iconCronogramaMovil`);
            let offsetPosition
            if(element && element.offsetParent !== null){
              const offset = 90; // Ajuste del offset para considerar el header fijo
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              offsetPosition = elementPosition - offset;
          
            }
            else if (elementMovil && elementMovil.offsetParent !== null){
              const offset = 90; // Ajuste del offset para considerar el header fijo
              const elementPosition = elementMovil.getBoundingClientRect().top + window.scrollY;
              offsetPosition = elementPosition - offset;
            }

            //console.log(element,elementMovil)

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });

          }, 100);
        }
        else{
          this.showInitMailForm = false
          this.showRegister = true
        }

      }).catch(error => {
        console.error('Error al obtener el evento:', error);
      });
    
  }

}

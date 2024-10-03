import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-plan-generator',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-generator.component.html',
  styleUrls: ['./plan-generator.component.css'] 
})

export class PlanGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  chart: Chart;

  coordMini = "assets/profiles/coordinador-mini.webp"
  
  trainingPlans = [
    {
      title: 'Plan de capacitación para Gerente de Mantenimiento',
      usuario: 'Arturo Romero',
      duration: '+90 horas',
      rol: 'Jefe de Mantenimiento',
      summary: 'Entrenamiento personalizado para Gerentes y Líderes de Mantenimiento basado en los requisitos de conocimientos indicados por el estandar BS EN 15628. ',
      objectives: [
        'Establecer estrategias acordes con la realidad actual de recursos humanos y económicos para mejorar la confiabilidad y disponibilidad de los activos físicos. Establecimiento de un sistema de KPI (indicadores clave de desempeño).',
        'Planificar el presupuesto especificando porcentajes de coste y gestionando los costes asociados a servicios internos, servicios contratados, materiales y materiales almacenados, así como controlar las ejecuciones.',
        'Especificar e implementar una estrategia de recursos, incluyendo la internalización y externalización, definir una estrategia de mantenimiento específica para la instalación, y brindar soporte en la planificación y ejecución de proyectos. ',
      ],
      courseCount: 14,
      courseList: [
        {
          title: 'Venta del valor generador de la Gestión de Mantenimiento',
          instructor: 'David Faro',
          courseImage: '/assets/images/cursos100x100/ventavalor.webp',
        },
        {
          title: 'Mantenimiento y Gestión de Activos',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/mantenimiento-y-gestion.webp',
        },
        {
          title: 'Proceso de Gestión de Mantenimiento',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/procesoGestionMant.webp',
        },
        {
          title: 'Autoevaluación de Mantenimiento',
          instructor: 'Lourival Augusto Tavares',
          courseImage: '/assets/images/cursos100x100/autoevaluacion.webp',
        },
        {
          title: 'Planificación, Programación y Costos de Mantenimiento',
          instructor: 'Jose Contreras Marquez',
          courseImage: '/assets/images/cursos100x100/pppcm.webp',
        },
        {
          title: 'Gestión de paradas de mantenimiento',
          instructor: 'Rodolfo Stonner',
          courseImage: '/assets/images/cursos100x100/gest-paradas.webp',
        },
        {
          title: 'Gestión y Optimización de Inventarios para Mantenimiento',
          instructor: 'Jose Contreras Marquez',
          courseImage: '/assets/images/cursos100x100/INV.webp',
        },
        {
          title: 'Mantenimiento centrado en confiabilidad RCM',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/rcm-100.webp',
        },
      ],
      image: 'assets/images/perfilesTecnicos/gerente-mantenimiento.webp' ,
      radarData: [80, 70, 90, 60, 50, 40, 70,  50, 40, 70]

    },
    {
      title: 'Plan de capacitación para Ingeniero de Confiabilidad',
      usuario: 'Lucia Camacaro',
      rol: 'Ing Confiabilidad',
      duration: '+100 horas',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      courseCount: 16,
      courseList: [
        {
          title: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
          instructor: 'Elimar Anauro Rojas',
          courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
        },
        {
          title: 'Taxonomía de acuerdo a ISO 14224',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
        },
        // {
        //   title: 'Análisis de Criticidad de Equipos',
        //   instructor: 'Tibaldo Díaz',
        //   courseImage: '/assets/images/cursos100x100/analisis-de-criticidad.webp',
        // },
        {
          title: 'Mantenimiento centrado en confiabilidad RCM',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/rcm-100.webp',
        },
        {
          title: 'Fundamentos de Gestión de Riesgo',
          instructor: 'Elimar Anauro Rojas',
          courseImage: '/assets/images/cursos100x100/riesgo.webp',
        },
        // {
        //   title: 'Análisis de Confiabilidad, Disponibilidad y Mantenibilidad (RAM)',
        //   instructor: 'Enrique González',
        //   courseImage: '/assets/images/cursos100x100/RAMPREDYC.webp',
        // },
        {
          title: 'Análisis Causa Raíz',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
        },
        
        {
          title: 'Planificación, Programación y Costos de Mantenimiento',
          instructor: 'Jose Contreras Marquez',
          courseImage: '/assets/images/cursos100x100/pppcm.webp',
        },
        {
          title: 'Confiabilidad humana',
          instructor: 'Joaquín Santos Herrera',
          courseImage: '/assets/images/cursos100x100/Confiabilidad-humana.webp',
        },
        {
          title: 'Preparación para certificación CMRP',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/cmrp100.webp',
        },
      ],
      image: 'assets/images/perfilesTecnicos/ing-confiabilidad.webp',
      radarData: [60, 50, 60, 50, 40, 60, 70, 80, 50, 60] 

    },
    {
      title: 'Plan de capacitación para Técnico Especialista',
      duration: '+140 horas',
      usuario: 'Daniela Maro',
      rol: 'Técnico Especialista',

      summary: 'Capacitación estructurada orientada a técnicos que requieren iniciar un plan de carrera dentro del Departamento de Mantenimiento.',
      objectives: [
        'Realizar y asegurar la ejecución segura de los planes de mantenimiento de acuerdo con las estrategias empresariales,',
        'Pensamiento orientado a resolución de fallas y solución de problemas.',
        'Preparación para asumir cargos de mayor responsabilidad',
      ],
      courseCount: 23,
      courseList: [
        {
            title: 'Estrategias de Mantenimiento',
            instructor: 'Tibaldo Díaz',
            courseImage: '/assets/images/cursos100x100/EstrategiaMant.webp',
        },
        {
            title: 'Mantenimiento Productivo Total (TPM)',
            instructor: 'Lourival Augusto Tavares',
            courseImage: '/assets/images/cursos100x100/tpm.webp',
        },
        // {
        //     title: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
        //     instructor: 'Elimar Anauro Rojas',
        //     courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
        // },
        {
            title: 'Análisis Causa Raíz',
            instructor: 'Tibaldo Díaz',
            courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
        },
        {
            title: 'Variadores de Frecuencia: Mantenimiento y Fallas',
            instructor: 'Pablo Malianni',
            courseImage: '/assets/images/cursos100x100/VFD-Mant.webp',
        },
        {
            title: 'Rodamientos Mecánicos',
            instructor: 'Luis Alberto Martinez',
            courseImage: '/assets/images/cursos100x100/rodamientos.webp',
        },
        // {
        //     title: 'Sellos Mecánicos',
        //     instructor: 'Luis Alberto Martinez',
        //     courseImage: '/assets/images/cursos100x100/sellos-mecanicos.webp',
        // },
        
        {
            title: 'Instrumentos de Temperatura (Fundamentos operativos)',
            instructor: 'Andrés González',
            courseImage: '/assets/images/cursos100x100/temperatura-inst.webp',
        },
        {
            title: 'Instrumentos de Presión (Fundamentos operativos)',
            instructor: 'Andrés González',
            courseImage: '/assets/images/cursos100x100/presion-instru.webp',
        },
        // {
        //     title: 'Análisis de Vibraciones CAT I',
        //     instructor: 'José David Trocel',
        //     courseImage: '/assets/images/cursos100x100/cat1.webp',
        // },
        
        {
            title: 'LOTO (Bloqueo y Etiquetado)',
            instructor: 'Andrés González',
            courseImage: '/assets/images/cursos100x100/loto.webp',
        },
      ],
      image: 'assets/images/perfilesTecnicos/tecnico-especialista.webp',
      radarData: [70, 60,  40, 50, 60, 50, 60, 70, 60, 50] 
    },
    {
      title: 'Plan de capacitación para Supervisor de Mantenimiento',
      duration: '+100 horas',
      usuario: 'Fernando López',
      rol: 'Supervisor Mantenimiento',


      summary: 'Entrenamiento personalizado para Supervisores de Mantenimiento basado en los requisitos de conocimientos indicados por el estandar BS EN 15628.',
      objectives: [
        'Aseguramiento de una correcta ejecución vertical del Mantenimiento',
        'Contribuir en el control y estimación para las decisiones económicas',
        'Asegurar la implementación de la estrategia de Mantenimiento',
      ],
      courseCount: 14,
      courseList: [
        {
            title: 'Estrategias de Mantenimiento',
            instructor: 'Tibaldo Díaz',
            courseImage: '/assets/images/cursos100x100/EstrategiaMant.webp',
        },
        {
          title: 'Proceso de Gestión de Mantenimiento',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/procesoGestionMant.webp',
        },
        {
          title: 'Mantenimiento y Gestión de Activos',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/mantenimiento-y-gestion.webp',
        },
        {
          title: 'Venta del valor generador de la Gestión de Mantenimiento',
          instructor: 'David Faro',
          courseImage: '/assets/images/cursos100x100/ventavalor.webp',
        },
        {
          title: 'Análisis de Solución de Problemas y Toma de Decisiones',
          instructor: 'Rodolfo Stonner',
          courseImage: '/assets/images/cursos100x100/solucion-de-problemas.webp',
        },
        // {
        //   title: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
        //   instructor: 'Elimar Anauro Rojas',
        //   courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
        // },
        {
          title: 'Taxonomía de acuerdo a ISO 14224',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
        },
        {
          title: 'Análisis de Criticidad de Equipos',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/analisis-de-criticidad.webp',
        },
        {
          title: 'Mantenimiento centrado en confiabilidad RCM',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/rcm-100.webp',
        },
        // {
        //   title: 'Análisis Causa Raíz',
        //   instructor: 'Tibaldo Díaz',
        //   courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
        // },
        // {
        //   title: 'Fundamentos de Análisis Económico en Proyectos de Confiabilidad',
        //   instructor: 'Carlos Villegas',
        //   courseImage: '/assets/images/cursos100x100/fundamentos-analisis.webp',
        // },

      ],
      radarData: [70, 60,  60, 50,20, 50, 40, 30, 60, 20],

      image: '/assets/images/perfilesTecnicos/Supervisor.png' 
    },
    {
      title: 'Plan de capacitación para Técnico de Mantenimiento Predictivo',
      duration: '+140 horas',
      usuario: 'Carlos Villa',
      rol: 'Tec Predictivo',


      summary: 'Capacitación en las técnicas de Predictivo basada en las recomendaciones de la norma ISO 18436.',
      objectives: [
        'Aseguramiento de una correcta ejecución vertical del Mantenimiento',
        'Contribuir en el control y estimación para las decisiones económicas',
        'Asegurar la implementación de la estrategia de Mantenimiento',
      ],
      courseCount: 16,
      courseList: [
        {
          title: 'Estrategias de Mantenimiento',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/EstrategiaMant.webp',
        },
        {
          title: 'Venta del valor generador de la Gestión de Mantenimiento',
          instructor: 'David Faro',
          courseImage: '/assets/images/cursos100x100/ventavalor.webp',
        },
        {
          title: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
          instructor: 'Elimar Anauro Rojas',
          courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
        },
        {
          title: 'Taxonomía de acuerdo a ISO 14224',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
        },
        {
          title: 'Análisis de Criticidad de Equipos',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/analisis-de-criticidad.webp',
        },
        {
          title: 'Análisis Causa Raíz',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
        },
        {
          title: 'Análisis de Vibraciones CAT I',
          instructor: 'José David Trocel',
          courseImage: '/assets/images/cursos100x100/cat1.webp',
        },
        // {
        //   title: 'Gestión normalizada de mantenimiento basado en la condición según ISO 17359',
        //   instructor: 'David Faro',
        //   courseImage: '/assets/images/cursos100x100/CBM17359.webp',
        // },
        {
          title: 'Mantenimiento centrado en confiabilidad RCM',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/rcm-100.webp',
        },
      ],
      image: '/assets/images/perfilesTecnicos/Tecnico-predictivo.png',
      radarData: [60, 50 ,60, 68,70,  87, 60, 43, 90, 23] 

    },
    {
      title: 'Plan de capacitación para Ingeniero de Mantenimiento',
      duration: '+100 horas',
      usuario: 'Felipe Dudamel',
      rol: 'Ing Mantenimiento',



      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      courseCount: 16,
      courseList: [
        {
          title: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
          instructor: 'Elimar Anauro Rojas',
          courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
        },
        {
          title: 'Taxonomía de acuerdo a ISO 14224',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
        },
        {
           title: 'Análisis de Criticidad de Equipos',
           instructor: 'Tibaldo Díaz',
           courseImage: '/assets/images/cursos100x100/analisis-de-criticidad.webp',
        },
        {
          title: 'Mantenimiento centrado en confiabilidad RCM',
          instructor: 'Tibaldo Díaz',
          courseImage: '/assets/images/cursos100x100/rcm-100.webp',
        },
        {
          title: 'Fundamentos de Gestión de Riesgo',
          instructor: 'Elimar Anauro Rojas',
          courseImage: '/assets/images/cursos100x100/riesgo.webp',
        },
        {
          title: 'Venta del valor generador de la Gestión de Mantenimiento',
          instructor: 'David Faro',
          courseImage: '/assets/images/cursos100x100/ventavalor.webp',
        },
        // {
        //   title: 'Análisis de Confiabilidad, Disponibilidad y Mantenibilidad (RAM)',
        //   instructor: 'Enrique González',
        //   courseImage: '/assets/images/cursos100x100/RAMPREDYC.webp',
        // },
        // {
        //   title: 'Fundamentos de Análisis Económico en Proyectos de Confiabilidad',
        //   instructor: 'Carlos Villegas',
        //   courseImage: '/assets/images/cursos100x100/fundamentos-analisis.webp',
        // },
        {
          title: 'Planificación, Programación y Costos de Mantenimiento',
          instructor: 'Jose Contreras Marquez',
          courseImage: '/assets/images/cursos100x100/pppcm.webp',
        },
        {
          title: 'Preparación para certificación CMRP',
          instructor: 'Gyogi Mitsuta',
          courseImage: '/assets/images/cursos100x100/cmrp100.webp',
        },

        
      ],
      image: '/assets/images/perfilesTecnicos/ing-mant.png',
      radarData: [70,  50, 60, 50 ,60, 70, 50, 40, 50, 60] 

    },
  ];

  selectedPlan: any;
  selectedPlanCourses: any[];

  ngOnInit(): void {
    this.selectedPlan = this.trainingPlans[0];
    this.selectedPlanCourses = this.selectedPlan.courseList;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.getChart();
    }
  }
  

  selectPlan(plan: any): void {
    this.selectedPlan = plan;
    this.selectedPlanCourses = this.selectedPlan.courseList;
    this.updateChart();
  }
  
  getChart() {
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          
          'Gest. Mant', 'Confiabilidad', 'Predictivo',
          'HSE', 'Instr & Cont.', 'Integridad', 'Mecanica',
          'Sist & Proc', 'Eléctrica', 'Gest Proyectos'
        ],
        datasets: [{
          label: 'Capacidades',
          data: this.selectedPlan.radarData,
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 1
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          r: {
            ticks: {
              display: false
            }
          }
        }
      }
    });
  }
  
  
  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.selectedPlan.radarData;
      this.chart.update();
    }
  }
  
  

  
}
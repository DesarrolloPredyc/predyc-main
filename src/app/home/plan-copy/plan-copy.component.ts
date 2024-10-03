import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Course {
  nombre: string;
  instructor: string;
  courseImage: string;
  status: 'completado' | 'atrasado' | 'pendiente';
}

// interface Month {
//   name: string;
//   courses: Course[];
// }

interface TrainingPlan {
  nombre: string;
  perfil: string | number;
  summary: string;
  objectives: string[];
  progreso: number | string;
  ritmo: 'medio' | 'optimo' | 'bajo';
  months: {
    month: string;
    courses: Course[];
  }[];
  image: string;
}

@Component({
  selector: 'app-plan-copy',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-copy.component.html',
  styleUrls: ['./plan-copy.component.css'] })

export class PlanCopyComponent implements OnInit {


  coordMini = "assets/profiles/coordinador-mini.webp"
  
  trainingPlans: TrainingPlan[] = [
    {
      nombre: 'Arturo Romero ',
      perfil: 'Jefe de Mantenimiento',
      summary: 'Entrenamiento personalizado para Gerentes y Líderes de Mantenimiento basado en los requisitos de conocimientos indicados por el estandar BS EN 15628. ',
      objectives: [
        'Establecer estrategias acordes con la realidad actual de recursos humanos y económicos para mejorar la confiabilidad y disponibilidad de los activos físicos. Establecimiento de un sistema de KPI (indicadores clave de desempeño).',
        'Planificar el presupuesto especificando porcentajes de coste y gestionando los costes asociados a servicios internos, servicios contratados, materiales y materiales almacenados, así como controlar las ejecuciones.',
        'Especificar e implementar una estrategia de recursos, incluyendo la internalización y externalización, definir una estrategia de mantenimiento específica para la instalación, y brindar soporte en la planificación y ejecución de proyectos. ',
      ],
      ritmo : 'medio',
      progreso: '92%',
      months: [
        {
          month: 'Mayo',
          courses: [
            {
              nombre: 'Venta del valor generador de la Gestión de Mantenimiento',
              instructor: 'David Faro',
              courseImage: '/assets/images/cursos100x100/ventavalor.webp',
              status: 'completado',

            },
            {
              nombre: 'Mantenimiento y Gestión de Activos',
              instructor: 'Gyogi Mitsuta',
              courseImage: '/assets/images/cursos100x100/mantenimiento-y-gestion.webp',
              status: 'completado',

            },
            ]
          },
        {
          month: 'Junio',
          courses: [
            {
              nombre: 'Proceso de Gestión de Mantenimiento',
              instructor: 'Gyogi Mitsuta',
              courseImage: '/assets/images/cursos100x100/procesoGestionMant.webp',
              status: 'completado',

            },
            {
              nombre: 'Autoevaluación de Mantenimiento',
              instructor: 'Lourival Augusto Tavares',
              courseImage: '/assets/images/cursos100x100/autoevaluacion.webp',
              status: 'pendiente',

            },
            {
              nombre: 'Planificación, Programación y Costos de Mantenimiento',
              instructor: 'Jose Contreras Marquez',
              courseImage: '/assets/images/cursos100x100/pppcm.webp',
              status: 'pendiente',

            },
          ]
        },
        // {
        //   month: 'Junio',
        //     courses: [
            
        //     {
        //       nombre: 'Gestión de paradas de mantenimiento',
        //       instructor: 'Rodolfo Stonner',
        //       courseImage: '/assets/images/cursos100x100/gest-paradas.webp',
        //       status: 'pendiente',

        //     },
        //   ],
        // }
      ],
      image: 'assets/images/perfilesTecnicos/gerente-mantenimiento.webp',

    },
    {
      nombre: 'Lucia Camacaro',
      perfil: 'Técnico Especialista',
      ritmo : 'bajo',
      summary: 'Capacitación específica para técnicos especialistas enfocada en mejorar la eficiencia y efectividad en mantenimiento.',
      objectives: [
        'Dominar las técnicas y herramientas del Mantenimiento Productivo Total (TPM) para optimizar el rendimiento de los activos.',
        'Capacitarse en aspectos avanzados de mantenimiento mecánico como rodamientos y sellos mecánicos.',
        'Profundizar en el manejo de instrumentos de medición de temperatura y presión en procesos industriales.',
        'Adquirir habilidades en el procedimiento de bloqueo y etiquetado LOTO para asegurar la seguridad en operaciones de mantenimiento.',
      ],
      progreso: '75%',
      months: [
        {
          month: 'Mayo',
          courses: [
            {
              nombre: 'Mantenimiento Productivo Total (TPM)',
              instructor: 'Lourival Augusto Tavares',
              courseImage: '/assets/images/cursos100x100/tpm.webp',
              status: 'completado',
            },
            {
              nombre: 'Rodamientos Mecánicos',
              instructor: 'Luis Alberto Martinez',
              courseImage: '/assets/images/cursos100x100/rodamientos.webp',
              status: 'completado',
            },
            // {
            //   nombre: 'Sellos Mecánicos',
            //   instructor: 'Luis Alberto Martinez',
            //   courseImage: '/assets/images/cursos100x100/sellos-mecanicos.webp',
            //   status: 'completado',
            // },
          ]
        },
        {
          month: 'Junio',
          courses: [
            {
              nombre: 'Instrumentos de Temperatura (Fundamentos operativos)',
              instructor: 'Andrés González',
              courseImage: '/assets/images/cursos100x100/temperatura-inst.webp',
              status: 'atrasado',
            },
            {
              nombre: 'Instrumentos de Presión (Fundamentos operativos)',
              instructor: 'Andrés González',
              courseImage: '/assets/images/cursos100x100/presion-instru.webp',
              status: 'pendiente',
            },
            {
              nombre: 'LOTO (Bloqueo y Etiquetado)',
              instructor: 'Andrés González',
              courseImage: '/assets/images/cursos100x100/loto.webp',
              status: 'pendiente',
            },
          ]
        },
        // Añadir más meses y cursos según sea necesario
      ],
      image: 'assets/images/perfilesTecnicos/tecnico-especialista.webp',
    },
    {
      nombre: 'Fernando Lopez',
      ritmo : 'optimo',
      perfil: 'Supervisor de Mantenimiento',
      summary: 'Desarrollo de competencias para supervisores de mantenimiento enfocado en liderazgo y gestión efectiva de equipos y recursos.',
      objectives: [
        'Dominar estrategias avanzadas de gestión y mantenimiento para mejorar la eficiencia operativa.',
        'Capacitarse en técnicas de análisis de problemas y toma de decisiones aplicadas al mantenimiento industrial.',
        'Profundizar en la aplicación de metodologías de confiabilidad y mantenibilidad según normativas internacionales.',
        'Preparación para la certificación CMRP (Certified Maintenance & Reliability Professional) para validar conocimientos y habilidades en gestión de mantenimiento.',
      ],
      progreso: '50%',
      months: [
        {
          month: 'Mayo',
          courses: [
            {
              nombre: 'Venta del valor generador de la Gestión de Mantenimiento',
              instructor: 'David Faro',
              courseImage: '/assets/images/cursos100x100/ventavalor.webp',
              status: 'completado',
            },
            {
              nombre: 'Análisis de Solución de Problemas y Toma de Decisiones',
              instructor: 'Rodolfo Stonner',
              courseImage: '/assets/images/cursos100x100/solucion-de-problemas.webp',
              status: 'completado',
            },
          ]
        },
        {
          month: 'Junio',
          courses: [
            {
              nombre: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
              instructor: 'Elimar Anauro Rojas',
              courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
              status: 'pendiente',
            },
            {
              nombre: 'Taxonomía de acuerdo a ISO 14224',
              instructor: 'Tibaldo Díaz',
              courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
              status: 'pendiente',
            },
            {
              nombre: 'Análisis Causa Raíz',
              instructor: 'Tibaldo Díaz',
              courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
              status: 'pendiente',
            },
            // {
            //   nombre: 'Fundamentos de Análisis Económico en Proyectos de Confiabilidad',
            //   instructor: 'Carlos Villegas',
            //   courseImage: '/assets/images/cursos100x100/fundamentos-analisis.webp',
            //   status: 'pendiente',
            // },
          ]
        },
        // Añadir más meses y cursos según sea necesario
      ],
      image: '/assets/images/perfilesTecnicos/Supervisor.png',
    },
    {
      nombre: 'Daniela Maro',
      ritmo : 'medio',
      perfil: 'Tecnico Predictivo',
      summary: 'Desarrollo de competencias para supervisores de mantenimiento enfocado en liderazgo y gestión efectiva de equipos y recursos.',
      objectives: [
        'Dominar estrategias avanzadas de gestión y mantenimiento para mejorar la eficiencia operativa.',
        'Capacitarse en técnicas de análisis de problemas y toma de decisiones aplicadas al mantenimiento industrial.',
        'Profundizar en la aplicación de metodologías de confiabilidad y mantenibilidad según normativas internacionales.',
        'Preparación para la certificación CMRP (Certified Maintenance & Reliability Professional) para validar conocimientos y habilidades en gestión de mantenimiento.',
      ],
      progreso: '68%',
      months: [
        {
          month: 'Mayo',
          courses: [
            // {
            //   nombre: 'Estrategias de Mantenimiento',
            //   instructor: 'Tibaldo Díaz',
            //   courseImage: '/assets/images/cursos100x100/EstrategiaMant.webp',
            //   status: 'completado',

            // },
            {
              nombre: 'Venta del valor generador de la Gestión de Mantenimiento',
              instructor: 'David Faro',
              courseImage: '/assets/images/cursos100x100/ventavalor.webp',
              status: 'completado',

            },
            {
              nombre: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
              instructor: 'Elimar Anauro Rojas',
              courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
              status: 'completado',
            },
            // {
            //   nombre: 'Venta del valor generador de la Gestión de Mantenimiento',
            //   instructor: 'David Faro',
            //   courseImage: '/assets/images/cursos100x100/ventavalor.webp',
            //   status: 'completado',
            // },
            // {
            //   nombre: 'Análisis de Solución de Problemas y Toma de Decisiones',
            //   instructor: 'Rodolfo Stonner',
            //   courseImage: '/assets/images/cursos100x100/solucion-de-problemas.webp',
            //   status: 'completado',
            // },
          ]
        },
        {
          month: 'Junio',
          courses: [
            {
              nombre: 'Taxonomía de acuerdo a ISO 14224',
              instructor: 'Tibaldo Díaz',
              status: 'pendiente',
              courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
            },
            {
              nombre: 'Análisis de Criticidad de Equipos',
              instructor: 'Tibaldo Díaz',
              status: 'pendiente',
              courseImage: '/assets/images/cursos100x100/analisis-de-criticidad.webp',
            },
            {
              nombre: 'Análisis Causa Raíz',
              instructor: 'Tibaldo Díaz',
              status: 'pendiente',
              courseImage: '/assets/images/cursos100x100/Causa-Raiz.webp',
            },
          ]
        },
        // Añadir más meses y cursos según sea necesario
      ],
      image: '/assets/images/perfilesTecnicos/ing-confiabilidad.webp',
    },
    {
      nombre: 'Carlos Villa',
      ritmo : 'optimo',
      perfil: 'Ing de Confiabilidad',
      summary: 'Desarrollo de competencias para supervisores de mantenimiento enfocado en liderazgo y gestión efectiva de equipos y recursos.',
      objectives: [
        'Dominar estrategias avanzadas de gestión y mantenimiento para mejorar la eficiencia operativa.',
        'Capacitarse en técnicas de análisis de problemas y toma de decisiones aplicadas al mantenimiento industrial.',
        'Profundizar en la aplicación de metodologías de confiabilidad y mantenibilidad según normativas internacionales.',
        'Preparación para la certificación CMRP (Certified Maintenance & Reliability Professional) para validar conocimientos y habilidades en gestión de mantenimiento.',
      ],
      progreso: '32%',
      months: [
        {
          month: 'Mayo',
          courses: [
            {
              status: 'completado',
              nombre: 'Introducción a la Confiabilidad, Disponibilidad y Mantenibilidad',
              instructor: 'Elimar Anauro Rojas',
              courseImage: '/assets/images/cursos100x100/introdCnfiabilidad.webp',
            },
            {
              status: 'completado',
              nombre: 'Taxonomía de acuerdo a ISO 14224',
              instructor: 'Tibaldo Díaz',
              courseImage: '/assets/images/cursos100x100/Taxonomia.webp',
            },
          ]
        },
        {
          month: 'Junio',
          courses: [
            {
              status:'completado',
               nombre: 'Mantenimiento centrado en confiabilidad RCM',
              instructor: 'Tibaldo Díaz',
              courseImage: '/assets/images/cursos100x100/rcm-100.webp',
            },
            {
              status:'completado',
               nombre: 'Fundamentos de Gestión de Riesgo',
              instructor: 'Elimar Anauro Rojas',
              courseImage: '/assets/images/cursos100x100/riesgo.webp',
            },
            {
              status:'completado',
               nombre: 'Análisis de Confiabilidad, Disponibilidad y Mantenibilidad (RAM)',
              instructor: 'Enrique González',
              courseImage: '/assets/images/cursos100x100/RAMPREDYC.webp',
            },
          ]
        },
        // Añadir más meses y cursos según sea necesario
      ],
      image: '/assets/images/perfilesTecnicos/Tecnico-predictivo.png',
    },
  ];

  selectedPlan: TrainingPlan;
  selectedMonthIndex: number = 0; // Para seleccionar el mes actualmente mostrado

  ngOnInit(): void {
    this.selectedPlan = this.trainingPlans[0]; // Selecciona el primer plan como predeterminado
  }

  selectPlan(plan: TrainingPlan): void {
    this.selectedPlan = plan;
  }

  // Función para seleccionar el mes actualmente mostrado
  selectMonth(index: number): void {
    this.selectedMonthIndex = index;
  }
}
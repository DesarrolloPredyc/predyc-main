import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import 'chartjs-plugin-datalabels';


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-plan-diagnostico',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-diagnostico.component.html',
  styleUrls: ['./plan-diagnostico.component.css']
})
export class PlanDiagnosticoComponent implements OnInit {

  chart: Chart;
  radarChart: Chart;

  coordMini = "assets/profiles/coordinador-mini.webp";
  
  trainingPlans = [
    {
      nombre: 'Felipe Dudamel',
      perfil: 'Técnico Mecánico',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      progreso: 16,
      image: '/assets/images/perfilesTecnicos/Tecnico-mecanico.png',
      barData: {
        labels: ['Terminología', 'Mejora Continua', 'Mejores Prácticas', 'Gestión', 'Normativa', 'Predictivo', 'KPIs', 'Confiabilidad'],
        values: [70, 50, 30, 60, 80, 20, 40, 90]
      }
    },
    {
      nombre: 'Arturo Romero',
      perfil: 'Jefe de Mantenimiento',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      progreso: 16,
      image: '/assets/images/perfilesTecnicos/gerente-mantenimiento.webp',
      barData: {
        labels: ['Diferente Info', 'test', 'Teesting', 'Gestión', 'Normativa', 'Mantenimiento', 'KPIs', 'Confiabilidad'],
        values: [90, 76, 52, 48, 46, 41, 37, 32]
      }
    },
    {
      nombre: 'Luisa Camacaro',
      perfil: 'Ing Confiabilidad',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      progreso: 16,
      image: '/assets/images/perfilesTecnicos/ing-confiabilidad.webp',
      barData: {
        labels: ['Infoaqui', 'Informacion', 'info indep', 'Gestión', 'Normativa', 'Mantenimiento', 'KPIs', 'Confiabilidad'],
        values: [90, 76, 52, 48, 46, 41, 37, 32]
      }
    },
    {
      nombre: 'Fernando López',
      perfil: 'Supervisor de Mtto',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      progreso: 16,
      image: '/assets/images/perfilesTecnicos/Supervisor.png',
      barData: {
        labels: ['Infoaqui', 'Informacion', 'info indep', 'Gestión', 'Normativa', 'Mantenimiento', 'KPIs', 'Confiabilidad'],
        values: [67, 42, 98, 24, 45, 65, 90, 86]
      }
    },
    {
      nombre: 'Carlos Villa',
      perfil: 'Técnico Predictivo',
      summary: 'Desarrollando Competencias para Mejorar la Confiabilidad y Disponibilidad de Activos Industriales.',
      objectives: [
        'Iniciación en la implementación de las metodologías de confiabilidad',
        'Construcción de estrategias y planes de mantenimiento optimizados',
        'Identificar las oportunidades de mejora',
      ],
      progreso: 16,
      image: '/assets/images/perfilesTecnicos/Tecnico-predictivo.png',
      barData: {
        labels: ['Infoaqui', 'Informacion', 'info indep', 'Gestión', 'Normativa', 'Mantenimiento', 'KPIs', 'Confiabilidad'],
        values: [34, 90, 35, 68, 41, 92, 83, 75]
      }
    },
  ];

  selectedPlan: any;
  selectedPlanCourses: any[];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.selectedPlan = this.trainingPlans[0];
    this.selectedPlanCourses = this.selectedPlan.courseList;
    if (isPlatformBrowser(this.platformId)) {
      
      this.createCharts();
    }
  }

  selectPlan(plan: any): void {
    this.selectedPlan = plan;
    this.selectedPlanCourses = this.selectedPlan.courseList;
    if (isPlatformBrowser(this.platformId)) {
      this.createCharts();
    }
  }

  createCharts() {
    
    // const barCanvas = document.getElementById("barChart") as HTMLCanvasElement;
    // const barCtx = barCanvas?.getContext("2d");

    const radarCanvas = document.getElementById("radarChart") as HTMLCanvasElement;
    const radarCtx = radarCanvas?.getContext("2d");

    if (this.chart) {
      this.chart.destroy();
    }

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    const barData = this.selectedPlan.barData;

    // this.chart = new Chart(barCtx, {
    //   type: 'bar',
    //   data: {
    //     labels: barData.labels,
    //     datasets: [{
    //       label: 'Progreso',
    //       data: barData.values,
    //       backgroundColor: barData.values.map(value => 
    //         value > 50 ? '#4CAF50' : value > 30 ? '#FFC107' : '#F44336'
    //       ),
    //       borderColor: 'white',
    //       borderWidth: 1,
    //       borderRadius: 4,
    //       barPercentage: 1.5,  // Porcentaje de ancho de la barra
    //       categoryPercentage: 1,  // Porcentaje de ancho de la categoría
    //     }]
    //   },

    //   options: {
    //     indexAxis: 'y',
    //     scales: {
    //       x: {
    //         beginAtZero: true,
    //         max: 100
            
    //       }
    //     },
    //     plugins: {
    //       datalabels: {
    //         anchor: 'end', // Alineación del texto dentro de la barra
    //         align: 'end' // Posición del texto dentro de la barra
            
    //       }
    //     },
    //   }
    // });
  
    this.radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: barData.labels,
        datasets: [{
          label: 'Progreso',
          data: barData.values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            display: false  // Aquí ocultamos la leyenda
          }
        }
      }
    });
  }
}
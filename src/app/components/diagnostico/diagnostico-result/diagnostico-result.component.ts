import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CourseService } from '../../../shared/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { IconService } from '../../../services/icon.service';
import annotationPlugin from "chartjs-plugin-annotation";


import { Chart, registerables } from 'chart.js';
import { ActivityFormComponent } from '../../activity-form/activity-form.component';
import { QuestionType } from '../../activity-form/activity-classes';
import { DemoRequestPopupComponent } from '../../../home/demo-request-popup/demo-request-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

Chart.register(...registerables);



@Component({
  selector: 'app-diagnostico-result',
  standalone: true,
  imports: [CommonModule,FlexLayoutModule,ActivityFormComponent,DemoRequestPopupComponent],
  templateUrl: './diagnostico-result.component.html',
  styleUrl: './diagnostico-result.component.css'
})
export class diagnosticoResultComponent {

  isMobile: boolean = false;
  loaded: boolean = false;

  constructor(private screenSizeService: ScreenSizeService,private courseService:CourseService,
    private route: ActivatedRoute, @Inject(PLATFORM_ID) private platform: Object,
    public icon:IconService,    private _snackBar: MatSnackBar,

  ) {
    Chart.register(annotationPlugin);
  }

  chart: Chart;
  chartM: Chart;

  result 
  isSuccess: boolean = null;

  questionTypesModel = QuestionType;
  hasError = false

  ngOnInit() {
    this.hasError = false
    this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loaded = true;
    });

    this.route.params.subscribe(async routeParams => {
      let url = routeParams.id
      console.log(url)
      try {
        const result = await this.courseService.getResultDiagnostico(url);
        console.log('result', result);
        this.result = result;
        this.hasError = false; // Si hay resultados, no hay error
      } catch (error) {
        console.error('Error al obtener el diagnóstico:', error);
        this.hasError = true; // Si ocurre un error, activar la bandera de error
      }

      if (isPlatformBrowser(this.platform)) {
        this.getChart(this.result)
      }
      


    });
  }

  activity

  presenting = false;

  questionsLength = 0
  categoriesLength = 0
  categoriesString


  getChart(result) {
    // Paso 1: Procesar las respuestas para obtener cuántas son de cada categoría (classId)
    let categories = {};
  
    result.answers.forEach(answer => {
      let classId = answer.classId;
      
      // Contar respuestas del usuario por classId
      if (categories[classId]) {
        categories[classId]++;
      } else {
        categories[classId] = 1;
      }
    });
  
    // Paso 2: Obtener las categorías y ordenarlas alfabéticamente
    let categoriesList = Object.keys(categories).sort();
  
    // Paso 3: Generar los datos para la primera serie (las respuestas del usuario)
    let dataUser = [];
    categoriesList.forEach(category => {
      dataUser.push(categories[category]);
    });
  
    // Paso 4: Generar los datos para la segunda serie (porcentaje basado en result.resultByClass)
    let dataResultByClass = [];
    categoriesList.forEach(category => {
      // Buscar el resultado correspondiente en resultByClass por classId
      let resultClass = result.resultByClass.find(item => item.classId === category);
      
      if (resultClass) {
        let score = resultClass.score / 100; // Convertir el porcentaje a valor decimal
        let userValue = categories[category]; // Obtener el valor de la primera serie
        dataResultByClass.push(score * userValue); // Llenar en base al porcentaje
      } else {
        dataResultByClass.push(0); // Si no hay score para esta categoría, llenar con 0
      }
    });
  
    // Paso 5: Configurar el gráfico de radar con dos series
    const canvas = document.getElementById('chartD') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const canvasM = document.getElementById('chartM') as HTMLCanvasElement;
    const ctxM = canvasM.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctxM, {
      type: 'radar',
      data: {
        labels: categoriesList, // Categorías
        datasets: [
          {
            label: 'Resultado',
            data: dataResultByClass, // Porcentaje basado en el resultado de resultByClass
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.4)', // Ajusta la transparencia al 40% para una mejor visibilidad
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Óptimo',
            data: dataUser, // Respuestas del usuario
            fill: true,
            backgroundColor: 'rgba(175, 239, 159, 0.5)', // Ajusta la transparencia al 50%
            borderColor: "#3ED219",
            pointBackgroundColor: "#3ED219",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#3ED219",
            pointRadius: 3,
          },

        ]  
      },
      options: {
        elements: {
          line: {
            borderWidth: 1
          }
        },
        plugins: {
          legend: {
            display: false,
            position: 'bottom'  // Cambia la posición de la leyenda a debajo del gráfico
          },
          tooltip: {
            enabled: false
          },
          annotation: {
						annotations: {
							label1: {
								type: "label",
								xValue: 2.5,
								yValue: 60,
								backgroundColor: "rgba(255,255,255,0.8)",
								borderRadius: 16,
								content: `${result.score > 0 ? result.score.toFixed(0) : ""}`,
								font: {
									size: 14,
								},
							},
						},
					},
        },
        scales: {
          r: {
            // max: 100,
            beginAtZero: true,
            ticks: {
              display: false,
              //stepSize: 20,
            },
          },
        },
      }
    });
  
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: categoriesList, // Categorías
        datasets: [
          {
            label: 'Resultado',
            data: dataResultByClass, // Porcentaje basado en el resultado de resultByClass
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.4)', // Ajusta la transparencia al 40% para una mejor visibilidad
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Óptimo',
            data: dataUser, // Respuestas del usuario
            fill: true,
            backgroundColor: 'rgba(175, 239, 159, 0.5)', // Ajusta la transparencia al 50%
            borderColor: "#3ED219",
            pointBackgroundColor: "#3ED219",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#3ED219",
            pointRadius: 3,
          }
        ]        
      },
      options: {
        elements: {
          line: {
            borderWidth: 1
          }
        },
        plugins: {
          legend: {
            display: false,
            position: 'bottom'  // Cambia la posición de la leyenda a debajo del gráfico
          },
          tooltip: {
            enabled: false
          },
          annotation: {
						annotations: {
							label1: {
								type: "label",
								xValue: 2.5,
								yValue: 60,
								backgroundColor: "rgba(255,255,255,0.8)",
								borderRadius: 16,
								content: `${result.score > 0 ? result.score.toFixed(0) : ""}`,
								font: {
									size: 14,
								},
							},
						},
					},
        },
        scales: {
          r: {
            // max: 100,
            beginAtZero: true,
            ticks: {
              display: false,
              //stepSize: 20,
            },
          },
        },
      }
    });
  }
  

  openImageInNewTab(imageUrl: string) {
		window.open(imageUrl, '_blank');
	  }
  
  
  
    isPopupVisible = false

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  copiaExitosa(message: string = 'Enlace agregado al portapapeles.', action: string = '') {
    navigator.clipboard.writeText(`https://predyc.com/resultado-diagnostico/${this.result.id}`).then(() => {
      this._snackBar.open(message, action, {
        duration: 1000,
        panelClass: ['gray-snackbar'],
      });
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  }
  

}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CourseService } from '../../../shared/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { IconService } from '../../../services/icon.service';
import annotationPlugin from "chartjs-plugin-annotation";
import { FooterComponent } from '../../footer/footer.component';


import { Chart, registerables } from 'chart.js';
import { ActivityFormComponent } from '../../activity-form/activity-form.component';
import { FooterMobileComponent } from '../../home-mobile/footer-mobile/footer-mobile.component';
import { DemoRequestPopupComponent } from '../../../home/demo-request-popup/demo-request-popup.component';
import { SeoService } from '../../../services/seo.service';
import { firstValueFrom } from 'rxjs';
Chart.register(...registerables);



@Component({
  selector: 'app-diagnostico-form',
  standalone: true,
  imports: [CommonModule,FooterComponent,FooterMobileComponent,FlexLayoutModule,ActivityFormComponent,DemoRequestPopupComponent],
  templateUrl: './diagnostico-form.component.html',
  styleUrl: './diagnostico-form.component.css'
})
export class diagnosticoFormComponent {

  isMobile: boolean = false;
  loaded: boolean = false;

  constructor(private screenSizeService: ScreenSizeService,private courseService:CourseService,
    private route: ActivatedRoute, @Inject(PLATFORM_ID) private platform: Object,
    public icon:IconService,private seo: SeoService,

  ) {
    Chart.register(annotationPlugin);
  }

  chart: Chart;
  chartM: Chart;


  ngOnInit() {
    this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loaded = true;
    });

    this.route.params.subscribe(async routeParams => {
      let url = routeParams.id
      await this.fetchActivityCertifications(url)
      
    });
  }

  activity

  presenting = false;

  questionsLength = 0
  categoriesLength = 0
  categoriesArray=[]
  categoriesString

  fixActivityModelExam(test) {
		test.questions.forEach((question) => {
			if (!question.type.value) {
				question.type = this.getTypeQuestion(question.type);
			}
		});
	}

	getTypeQuestion(type) {
		const TYPE_CALCULATED: string = "calculated";
		const TYPE_MATCHING: string = "matching";
		const TYPE_NUMERIC: string = "numeric";
		const TYPE_MULTIPLE_CHOICE: string = "multiple_choice";
		const TYPE_SINGLE_CHOICE: string = "single_choice";
		const TYPE_SHORT_ANSWER: string = "short-answer";
		const TYPE_COMPLETE: string = "complete";
		const TYPE_TRUE_OR_FALSE: string = "true-false";

		let typeToInfoDict = {
			[TYPE_MULTIPLE_CHOICE]: {
				value: TYPE_MULTIPLE_CHOICE,
				displayName: "Opción Múltiple",
				tooltipInfo: "Configure una serie de opciones para una pregunta - una o mas respuestas pueden ser correctas",
				createInstructions: "",
				solveInstructions: "Seleccione una o mas opciones como correctas del listado de opciones",
			},
			[TYPE_SINGLE_CHOICE]: {
				value: TYPE_SINGLE_CHOICE,
				displayName: "Opción Simple",
				tooltipInfo: "Configure una serie de opciones para una pregunta - solo una respuesta puede ser correcta",
				createInstructions: "",
				solveInstructions: "Seleccione la opción correcta del listado de opciones",
			},
			[TYPE_COMPLETE]: {
				value: TYPE_COMPLETE,
				displayName: "Completar",
				tooltipInfo: "Configure una pregunta cuyo texto pueda ser completado a partir de las opciones provistas para cada marcador de referencia - cada marcador debe tener una única respuesta correcta",
				createInstructions: "Ingrese cada marcador como una palabra de referencia encerrada entre corchetes ([]).<br/>Ejemplo: El presidente [nombreDelPresidente] nacio en [paisDeNacimiento]",
				solveInstructions: "Complete el texto utilizando los selectores proporcionados para dar sentido a la frase",
			},
			[TYPE_TRUE_OR_FALSE]: {
				value: TYPE_TRUE_OR_FALSE,
				displayName: "Verdadero o Falso",
				tooltipInfo: "Configure una pregunta cuya respuesta sea verdadero o falso",
				createInstructions: "Marque las opciones que sean verdaderas y deje en blanco las que sean falsas",
				solveInstructions: "Clasifique las siguientes afirmaciones como verdadera o falsa",
			},
		};

		let typeComplete = typeToInfoDict[type];
		return typeComplete;
	}


  async fetchActivityCertifications(id) {
    try {
      const result = await firstValueFrom(this.courseService.getActivityCertificationsById(id));
      this.activity = result[0]

      //console.log(this.activity)
      this.fixActivityModelExam( this.activity)
      

      this.activity.isTest = true
      this.activity.validationTestType = 'inicial'
      this.activity.isTestProfile = true
      //console.log(result)
      let categories = {};
      this.activity.questions.forEach(pregunta => {
        if (categories[pregunta.classId]) {
          // Si el classId ya existe, incrementa el contador
          categories[pregunta.classId]++;
        } else {
          // Si el classId no existe, inicializa con 1
          categories[pregunta.classId] = 1;
        }     
      });
      //console.log('categories',categories)
      this.questionsLength = this.activity.questions.length
      this.categoriesLength = Object.keys(categories).length;

      const categoriesList = []

      Object.keys(categories).forEach(category => {
        categoriesList.push(category)
      });

      // Ordenar alfabéticamente
      categoriesList.sort();

      // Convertir en un string separado por comas
      this.categoriesArray = categoriesList
      const categoriesString = categoriesList.join(', ');
      this.categoriesString = categoriesString;


      if (isPlatformBrowser(this.platform)) {
        this.getChart(categoriesList,categories);
      }

    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  }

  getChart(categoriesList,categories) {


    let data = []
    categoriesList.forEach(categoey => {

      let dato = categories[categoey]
      data.push(dato)
    });
    const canvas = document.getElementById('chartD') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: categoriesList,
        datasets: [{
          label: 'Capacidades',
          data: data,
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
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 0
        },
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
            beginAtZero: true,
            ticks: {
              display: false
            }
          }
        }
      }
    });
    
    

    const canvasM = document.getElementById('chartM') as HTMLCanvasElement;
    const ctxM = canvasM.getContext('2d');
    if (this.chartM) {
      this.chartM.destroy();
    }
  
    this.chartM = new Chart(ctxM, {
      type: 'radar',
      data: {
        labels: categoriesList,
        datasets: [{
          label: 'Capacidades',
          data: data,
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
        responsive: false,
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

  scrollToForm(type = null){
    if(type == 'movile'){
      this.scrollToElement('formFooterMovile',70)
    }
    else{
      this.scrollToElement('formFooter')
    }
  
  }


  scrollToElement(id: string,offset = 0) {
    if (isPlatformBrowser(this.platform)) {
      const element = document.getElementById(id);
  
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } 
    }

  }
  isPopupVisible = false

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  
  

}

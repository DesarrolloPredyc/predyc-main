import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { OutgoingMessage } from "http";
import { Subscription, firstValueFrom, take } from "rxjs";
import { Activity, ActivityScores, Answer, AnswerItem, Question,QuestionType } from './activity-classes';
import {
	trigger,
	transition,
	style,
	animate,
	query,
	animateChild,
	group,
} from "@angular/animations";
import Swal from "sweetalert2";
import { IconService } from "../../services/icon.service";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { CourseService } from '../../shared/services/course.service';
import { formLead, ReunionFormComponent } from "../../shared/reunion-form/reunion-form.component";
import { UserService } from "../../shared/services/user.service";

export const titleCase = (str: string) =>  {
	if (!str) return str;
	return str
	  .toLowerCase()
	  .split(" ")
	  .map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	  })
	  .join(" ");
}

@Component({
	selector: "app-activity-form",
	standalone: true,
	imports:[
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReunionFormComponent
	  ],
	templateUrl: "./activity-form.component.html",
	styleUrls: ["./activity-form.component.css"],
	animations: [
		trigger("carouselAnimation", [
			transition("* => *", [
				style({ opacity: 0, transform: "translateX(100%)" }),
				animate(
					"0.5s ease-out",
					style({ opacity: 1, transform: "translateX(0)" })
				),
			]),
		]),
	],
})
export class ActivityFormComponent implements OnInit {
	constructor(
		private router: Router,
		private sanitizer: DomSanitizer,
		private functions: AngularFireFunctions,
		private afs: AngularFirestore,
		public icon: IconService,
		private courseService:CourseService,
		private fireFunctions: AngularFireFunctions,
		private userService: UserService
	) {
		// Chart.register(annotationPlugin);
	}

	alertMessage: string = "";
	datosTMP = [0,0,7,21,47,16,9,6,4,1,0]

	@Input() activity: any;
	@Input() diagnosticTest: any; // Result or progress of diagnostic test
	@Input() curso: any;
	@Input() progreso: any;
	@Input() profile: any;
	@Input() diplomado: any;
	@Output() diplomadoCertificate = new EventEmitter();


	questionTypes = QuestionType;
	activityAnswers: Array<Answer>;
	@Output() retryActivity = new EventEmitter();
	@Output() complete = new EventEmitter();
	@Output() completarCursoTrigger = new EventEmitter();
	@Output() closeActivityDialog = new EventEmitter();

	@Input() showInitTestInstructions = true

	activityScores: ActivityScores = {
		activityPoints: [],
		collectedPoints: 0,
		expectedPoints: 0,
		finalScore: 0,
	};

	usuario;
	lives = 0;

	isSuccess: boolean = null;
	cursoCompletado: boolean = false;
	duracionCurso = 0;

	ngOnDestroy() {
		if (this.subscriptionServiceSubs)
			this.subscriptionServiceSubs.unsubscribe();
		if (this.productServiceSubscription)
			this.productServiceSubscription.unsubscribe();

		if(this.resultSub)
			this.resultSub.unsubscribe();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.activity) {
			//this.showInitTestInstructions = true
			this.currentQuestionIndex = 0
			if (!this.diagnosticTest) this.activitySetup();
			console.log("this.activity", this.activity)
		}
		if (changes.diagnosticTest) {
			// console.log("this.diagnosticTest", this.diagnosticTest) // Result or progress of diagnostic test
			if (!this.diagnosticTest) { // If diagnostic test hasnt been started
				//this.showInitTestInstructions = true
				this.currentQuestionIndex = 0
				this.activitySetup();
			} else {
				//this.showInitTestInstructions = false
				if (!this.diagnosticTest.score) this.activitySetupInProgress(); // Only if the progress is not in the last answer
			}
		}
	}

	ngOnInit() {
		this.activitySetup
	}

	resultSub

	resultadosCrudos

	results = []
	promedioGeneral
	averageScores
  
	resultsEmpresa = []
	promedioGeneralEmpresa
	averageScoresEmpresa

	firma = `<p>Saludos cordiales,</p>
  <img src="https://predictiva21.com/wp-content/uploads/2024/06/LOGOPREDYC-BACKWHITE.webp" alt="Predyc" style="width: 150px; height: auto;">`;
  styleMail = `
  <style>
    table {
      max-width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
    .high {
      color: green;
    }
    .medium {
      color: orange;
    }
    .low {
      color: red;
    }
    .no-iniciado, .no-plan {
      color: gray;
    }
    .month-row {
      border: none;
      padding-top: 20px;
      font-weight: bold;
    }
    .month-name {
      padding-top: 20px;
      font-weight: bold;
      border: none;
      text-align: left;
    }
  </style>`;


	procesarDatos(resultados,type='general'){
	//console.log('resultados',resultados);
	if(type=='general'){
		this.results=resultados
	}
	else{
		this.resultsEmpresa=resultados
	}
	let allClassResults = [];
	let score =0;
	resultados.forEach(result => {
		allClassResults = allClassResults.concat(result.resultByClass);
		//console.log('resultado',result)
		score+=result.score
	});

	if(type=='general'){
		this.promedioGeneral = score/resultados.length
	}
	else{
		this.promedioGeneralEmpresa = score/resultados.length
	}

	// Agrupa los resultados por classId
	const groupedByClassId = allClassResults.reduce((acc, current) => {
		if (current) {
			// Asegura que el classId y el score son válidos
			const { classId, score } = current;
			if (classId && score != null) {
			if (!acc[classId]) {
				acc[classId] = { totalScore: 0, count: 0 };
			}
			acc[classId].totalScore += score;
			acc[classId].count += 1;
			}
		}
		return acc;
	}, {});

	// Calcula el promedio de los puntajes por cada classId
	const averageScores = Object.keys(groupedByClassId).map(classId => {
		const { totalScore, count } = groupedByClassId[classId];
		return {
		classId,
		averageScore: totalScore / count
		};
	});
	//console.log('averageScores',averageScores);
	averageScores.sort((a, b) => b['averageScore'] - a['averageScore']);

	if(type=='general'){
		this.averageScores =averageScores
	}
	else{
		this.averageScoresEmpresa =averageScores
	}

	}

	origen = 'empresa'

	chartSetup(){

	// Crear un objeto para mantener el conteo de las puntuaciones
	const scoreCounts = {};
	for (let i = 0; i <= 100; i += 10) {
		scoreCounts[i] = 0; // Inicializar cada rango de puntuación con 0
	}

	// Incrementar el conteo basado en los resultados
	this.results?.forEach(result => {
		const score = Math.floor(result.score / 10) * 10; // Agrupar en rangos de 10
		scoreCounts[score]++;
	});

	// Separar las llaves y los valores del objeto scoreCounts en dos arrays para las etiquetas y los datos del gráfico
	const labels = Object.keys(scoreCounts);
	const data = Object.values(scoreCounts);

	// Configuración del gráfico


	// Obtener el contexto del elemento canvas en el DOM donde se dibujará el gráfico
	const canvas = document.getElementById('chartStats')as HTMLCanvasElement;
	const ctx = canvas.getContext('2d');

	// Inicializar y mostrar el gráfico

	let numericData: number[] = data.map(item => {
		if (typeof item === 'number') {
		return item;
		} else {
		throw new Error('All elements must be numbers');
		}
	});
	
	let promedio = 0

	//console.log('this.activityScores.finalScore',this.activityScores.finalScore)
	
	if(this.origen == 'empresa'){
		promedio = Math.round(this.activityScores.finalScore*10)
	}
	else{
		promedio = Math.round(this.promedioGeneral/10)
	}


	//console.log('grafico',numericData,this.datosTMP)

	if(this.origen == 'empresa'){

		if(this.resultsEmpresa.length<100){

		const datosTMP = this.datosTMP

		//console.log('datosRevisar',numericData,datosTMP)

		let sum = numericData.map(function (num, idx) {
			return num + datosTMP[idx];
		});
		numericData = sum
		}
	}

	let maxData = numericData[promedio]
	//console.log(promedio,maxData)

	
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
				tooltipInfo:
					"Configure una serie de opciones para una pregunta - una o mas respuestas pueden ser correctas",
				createInstructions: "",
				solveInstructions:
					"Seleccione una o mas opciones como correctas del listado de opciones",
			},
			[TYPE_SINGLE_CHOICE]: {
				value: TYPE_SINGLE_CHOICE,
				displayName: "Opción Simple",
				tooltipInfo:
					"Configure una serie de opciones para una pregunta - solo una respuesta puede ser correcta",
				createInstructions: "",
				solveInstructions:
					"Seleccione la opción correcta del listado de opciones",
			},
			[TYPE_COMPLETE]: {
				value: TYPE_COMPLETE,
				displayName: "Completar",
				tooltipInfo:
					"Configure una pregunta cuyo texto pueda ser completado a partir de las opciones provistas para cada marcador de referencia - cada marcador debe tener una única respuesta correcta",
				createInstructions:
					"Ingrese cada marcador como una palabra de referencia encerrada entre corchetes ([]).<br/>Ejemplo: El presidente [nombreDelPresidente] nacio en [paisDeNacimiento]",
				solveInstructions:
					"Complete el texto utilizando los selectores proporcionados para dar sentido a la frase",
			},
			[TYPE_TRUE_OR_FALSE]: {
				value: TYPE_TRUE_OR_FALSE,
				displayName: "Verdadero o Falso",
				tooltipInfo:
					"Configure una pregunta cuya respuesta sea verdadero o falso",
				createInstructions:
					"Marque las opciones que sean verdaderas y deje en blanco las que sean falsas",
				solveInstructions:
					"Clasifique las siguientes afirmaciones como verdadera o falsa",
			},
		};

		let typeComplete = typeToInfoDict[type];
		return typeComplete;
	}

	currentQuestionIndex = 0;

	get isLastQuestion(): boolean {
		return this.currentQuestionIndex === this.activityQuestions.length - 1;
	}

	checkQuestionCorazon(indexQuestion) {
		//console.log('checkQuestionCorazon index',indexQuestion)
		let valid = this.validateQuestionCorazon(indexQuestion);
		if (!valid) {
			this.lives--;
			Swal.fire({
				title: "Respuesta incorrecta",
				text: "Perdiste una vida",
				imageUrl: "assets/images/design/perfercorazon.gif",
				imageWidth: 400,
				imageAlt: "corazón",
			});

			if (this.lives <= 0) {
				this.completeTest("corazones", false);
			}
		}
		this.activityQuestions[indexQuestion]["validated"] = true;
	}

	checkQuestionTestInit(indexQuestion) {
		//console.log('checkQuestionCorazon index',indexQuestion)
		let valid = this.validateQuestionCorazon(indexQuestion);

		this.activityQuestions[indexQuestion]["validated"] = true;
	}

	nextQuestionCorazones(): void {
		this.currentQuestionIndex++;
	}

	prevQuestionCorazones(): void {
		this.currentQuestionIndex--;
	}

	previousQuestionCorazones(): void {
		if (this.currentQuestionIndex > 0) {
			this.currentQuestionIndex--;
		}
	}

	msgWarning = ''

	async nextQuestionTest(type: string) {

		let valid = this.validateQuestionCorazon(this.currentQuestionIndex);
		console.log('valid',valid)
		
		this.msgWarning = ''
		if (type !== "testProfile") {
			this.currentQuestionIndex++;
		}
		else {
			console.log(this.activityAnswers[this.currentQuestionIndex])
			// console.log("this.activityAnswers[this.currentQuestionIndex]", this.activityAnswers[this.currentQuestionIndex])
			if (false && this.activityAnswers[this.currentQuestionIndex].answerItems.some(item => item.answer === null)) { // If the user hasnt selected an option
				// Swal.fire({
				// 	title: "No has seleccionado niguna opción",
				// 	text: `Por favor selecciona alguna opción para poder continuar`,
				// 	icon: "warning",
				// 	confirmButtonColor: "var(--blue-5)",
				// });
				this.msgWarning = 'Por favor selecciona al menos una respuesta'
			} else {
				this.currentQuestionIndex++;
				console.log(this.activityAnswers, this.activityQuestions,this.currentQuestionIndex)
				await this.saveDiagnosticTestProgress(this.activityAnswers, this.activityQuestions, "testProfile", this.activity["validationTestType"]);
			}
		}
	}

	async saveDiagnosticTestProgress(respuestas, preguntas, type = "test", validationTestType) {
		// await this.courseViewerService.saveTestTry(
		// 	this.curso,
		// 	null,
		// 	respuestas,
		// 	this.usuario.uid,
		// 	preguntas,
		// 	type,
		// 	this.activity,
		// 	this.profile,
		// 	validationTestType,
		// 	null,
		// 	this.diplomado,
		// 	this.diagnosticTest ? this.diagnosticTest.id : null,
		// 	this.currentQuestionIndex
		// );
	}

	selectOption(questionIndex: number, optionIndex: number): void {
		this.checkAnswer(questionIndex, optionIndex);

		// Additional logic if required when an option is selected
	}

	isLastOption(index, optionsLength) {
		return optionsLength % 2 !== 0 && index === optionsLength - 1;
	}

	subscriptionServiceSubs: Subscription;
	productServiceSubscription: Subscription;

	activityQuestions = []

	activitySetup() {

		if (this.activity.activityCorazon) {
			this.lives = 2;
		}
		this.isSuccess = null;
		this.tryCompleted = false
		this.activityAnswers = null;
		this.activityQuestions = []
		let activityAnswers = [];
		let preguntas = structuredClone(this.activity.questions);


		if(!this.curso?.orderExam){
			console.log('mezlar preeguntas')
		// Fisher-Yates Shuffle Algorithm
			for (let i = preguntas.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[preguntas[i], preguntas[j]] = [
					preguntas[j],
					preguntas[i],
				];
			}
		}
		else{
			//console.log('revisar',this.activity,preguntas)
			preguntas.sort((a, b) => a.idUser - b.idUser);
			console.log('preguntas',preguntas)

		}

		if(this.activity.isTest && !this.activity.isTestProfile){ // es una prueba final
			preguntas = preguntas.slice(0,60) // se toman 60 preguntas maximo al azar para la prueba final
		}
		else if (this.activity.isTestProfile || this.activity.isTestDiplomado){// es una prueba perfil
			// no hacer nada
		}
		else{ //actividad de curso
			preguntas = preguntas.slice(0,20) // se toman 20 preguntas maximo al azar para la prueba final
		}

		preguntas = preguntas.map((pregunta) => {
			let preguntaNew = new Question();
			preguntaNew['classId'] = pregunta['classId']
			preguntaNew.id = pregunta.id;
			preguntaNew.explanation = pregunta.explanation;
			preguntaNew.classId = pregunta.classId;
			preguntaNew.image = pregunta.image;
			preguntaNew.options = pregunta.options;
			preguntaNew.points = pregunta.points;
			preguntaNew.text = pregunta.text;
			preguntaNew.type = pregunta.type;
			preguntaNew.newTrueFalseFormat = pregunta.newTrueFalseFormat?pregunta.newTrueFalseFormat:false;
			return preguntaNew;
		});

		this.activityQuestions=preguntas
		//this.activity.questions = preguntas;
		//console.log('this.activity.questions',this.activity.questions)
		for (let question of this.activityQuestions) {
			if(question?.type?.value == 'true-false'){
				if(question.options.length == 2 && question?.options[0]?.text == 'Verdadero' && question?.options[1]?.text == 'Falso' ){
					question.newTrueFalseFormat = true
					question.type = this.getTypeQuestion('single_choice')
				}
			}
			let questionAnswer: Answer = {
				explanation:question.explanation,
				image:question.image,
				text:question.text,
				classId:question.classId,
				id:question.id,
				type: question.type,
				points: question.points,
				answerItems: [],
			};
			for (const option of question.options) {
				option.isSelected = false
				const obj = {
					text: option.text,
					placeholder: option.placeholder,
					isCorrect: option.isCorrect,
					answer: null,
				};
				questionAnswer.answerItems.push(obj);
			}
			activityAnswers.push(questionAnswer);
		}
		this.activityAnswers = activityAnswers;
		// console.log('In first setup this.activity.questions',this.activity.questions);
		// console.log('In first setup this.activityAnswers', this.activityAnswers);
	}

	activitySetupInProgress() {
		this.isSuccess = null;
		this.tryCompleted = false
		this.activityAnswers = null;
		this.activityQuestions = []

		let preguntas = structuredClone(this.activity.questions);

		//preguntas = preguntas.slice(0,60) // se toman 60 preguntas maximo al azar para la prueba final

		// Set the same order as when we initialized the diagnostic test 
		const ordenPreguntasPorId: string[] = this.diagnosticTest.answers.map(x => x.id)
		preguntas.sort((a, b) => {
			return ordenPreguntasPorId.indexOf(a.id) - ordenPreguntasPorId.indexOf(b.id);
		});
		// console.log("sorted preguntas", preguntas)
		// Set current question index
		// this.currentQuestionIndex = this.diagnosticTest.answers.findIndex((pregunta, index) => {
		// 	return pregunta.answerItems.some(item => item.answer === null);
		// });
		this.currentQuestionIndex = this.diagnosticTest.currentQuestionIndex
		// console.log("Current question index:", this.currentQuestionIndex);

		// Set the data
		this.activityQuestions = preguntas
		this.activityAnswers = structuredClone(this.diagnosticTest.answers)
	}

	isString(value: any): boolean {
		return typeof value === 'string';
	}

	debugQurestion(question){
		// console.log('activityDebug',question,this.activityQuestions,this.activityAnswers);
	}

	checkAnswer(questionIndex: number, optionIndex: number): void {
		switch (this.activityQuestions[questionIndex].type.value) {
			case QuestionType.TYPE_SINGLE_CHOICE_VALUE: {
				this.activityAnswers[questionIndex].answerItems.forEach((answerItem, index) => {
					answerItem.answer = index === optionIndex;
				});
			}
			break;

			case QuestionType.TYPE_MULTIPLE_CHOICE_VALUE: {
				this.activityAnswers[questionIndex].answerItems[optionIndex].answer = !this.activityAnswers[questionIndex].answerItems[optionIndex].answer;
				this.activityQuestions[questionIndex].options[optionIndex].isSelected = !this.activityQuestions[questionIndex].options[optionIndex].isSelected;
			}
			break;

			case QuestionType.TYPE_COMPLETE_VALUE: {
				this.activityAnswers[questionIndex].answerItems.forEach((answerItem, index) => {
					answerItem.answer = index === optionIndex;
				});
			}
			break;

			default:{}
			break;
		}
		// console.log(this.activityAnswers);
	}

	getSolveInstructions(solveInstructions: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(solveInstructions);
	}

	getDisplayText(question: Question): string[] {
		return question.text.split(/\[([^\[\]]*)\]/g);
	}

	updateSelectedOption(
		questionIndex: number,
		placeholder: string,
		selectedValue: string
	): void {
		this.activityAnswers[questionIndex].answerItems
			.filter((item) => item.placeholder == placeholder)
			.forEach((item) => {
				item.answer = item.text === selectedValue;
			});
	}

	getAnswerItemFromPlaceholder(
		placeholder: string,
		questionIndex: number
	): Array<AnswerItem> {
		const answers = this.activityAnswers[questionIndex].answerItems.filter(
			(x) => x.placeholder == placeholder
		);
		return answers;
	}

	selectedIsCorrect(questionIndex: number, placeholder: string): boolean {
		return (
			this.activityAnswers[questionIndex].answerItems.filter(
				(x) => x.placeholder == placeholder && x.isCorrect && x.answer
			).length == 1
		);
	}

	validateQuestionCorazon(index) {
		let answer = this.activityAnswers[index];

		//console.log('checkQuestionCorazon answer',answer)
		let collectedPoints: number = 0;
		switch (answer.type.value) {
			case QuestionType.TYPE_SINGLE_CHOICE_VALUE:
				{
					for (let answerItem of answer.answerItems) {
						answerItem.answer =
							answerItem.answer === null
								? false
								: answerItem.answer;
					}
					let correctOptions = answer.answerItems.filter(
						(item) => item.isCorrect
					);
					let correctAnswers = correctOptions.filter(
						(item) => item.answer
					);
					collectedPoints =
						(correctAnswers.length * answer.points) /
						correctOptions.length;
				}
				break;
			case QuestionType.TYPE_MULTIPLE_CHOICE_VALUE:
				{
					let correctOptionsQty = 0;
					for (let answerItem of answer.answerItems) {
						answerItem.answer =
							answerItem.answer === null
								? false
								: answerItem.answer;

						if (
							answerItem.isCorrect &&
							answerItem.answer === answerItem.isCorrect
						) {
							correctOptionsQty += 1;
						}
					}
					collectedPoints =
						(correctOptionsQty * answer.points) /
						answer.answerItems.filter(
							(answerItem) => answerItem.isCorrect
						).length;
				}
				break;
			case QuestionType.TYPE_COMPLETE_VALUE:
				{
					{
						let correctOptions = answer.answerItems.filter(
							(item) => item.isCorrect
						);
						let correctAnswers = correctOptions.filter(
							(item) => item.answer
						);
						collectedPoints =
							(correctAnswers.length * answer.points) /
							correctOptions.length;
					}
				}

				break;
			case QuestionType.TYPE_TRUE_OR_FALSE_VALUE:
				{
					let correctOptionsQty = 0;
					for (let answerItem of answer.answerItems) {
						if (
							answerItem.isCorrect &&
							answerItem.answer === answerItem.isCorrect
						) {
							correctOptionsQty += 1;
						}
					}
					collectedPoints =
						(correctOptionsQty * answer.points) /
						answer.answerItems.filter(
							(answerItem) => answerItem.isCorrect
						).length;
				}
				break;
			default:
				break;
		}

		//console.log('checkQuestionCorazon point',collectedPoints)

		if (collectedPoints > 0) {
			return true;
		}
		return false;
	}

	async completeTest(type = "test", corazon = false): Promise<void> {
		if (false && type === "testProfile" && this.activityAnswers[this.currentQuestionIndex].answerItems.some(item => item.answer === null)) {
			Swal.fire({
				title: "No has seleccionado niguna opción",
				text: `Por favor selecciona alguna opción para poder continuar`,
				icon: "warning",
				confirmButtonColor: "var(--blue-5)",
			});
			return null
		}

		if (corazon) {
			this.checkQuestionCorazon(this.currentQuestionIndex);
		}

		let activityPoints = [];
		for (let answer of this.activityAnswers) {
			let collectedPoints: number = 0;
			switch (answer.type.value) {
				case QuestionType.TYPE_SINGLE_CHOICE_VALUE:
					{
						for (let answerItem of answer.answerItems) {
							answerItem.answer =
								answerItem.answer === null
									? false
									: answerItem.answer;
						}
						let correctOptions = answer.answerItems.filter(
							(item) => item.isCorrect
						);
						let correctAnswers = correctOptions.filter(
							(item) => item.answer
						);
						collectedPoints =
							(correctAnswers.length * answer.points) /
							correctOptions.length;
					}
					break;
				case QuestionType.TYPE_MULTIPLE_CHOICE_VALUE:
					{
						let correctOptionsQty = 0;
						for (let answerItem of answer.answerItems) {
							answerItem.answer =
								answerItem.answer === null
									? false
									: answerItem.answer;

							if (
								answerItem.isCorrect &&
								answerItem.answer === answerItem.isCorrect
							) {
								correctOptionsQty += 1;
							}
						}
						collectedPoints =
							(correctOptionsQty * answer.points) /
							answer.answerItems.filter(
								(answerItem) => answerItem.isCorrect
							).length;
					}
					break;
				case QuestionType.TYPE_COMPLETE_VALUE:
					{
						{
							let correctOptions = answer.answerItems.filter(
								(item) => item.isCorrect
							);
							let correctAnswers = correctOptions.filter(
								(item) => item.answer
							);
							collectedPoints =
								(correctAnswers.length * answer.points) /
								correctOptions.length;
						}
					}

					break;
				case QuestionType.TYPE_TRUE_OR_FALSE_VALUE:
					{
						let correctOptionsQty = 0;
						for (let answerItem of answer.answerItems) {
							if (
								answerItem.isCorrect &&
								answerItem.answer === answerItem.isCorrect
							) {
								correctOptionsQty += 1;
							}
						}
						collectedPoints =
							(correctOptionsQty * answer.points) /
							answer.answerItems.filter(
								(answerItem) => answerItem.isCorrect
							).length;
					}
					break;
				default:
					break;
			}
			const expectedPoints = answer.points;
			let item= {
				collectedPoints: Math.round(collectedPoints * 100) / 100,
				expectedPoints: expectedPoints,
			}
			activityPoints.push(item);
			//console.log('item Response',item,answer)
			answer['collectedPoints']=collectedPoints
		}

		//console.log('this.activityAnswers',this.activityAnswers)

		let result = this.calculateScoresByClass(this.activityAnswers)
		//console.log('result',result)

		let finalCollectedPoints: number = 0;
		let finalExpectedPoints: number = 0;
		for (const activityPoint of activityPoints) {
			finalCollectedPoints += activityPoint.collectedPoints;
			finalExpectedPoints += activityPoint.expectedPoints;
		}
		let finalScore: number =Math.round((finalCollectedPoints / finalExpectedPoints) * 100) / 100;
		// ---- Just for testing
		// finalScore = 0.8
		// finalCollectedPoints = 80
		// finalExpectedPoints = 100
		// ----
		this.activityScores = {
			activityPoints: activityPoints,
			collectedPoints: finalCollectedPoints,
			expectedPoints: finalExpectedPoints,
			finalScore: finalScore,
		};
		this.isSuccess = false;
		this.tryCompleted = true

		if (type == "test" || type == "corazones" || type == "activity") {
			//  saveTestTry(score,respuestas,preguntas,type='test'){
			if(!this.activity?.isTestDiplomado){
				this.saveTestTry(
					finalScore,
					this.activityAnswers,
					this.activityQuestions,
					type,
					null
				);
				if (finalScore >= 0.7) {
					// ajustar a 0.7
					this.isSuccess = true;
					if (this.activity.isTest) {
						//this.completeCourse(finalScore);
					} else {
						this.complete.emit();
					}
				}
			}
			else{
				this.saveTestTry( finalScore, this.activityAnswers, this.activityQuestions, "testDiplomado", this.activity["validationTestType"], result);

				if (finalScore >= 0.7) {
					this.isSuccess = true;
					console.log('diplomadoCompleted',this.diplomado)
					this.generarCertificadoPrograma()
				}
				
			}

		} else {
			this.isSuccess = true;
			if (type == 'initCoursetest') {
				this.saveTestTry(
					finalScore,
					this.activityAnswers,
					this.activityQuestions,
					type,
					null
				);
				// ajustar a 0.7
				if (this.activity.isTest) {
					//this.completeCourse(finalScore);
				} else {
					this.complete.emit();
				}
			}
			// Diagnostic Test
			else {
				await this.saveTestTry(
					finalScore,
					this.activityAnswers,
					this.activityQuestions,
					"testProfile",
					this.activity["validationTestType"],
					result
				);
				//await this.userService.logLastUserActivity('Examen de perfil completado')
				setTimeout(() => {
					this.chartSetup()
				}, 500);
			}

		}
		const element = document.getElementById("result");
		element.scrollIntoView();
	}

	tryCompleted

	calculateScoresByClass(activityAnswers) {
		const scoresByClass = {};
	  
		// Agrupar datos por classId y sumar puntos
		activityAnswers.forEach(answer => {
		  if (!scoresByClass[answer.classId]) {
			scoresByClass[answer.classId] = { collectedPoints: 0, totalPoints: 0 };
		  }
		  scoresByClass[answer.classId].collectedPoints += answer.collectedPoints;
		  scoresByClass[answer.classId].totalPoints += answer.points;
		});
	  
		// Calcular el porcentaje de acierto para cada classId
		const results = Object.keys(scoresByClass).map(classId => {
		  const { collectedPoints, totalPoints } = scoresByClass[classId];
		  const score = totalPoints > 0 ? (collectedPoints / totalPoints) * 100 : 0; // Evitar división por cero
		  return {
			classId,
			score: Math.round(score) // Redondear el porcentaje para limpieza
		  };
		});
	  
		return results;
	}


	async generarCertificadoPrograma() {

		let id = await this.afs.collection<any>('userCertificate').doc().ref;

		let certificado = {
			usuarioId: this.usuario.uid,
			usuarioEmail: this.usuario.email,
			usuarioNombre: this.usuario.name,
			diplomadoId:this.diplomado.id,
			cursoId: null,
			id:id.id,
			cursoTitulo: null,
			instructorId: null,
			instructorNombre: null,
			puntaje: this.activityScores.finalScore * 100,
			usuarioFoto: this.usuario.photoUrl ? this.usuario.photoUrl : null,
			date: new Date(),
		};
		// await this.courseViewerService.saveCertificate(certificado);
		// this.diplomadoServide.completeDiplomado(this.diplomado,this.activityScores.finalScore * 100,certificado.id,new Date());

		this.diplomado.activityScore = certificado.puntaje
		this.diplomado.certificate = certificado
		this.diplomado.certificateRef = id
		this.diplomado.completado = true
		this.diplomado.progreso = 100
		

	}

	async generarCertificado() {
		console.log("genrating certificate")
		let certificado: any
		// normal course case
		if (this.curso.coursesByStudentData) {
			certificado = {
				usuarioId: this.usuario.uid,
				usuarioEmail: this.usuario.email,
				usuarioNombre: this.usuario.name,
				cursoId: this.curso.id,
				cursoTitulo: this.curso.titulo,
				instructorId: this.curso.instructorRef.id,
				instructorNombre: this.curso.instructorNombre,
				puntaje: this.activityScores.finalScore * 100,
				usuarioFoto: this.usuario.photoUrl ? this.usuario.photoUrl : null,
				date: new Date(),
			};
		}
		// live course case ...
		else {
			let instructorName = this.curso.instructorNombre
			if (!instructorName) instructorName = await this.getInstructorName(this.curso.instructorRef.id)

			certificado = {
				usuarioId: this.usuario.uid,
				usuarioEmail: this.usuario.email,
				usuarioNombre: this.usuario.name,
				liveCourseId: this.curso.id,
				cursoTitulo: this.curso.title,
				instructorId: this.curso.instructorRef.id,
				instructorNombre: instructorName,
				puntaje: this.curso.liveCourseByStudent.finalTestScore,
				usuarioFoto: this.usuario.photoUrl ? this.usuario.photoUrl : null,
				date: new Date(),
			};
		}

		console.log("certificado", certificado)

		// await this.courseViewerService.saveCertificate(certificado);
		// firstValueFrom(this.functions.httpsCallable("generateMailCertificate")({idCertificate: certificado.id}))
	}

	async getInstructorName(instructorId: string) {
		// const instructorData = await this.instructorService.getInstructorById(instructorId)
		// return instructorData.nombre
	}

	dataToSave
	completedForm = false

	async saveData(form){
		console.log(form)
		let idResult = await this.courseService.saveTestTry(
			null,
			this.dataToSave.score * 100,
			this.dataToSave.respuestas,
			null,
			this.dataToSave.preguntas,
			this.dataToSave.type,
			this.activity,
			null,
			this.dataToSave.validationTestType,
			this.dataToSave.resultByClass,
			null,
			this.diagnosticTest ? this.diagnosticTest.id : null,
			this.currentQuestionIndex,
			form
		);
		this.completedForm = true


		console.log('saveDataID',idResult)

		//mandar correo para ver resultador 


		let htmlUser = `
		<p>Hola <strong>${titleCase(form.nombre)}</strong>,</p>
		<p>¡Gracias por completar el diagnóstico ${this.activity.title} en Predyc</strong>! Valoramos mucho tu participación y estamos emocionados de compartir los resultados contigo.</p>
		<p>Para ver tus resultados detallados, por favor haz clic en el siguiente enlace:</p>
		<p><a href="https://predyc.com/resultado-diagnostico/${idResult}" target="_blank"><strong>Ver mis resultados aquí</strong></a></p>
		<p>Si tienes alguna pregunta o deseas más información, no dudes en ponerte en contacto con nosotros. Estaremos encantados de ayudarte en lo que necesites.</p>
		`;
		
	  	let htmlMailFinal = `<!DOCTYPE html><html><head>${this.styleMail}</head><body>${htmlUser}<br>${this.firma}</body></html>`;
		this.sendEmail('capacitacion@predyc.com', [form.email],`Gracias por completar el diagnóstico ${this.activity.title} en Predyc`, htmlMailFinal,['desarrollo@predyc.com']);
		



	}

	async sendEmail(sender: string, recipients: string[], subject: string, htmlContent: string,copy:string[] = ["ventas@predyc.com","desarrollo@predyc.com"]) {
		firstValueFrom(this.fireFunctions.httpsCallable('sendMailHTML')({
		  sender: sender,
		  recipients: recipients,
		  subject: subject,
		  cc: copy,
		  htmlContent: htmlContent,
		}));
	}

	async saveTestTry(score, respuestas, preguntas, type = "test", validationTestType, resultByClass = null) {

		let datos = {
			score:score,
			respuestas:respuestas,
			preguntas:preguntas,
			type:type,
			validationTestType:validationTestType,
			resultByClass:resultByClass
		}

		this.dataToSave= datos

		

	}

	descargarCertificado() {
		this.afs
			.collection("usuariosCertificados")
			.ref.where("idCurso", "==", this.progreso.cursoId)
			.where("idUsuario", "==", this.usuario.uid)
			.get()
			.then((response) => {
				response.docs.forEach((doc) => {
					this.router.navigate(["/certificado", doc.id]);
				});
			});
	}

	openImageInNewTab(imageUrl: string) {
		window.open(imageUrl, '_blank');
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
		//const mailchimpTag = formData.lugar
		const mailchimpTag = 'diagnostico'
		await this.userService.createUser(userData, mailchimpTag)
	  }
}

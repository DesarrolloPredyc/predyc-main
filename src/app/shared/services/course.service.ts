import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, defaultIfEmpty, firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { Clase } from '../models/course-class.model';
import { Curso } from '../models/course.model';
import { Modulo } from '../models/module.model';
import { Skill } from '../models/skill.model';
import { Activity, Question } from '../models/activity-classes.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private afs: AngularFirestore) { }


  getPredycCourses$(): Observable<Curso[]> {
    const allClasses$ = this.afs.collection<Clase>(Clase.collection).valueChanges();
    const coursesQuery$ = this.afs.collection<Curso>(Curso.collection, ref => 
      ref.where('enterpriseRef', '==', null).where('proximamente','==',false)
    ).valueChanges()
    return combineLatest([coursesQuery$, allClasses$]).pipe(
      map(([courses, allClasses]) => 
        courses.map(course => {
          const modules$ = this.afs.collection<Modulo>(`${Curso.collection}/${course.id}/${Modulo.collection}`).valueChanges();
          return modules$.pipe(
            map(modules => modules.map(module => {
              const classes = module.clasesRef.map(claseRef => allClasses.find(clase => clase.id === claseRef.id));
              return { ...module, clases: classes };
            })),
            map(modulesWithClasses => ({ ...course, modules: modulesWithClasses }))
          );
        })
      ),
      switchMap(courseModulesObservables => combineLatest(courseModulesObservables))
    )
  }

  async getIdByUrl(url){
   const ref = await this.afs.collection(Curso.collection).ref.where("customUrl","==",url).get()
   let id = ""
   if(ref.empty){
    id = url
   } else {
    id = ref.docs[0].id
   }
   return id
  }

  getCourseByIdOld(courseId: string): Observable<any> {
    // Fetch all classes once
    const allClasses$ = this.afs.collection<Clase>(Clase.collection).valueChanges();

    // Fetch the specific course
    const course$ = this.afs.doc<Curso>(`${Curso.collection}/${courseId}`).valueChanges();

    // Combine course info with its modules and classes
    return combineLatest([course$, allClasses$]).pipe(
      switchMap(([course, allClasses]) => {
        // //console.log("DENTRO DEL SERVICIO", course)
        if (!course) return of(null); // Handle the case where the course does not exist
  
        // Fetch modules for this course
        const modules$ = this.afs.collection(`${Curso.collection}/${courseId}/${Modulo.collection}`).valueChanges();

        const skillsInfo = []
        
        // course.skillsRef.forEach(skill => {
        //   const targetSkill = skills.find(x => x.id === skill.id)
        //   if (targetSkill) skillsInfo.push(targetSkill)
        // })
  
        return modules$.pipe(
          map(modules => {
            // For each module, find and attach the relevant classes
            const modulesWithClasses = modules.map(module => {
              const classes = module['clasesRef'].map(claseRef => 
                allClasses.find(clase => clase.id === claseRef.id)
              );
  
              return { ...module as Modulo, clases: classes };
            });
  
            return { ...course, skillsInfo: skillsInfo, modules: modulesWithClasses };
          })
        );
      })
    );
  }

  getInstructorById(instructorId: string): Observable<any | null> {
    if (!instructorId) {
      return of(null);
    }
    return this.afs.doc<any>(`instructors/${instructorId}`).valueChanges();
  }

  getCourseById(courseId: string): Observable<any> {
    // Fetch the specific course
    const course$ = this.afs.doc<Curso>(`${Curso.collection}/${courseId}`).valueChanges();
  
    return course$.pipe(
      switchMap(course => {
        if (!course) return of(null); // Handle the case where the course does not exist
  
        // Fetch modules for this course
        const modules$ = this.afs.collection(`${Curso.collection}/${courseId}/${Modulo.collection}`).valueChanges();
  
        return modules$.pipe(
          switchMap(modules => {
            // Split the classes references into batches of 10
            const classesBatches: any[][] = [];
            modules.forEach(module => {
              const classesRefs = module['clasesRef'];
              for (let i = 0; i < classesRefs.length; i += 10) {
                classesBatches.push(classesRefs.slice(i, i + 10));
              }
            });
  
            // Fetch all classes in batches of 10
            const classesObservables = classesBatches.map(batch => {
              const batchIds = batch.map(claseRef => claseRef.id);
              return this.afs.collection<Clase>(Clase.collection, ref => ref.where('id', 'in', batchIds)).get().pipe(
                map(snapshot => snapshot.docs.map(doc => doc.data() as Clase))
              );
            });
  
            return combineLatest(classesObservables).pipe(
              map(batchesOfClasses => {
                const allClasses = batchesOfClasses.flat();
  
                // For each module, find and attach the relevant classes
                const modulesWithClasses = modules.map(module => {
                  const classes = module['clasesRef'].map(claseRef =>
                    allClasses.find(clase => clase.id === claseRef.id)
                  );
  
                  return { ...module as Modulo, clases: classes };
                });
  
                return { ...course, modules: modulesWithClasses };
              })
            );
          })
        );
      })
    );
  }

  private fetchModulesAndClasses(course: Curso): Observable<any> {
    if (!course) return of(null);
  
    // Fetch modules for this course
    const modules$ = this.afs.collection(`${Curso.collection}/${course.id}/${Modulo.collection}`).valueChanges();
  
    return modules$.pipe(
      switchMap(modules => {
        // Split the classes references into batches of 10
        const classesBatches: any[][] = [];
        modules.forEach(module => {
          const classesRefs = module['clasesRef'];
          for (let i = 0; i < classesRefs.length; i += 10) {
            classesBatches.push(classesRefs.slice(i, i + 10));
          }
        });
  
        // Fetch all classes in batches of 10
        const classesObservables = classesBatches.map(batch => {
          const batchIds = batch.map(claseRef => claseRef.id);
          return this.afs.collection<Clase>(Clase.collection, ref => ref.where('id', 'in', batchIds)).get().pipe(
            map(snapshot => snapshot.docs.map(doc => doc.data() as Clase))
          );
        });
  
        return combineLatest(classesObservables).pipe(
          map(batchesOfClasses => {
            const allClasses = batchesOfClasses.flat();
  
            // For each module, find and attach the relevant classes
            const modulesWithClasses = modules.map(module => {
              const classes = module['clasesRef'].map(claseRef =>
                allClasses.find(clase => clase.id === claseRef.id)
              );
  
              return { ...module as Modulo, clases: classes };
            });
  
            return { ...course, modules: modulesWithClasses };
          })
        );
      })
    );
  }

  getCourseByCustomUrl(customUrl: string): Observable<any> {
    // Fetch the specific course by customUrl
    const course$ = this.afs.collection<Curso>(Curso.collection, ref => ref.where('customUrl', '==', customUrl)).valueChanges().pipe(
      switchMap(courses => {
        if (courses.length === 0) {
          // If no course is found with the customUrl, search by id
          const courseById$ = this.afs.collection<Curso>(Curso.collection, ref => ref.where('id', '==', customUrl)).valueChanges().pipe(
            map(coursesById => coursesById[0]),
            switchMap(course => this.fetchModulesAndClasses(course)),
            map(course => ({ ...course, fetchedBy: 'id' }))
          );
  
          return courseById$;
        }
  
        return of(courses[0]).pipe(
          switchMap(course => this.fetchModulesAndClasses(course)),
          map(course => ({ ...course, fetchedBy: 'customUrl' }))
        );
      })
    );
  
    return course$;
  }

  async getCoursesByIds(courseIds: string[]): Promise<any[]> {
    try {
      // Dividir los courseIds en lotes de 10
      const courseBatches = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        courseBatches.push(courseIds.slice(i, i + 10));
      }
  
      // Consultar los cursos en lotes de 10
      const coursesObservables = courseBatches.map(batch => {
        return this.afs.collection<Curso>(Curso.collection, ref => ref.where('id', 'in', batch)).get().pipe(
          map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Curso })))
        );
      });
  
      const coursesBatches = await combineLatest(coursesObservables).pipe(take(1)).toPromise();
      const allCourses = coursesBatches.flat();
  
      const modulesObservables = allCourses.map(course => {
        return this.afs.collection(`${Curso.collection}/${course.id}/${Modulo.collection}`).valueChanges().pipe(
          map(modules => ({ courseId: course.id, modules }))
        );
      });
  
      const modulesBatches = await combineLatest(modulesObservables).pipe(take(1)).toPromise();
      const allModules: { [key: string]: Modulo[] } = modulesBatches.reduce((acc, val) => {
        acc[val.courseId] = val.modules as Modulo[];
        return acc;
      }, {});
  
      // Dividir las referencias de las clases en lotes de 10
      const classesBatches: any[][] = [];
      for (const modules of Object.values(allModules) as Modulo[][]) {
        modules.forEach(module => {
          const classesRefs = module.clasesRef;
          for (let i = 0; i < classesRefs.length; i += 10) {
            classesBatches.push(classesRefs.slice(i, i + 10));
          }
        });
      }
  
      // Consultar todas las clases en lotes de 10
      const classesObservables = classesBatches.map(batch => {
        const batchIds = batch.map(claseRef => claseRef.id);
        return this.afs.collection<Clase>(Clase.collection, ref => ref.where('id', 'in', batchIds)).get().pipe(
          map(snapshot => snapshot.docs.map(doc => doc.data() as Clase))
        );
      });
  
      const classesBatchesResults = await combineLatest(classesObservables).pipe(take(1)).toPromise();
      const allClasses = classesBatchesResults.flat();
  
      // Para cada módulo, encontrar y adjuntar las clases relevantes
      const coursesWithModulesAndClasses = allCourses.map(course => {
        const modules = allModules[course.id];
        const modulesWithClasses = modules.map(module => {
          const classes = module.clasesRef.map(claseRef =>
            allClasses.find(clase => clase.id === claseRef.id)
          );
          return { ...module as Modulo, clases: classes };
        });
        return { ...course, modules: modulesWithClasses };
      });
  
      return coursesWithModulesAndClasses;
    } catch (error) {
      console.error('Error getting courses: ', error);
      throw error;
    }
  }
  
  getRelated(course: any[]){
    return []
  }

  getCoursesByIds$(coursesIds: string[]): Observable<Curso[]> {
    if (!coursesIds || coursesIds.length === 0) return of([]);
  
    const courseObservables = coursesIds.map(courseId => this.afs.collection<Curso>(Curso.collection).doc(courseId).valueChanges());
    return combineLatest(courseObservables)
  }



  getActivityCertifications(): Observable<any> {
    return this.afs
      .collection(Activity.collection, (ref) => ref.where("isPageTest", "==", true))
      .valueChanges({ idField: "id" })
      .pipe(
        switchMap((activities) => {
          // console.log('Actividades encontradas:', activities);
          if (activities.length > 0) {
            const questionsObservables = activities.map((activity) =>
              this.afs
                .collection(`${Activity.collection}/${activity.id}/${Question.collection}`)
                .valueChanges({ idField: "id" })
                .pipe(
                  defaultIfEmpty([]), // Asegurar que cada observable emite al menos un valor.
                  map((questions) => ({ ...activity, questions }))
                )
            );
            return combineLatest(questionsObservables); // Emitir cada vez que cualquier observable emite
          }
          return of([]); // No hay actividades, devuelve un arreglo vacío
        })
      );
  }



  getActivityCertificationsById(idCertification: string): Observable<any> {
    return this.afs
        .collection(Activity.collection, (ref) => ref.where("customUrl", "==", idCertification))
        .valueChanges({ idField: "id" })
        .pipe(
          switchMap((activities) => {
            // Si hay actividades por customUrl, continuar con esas actividades
            if (activities.length > 0) {
              return this.loadQuestionsAndResultsForActivities(activities);
            }
  
            // Si no hay resultados por customUrl, buscar por id
            return this.afs
              .collection(Activity.collection, (ref) => ref.where("id", "==", idCertification))
              .valueChanges({ idField: "id" })
              .pipe(
                switchMap((activitiesById) => {
                  if (activitiesById.length > 0) {
                    return this.loadQuestionsAndResultsForActivities(activitiesById);
                  }
                  return of([]); // No hay actividades ni por customUrl ni por id
                })
              );
          })
        )
  }
  
  // Función auxiliar para cargar preguntas y resultados de las actividades
  private loadQuestionsAndResultsForActivities(activities: any[]): Observable<any[]> {
    const questionsObservables = activities.map((activity) =>
      this.afs
        .collection(`${Activity.collection}/${activity.id}/${Question.collection}`)
        .valueChanges({ idField: "id" })
        .pipe(
          switchMap((questions) => {
            return this.calculateResultsForActivity(activity.id).pipe(
              map((resultData) => ({
                ...activity,
                questions,
                resultData // Agregar los resultados a la actividad
              }))
            );
          })
        )
    );
    return combineLatest(questionsObservables);
  }
  
  // Función para calcular el promedio general, promedio por classId y percentiles globales
  private calculateResultsForActivity(activityId: string): Observable<any> {
    return this.afs
      .collection('diagnosticWebTestsByStudent', (ref) => ref.where('activityRef', '==', this.afs.doc(`${Activity.collection}/${activityId}`).ref))
      .valueChanges()
      .pipe(
        map((results: any[]) => {
          if (results.length === 0) return null;
  
          // Variables para calcular promedios y percentiles globales
          let totalScore = 0;
          let count = 0;
          let classIdScores: { [key: string]: { total: number; count: number } } = {};
          let percentiles = {
            '0-10': 0,
            '10-20': 0,
            '20-30': 0,
            '30-40': 0,
            '40-50': 0,
            '50-60': 0,
            '60-70': 0,
            '70-80': 0,
            '80-90': 0,
            '90-100': 0
          };
  
          // Recorrer los resultados para calcular promedios y percentiles globales
          results.forEach(result => {
            if (result.score) {
              totalScore += result.score;
              count++;
  
              // Calcular en qué percentil cae cada puntaje de score global
              const score = result.score;
              if (score < 10) percentiles['0-10']++;
              else if (score < 20) percentiles['10-20']++;
              else if (score < 30) percentiles['20-30']++;
              else if (score < 40) percentiles['30-40']++;
              else if (score < 50) percentiles['40-50']++;
              else if (score < 60) percentiles['50-60']++;
              else if (score < 70) percentiles['60-70']++;
              else if (score < 80) percentiles['70-80']++;
              else if (score < 90) percentiles['80-90']++;
              else percentiles['90-100']++;
            }
  
            // Procesar el arreglo resultByClass para los classId
            if (result.resultByClass && Array.isArray(result.resultByClass)) {
              result.resultByClass.forEach((classResult) => {
                const classId = classResult.classId;
                const score = classResult.score;
  
                // Sumar los puntajes por classId
                if (!classIdScores[classId]) {
                  classIdScores[classId] = { total: 0, count: 0 };
                }
                classIdScores[classId].total += score;
                classIdScores[classId].count++;
              });
            }
          });
  
          // Calcular el promedio general
          const averageScore = count > 0 ? totalScore / count : 0;
  
          // Calcular el promedio por classId
          const classIdAverages = Object.keys(classIdScores).reduce((acc, classId) => {
            acc[classId] = classIdScores[classId].total / classIdScores[classId].count;
            return acc;
          }, {});
  
          return {
            averageScore,         // Promedio general
            classIdAverages,      // Promedios por cada classId
            percentiles           // Percentiles del score global
          };
        })
      );
  }
  


  async saveTestTry(course, score, respuestas, userId, preguntas, type, activity = null, profile = null, validationTestType = null, resultByClass = null, diplomado = null, testTryId: string = null,currentQuestionIndex = null,userData = null) {

    //console.log('profile saveTestTry',profile)
    
    //console.log('saveTestTry',course,score,respuestas,activity)
    respuestas.forEach(respuesta => {
      respuesta.answerItems.forEach(answerItem => {
        delete answerItem['placeholder']
      });
      
    });

    let preguntasFormated = preguntas.map(pregunta => {
      return structuredClone(pregunta)
    });

    //console.log('type save activity',type,activity)

    if (type == 'test' || type == 'final-test' || type == 'corazones' || type == 'activity') {
      let courseRef: DocumentReference
      if (course.coursesByStudent) courseRef = this.afs.doc(`course/${course.id}`).ref;
      else courseRef = this.afs.doc(`live-course/${course.id}`).ref;
      
      let activityRef
      let nameColection = 'coursesTestsByStudent'
      if ( type == 'test' ) {
        if (course.coursesByStudent) activityRef = this.afs.doc(`activity/${course.exam.id}`).ref;
        else activityRef = this.afs.doc(`activity/${activity.id}`).ref;
      }
      else if ( type=='final-test' ) {
        activityRef = this.afs.doc(`activity/${activity.id}`).ref;
      }
      else {
        nameColection = 'coursesActivityByStudent'
        activityRef = this.afs.doc(`activity/${activity.id}`).ref;
      }
      const userRef = this.afs.doc(`user/${userId}`).ref;
      let examTry = {
        courseRef: courseRef,
        activityRef: activityRef,
        date: new Date,
        score: score,
        questions:preguntasFormated,
        answers:respuestas,
        userRef:userRef,
        type:type
      }
      try {
        // console.log("nameColection", nameColection)
        // console.log("examTry", examTry)
        const ref = this.afs.collection<any>(nameColection).doc().ref;
        await ref.set({...examTry, id: ref.id}, { merge: true });
      } catch (error) {
        console.log("ERROR: ", error)
      }
      return null
    }
    else if(type == 'testDiplomado') {
      return null
    }
    // Diagnostic test
    else if (type == 'testProfile') {
      const enterpriseRef = null
      // console.log('enterpriseRef',enterpriseRef);
      const profileRef = null;
      let activityRef= null
      if(activity.id) activityRef = this.afs.doc(`activity/${activity.id}`).ref;
      
      const userRef = null;
      let examTry = {
        ...userData,
        id: testTryId,
        profileRef: profileRef,
        activityRef: activityRef,
        date: new Date,
        score: score,
        enterpriseRef:enterpriseRef?enterpriseRef:null,
        //questions:preguntasFormated,
        answers:respuestas,
        userRef:userRef,
        type:validationTestType,
        resultByClass:resultByClass,
        certificationTest:true,
        currentQuestionIndex:currentQuestionIndex,
        title:activity.title
      }

      try {
        let ref = this.afs.collection<any>('diagnosticWebTestsByStudent').doc().ref;
        if (!score) { // If the diagnostic test is in progress
          await ref.set({...examTry, id: ref.id}, { merge: true });
          console.log("Diagnostic test progress Saved",examTry)
        } else { // If the diagnostic test is completed.
          ref = this.afs.collection<any>('diagnosticWebTestsByStudent').doc().ref;
          await ref.set({...examTry, id: ref.id}, { merge: true });
          console.log("Completed diagnostic test Saved")
          //await this.afs.collection("user").doc(`${userId}`).update({profileTestScore: score,});
          console.log("User profileTestScore updated")
        }
        return ref.id
      } catch (error) {
        //console.log(error)
        return error
      }    
    }
  }

  async getResultDiagnostico(idDiagnostico: string): Promise<any> {
    try {
      // Obtener el documento por ID
      const docRef = this.afs.collection('diagnosticWebTestsByStudent').doc(idDiagnostico).ref;
      const docSnapshot = await docRef.get();
  
      if (docSnapshot.exists) {
        const diagnosticData = docSnapshot.data();
        const activityRef = diagnosticData['activityRef'];
  
        // Obtener todos los documentos con el mismo activityRef
        const querySnapshot = await this.afs
          .collection('diagnosticWebTestsByStudent', ref => ref.where('activityRef', '==', activityRef))
          .get()
          .toPromise();
  
        let scores: number[] = [];
  
        // Recoger los puntajes (score) de cada documento
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data['score']) {
            scores.push(data['score']);
          }
        });
  
        // Calcular el promedio
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = scores.length > 0 ? totalScore / scores.length : 0;
  
        // Ordenar los puntajes para calcular percentiles
        scores.sort((a, b) => a - b);
  
        // Generar el objeto de percentiles (agrupar en rangos del 10%)
        let percentiles = {
          '0-10': 0,
          '10-20': 0,
          '20-30': 0,
          '30-40': 0,
          '40-50': 0,
          '50-60': 0,
          '60-70': 0,
          '70-80': 0,
          '80-90': 0,
          '90-100': 0
        };
  
        // Calcular en qué percentil cae cada puntaje
        scores.forEach(score => {
          if (score < 10) percentiles['0-10']++;
          else if (score < 20) percentiles['10-20']++;
          else if (score < 30) percentiles['20-30']++;
          else if (score < 40) percentiles['30-40']++;
          else if (score < 50) percentiles['40-50']++;
          else if (score < 60) percentiles['50-60']++;
          else if (score < 70) percentiles['60-70']++;
          else if (score < 80) percentiles['70-80']++;
          else if (score < 90) percentiles['80-90']++;
          else percentiles['90-100']++;
        });
  
        // Añadir el promedio y los percentiles al objeto de resultado
        diagnosticData['averageScore'] = averageScore;
        diagnosticData['percentiles'] = percentiles;
  
        // Retornar los datos del diagnóstico y el promedio
        return diagnosticData;
      } else {
        throw new Error('El documento no existe');
      }
    } catch (error) {
      console.error('Error obteniendo datos del diagnóstico:', error);
      throw error;
    }
  }
  
  
}





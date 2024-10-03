import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CategoryService } from '../../shared/services/category.service';
import { SkillService } from '../../shared/services/skill.service';
import { BehaviorSubject, take } from 'rxjs';
import { cursosProximos } from '../../../assets/data/proximamente.data'
import { CourseService } from '../../shared/services/course.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IndexesService } from '../../shared/services/indexes.service';
import { InfoService } from '../../shared/services/info.service';
import { Router, RouterModule } from '@angular/router';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-course-finder',
  standalone: true,
  imports: [CommonModule, FormsModule, FlexLayoutModule, FlexLayoutServerModule, MatDialogModule,RouterModule],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
 ],
  templateUrl: './course-finder.component.html',
  styleUrl: './course-finder.component.css'
})
export class CourseFinderComponent {
  constructor(
    public icon: IconService,
    private categoryService: CategoryService,
    private skillService: SkillService,
    private courseService: CourseService,
    private dialog: MatDialogRef<CourseFinderComponent>,
    private indexes: IndexesService,
    public info: InfoService,
    private router: RouterModule,
    public instructorsService: InstructorService,
    private routerR: Router
    

  ){}

  @Output() closeEmit = new EventEmitter<any>()
  @Input() free: boolean = false;

  // Arrays
  courses = [];
  programs = [];
  categories = [];
  instructores = [];

  // Flags
  showCategory = true;
  showProgram = false;
  showInstructor = false
  // Selected
  tab = 0;
  logo: string = 'assets/images/logos/logo.svg';
  selectedCategory = 0;
  selectedProgram = -1;
  selectedProgramCourses: any[] = [];

  selectedCourse = 0;
  selectedInstructor = 0
  loaded = false;

  searchValue = '';
  showCourseFlag = 0;
  showProgramFlag = 0;
  selectedCourseIndex = 0;
  idCOurse = null
  isSubscribe = false;
  categoriesPredyc = []

  async ngOnInit() {
    
    this.categoryService.getPredycCategories$().subscribe(category => {
      this.skillService.getPredycSkills$().pipe(
        take(2) // This could be so much better
      ).subscribe(skill => {
        let categories = this.anidarCompetenciasInicial(category, skill);
        // //console.log('this.categories',this.categories);

        this.categoriesPredyc =  categories.filter(x=> !x.enterprise)
        //this.competenciasEmpresa = this.obtenerCompetenciasAlAzar(5);
        this.courseService.getPredycCourses$().subscribe(courses => {
          // //console.log('courses',courses)
          courses.forEach(curso => {
            //curso.foto = '../../../../assets/images/cursos/placeholder1.jpg'
            let skillIds = new Set();
            curso.skillsRef.forEach(skillRef => {
              skillIds.add(skillRef.id); // Assuming skillRef has an id property
            });
            let filteredSkills = skill.filter(skillIn => skillIds.has(skillIn.id));
            let categoryIds = new Set();
            filteredSkills.forEach(skillRef => {
              categoryIds.add(skillRef.category.id); // Assuming skillRef has an id property
            });
            let filteredCategories = category.filter(categoryIn => categoryIds.has(categoryIn.id));
            curso['skills'] = filteredSkills;
            curso['categories'] = filteredCategories;
            let modulos = curso['modules']
            let duracionCourse = 0;
            modulos.forEach(modulo => {
              modulo.expanded = false;
              let duracion = 0;
              modulo.clases.forEach(clase => {
                duracion+=clase.duracion
              });
              modulo.duracion = duracion
              duracionCourse+=duracion
            });
            if (!curso['duracion'])curso['duracion'] = duracionCourse;
            if (curso.enterpriseRef == null){
              delete curso.enterpriseRef 
            }

          });
          // //console.log('cursos',courses)
          this.courses = courses;

          this.indexes.getProgramsIndex().then(programs => {
            programs.forEach(programa => {
              let cursos = []
              programa.coursesRef.sort((a, b) => a.studyPlanOrder - b.studyPlanOrder);
              programa.coursesRef.forEach(courseRef => {
                let curso = courses.find(x=>x.id == courseRef.courseRef.id)
                if(curso){
                  cursos.push(curso)
                }
              });
              programa.cursos = cursos
            });
            // console.log('Programas obtenidos:', programs); // Verificar los programas obtenidos
            this.programs = programs;
          });

          this.instructorsService.getInstructorsObservable().subscribe(instructors =>{

            // console.log('instructores',instructors)

            instructors.forEach(instructor => {
              instructor.cursos = this.getCursosInstructor(instructor.id)
              instructor.cantCursos = instructor?.cursos?.length
            });

            this.instructores = instructors.filter(x=>x.cursos.length>0)

      
          })

          categories.forEach(category => {
            let filteredCourses = courses.filter(course => 
              course['categories'].some(cat => cat.id === category.id)
            );
            category.expanded = false;
            category.courses = filteredCourses;
            category.freeCourses = category.courses.filter(x=>x.isFree);

            //console.log('category',category)
          });

          this.categories = categories.filter(x=>x.courses.length>0)
          this.freeCategories = categories.filter(x=>x.freeCourses.length>0)



          let cursosProxmosIn = cursosProximos;

          // //console.log('this.categories',this.categories)
        })
      });
    })
    this.loaded = true;

  }

  showCategoryDebug(i){
    console.log(this.categories[i])

  }

  freeCategories


  // filterByCategory(categoryIndex: number,free = false): any[] {
  //   let category = this.categories[categoryIndex];
  //   let respuesta = []

  //   if(!free){
  //     if (this.categories.length > 0){
  //       respuesta = this.categories.find(
  //         (x) => x.id == category.id
  //       )?.courses;
  //     }
  //   }
  //   else{
  //     if (this.categories.length > 0){
  //       respuesta = this.categories.find(
  //         (x) => x.id == category.id
  //       )?.freeCourses;
  //     }
  //   }
  //   respuesta = respuesta.filter(x=> !x?.dontshow)
  //   return  respuesta
  // }

  getFormattedDuration(duracion) {
    const hours = Math.floor(duracion / 60);
    const minutes = duracion % 60;
    return `${hours} hrs ${minutes} min`;
  }

  anidarCompetenciasInicial(categorias: any[], competencias: any[]): any[] {
    return categorias.map(categoria => {
      let skills = competencias
        .filter(comp => comp.category.id === categoria.id)
        .map(skill => {
          // Por cada skill, retornamos un nuevo objeto sin la propiedad category,
          // pero añadimos la propiedad categoryId con el valor de category.id
          const { category, ...rest } = skill;
          return {
            ...rest,
            categoriaId: category.id
          };
        });
  
      return {
        ...categoria,
        competencias: skills
      };
    });
  }

  hideCourseDescription(): void {
    this.showCourseFlag = 0;
    this.info.setDesplegable(false);
  }

  private fetchProgramCourses(courseRefs): Promise<any[]> {
    const courseDetailsPromises = courseRefs.map(ref => {
      return ref.courseRef.get().then(doc => {
        if (doc.exists) {
          const courseData = doc.data();
          return {
            id: doc.id,  
            name: courseData.titulo,  // Nombre del curso
            instructor: courseData.instructor,  // Nombre del instructor
            photoUrl: courseData.photoUrl,  // URL de la foto del curso, si existe
            studyPlanOrder: ref.studyPlanOrder  // Orden en el plan de estudios
          };
        } else {
          console.log(`No existe documento para referencia ${ref.courseRef.path}`);
          return null;
        }
      }).catch(error => {
        console.error(`Error al obtener el curso: ${error}`);
        return null;
      });
    });
  
    return Promise.all(courseDetailsPromises);
  }
  
  

  seleccionarPrograma(id: any): void {
    this.selectedProgram = this.programs.findIndex((x) => x.id == id);
    this.showProgramFlag = 1; // Ajusta según necesites
    this.info.setDesplegable(true); // Ajusta según necesites

    const selectedProgram = this.programs[this.selectedProgram];
    if (selectedProgram && selectedProgram.coursesRef) {
      this.fetchProgramCourses(selectedProgram.coursesRef).then(courses => {
        this.selectedProgramCourses = courses;
      });
    }
  }

  



  seleccionarCurso(id): void {
    this.selectedCourseIndex = this.courses.findIndex((x) => x.id == id);
  }

  irACruso(curso){
      this.routerR.navigate([`cursos/${curso.customUrl}`]);
      this.closeEmit.emit()
  }
  


  navigateToProgram(program: any): void {
    this.routerR.navigate(['/programas', program.id]).then(() => {
      this.closeEmit.emit();
    });
  }

  cursoProximamente = null





  getCategories(courses: any[]): any[] {
    let categories = [];
    for (let index = 0; index < courses.length; index++) {
      if (!categories.includes(courses[index].categoria)) {
        categories.push(courses[index].categoria);
      }
    }
    return categories;
  }


  

  hideProgramDescription(): void {
    this.showProgramFlag = 0;
    this.info.setDesplegable(false);
  }



  getFilteredCursos(searchValue: string): any[] {
    let courses = this.courses
    if (searchValue) {
      return this.indexes.search(searchValue, courses);
    } else {
      return courses.filter((x) => x.prioridad == 1);
    }
  }

  getCursosInstructor(idInstructor = this.instructores[this.selectedInstructor].id){
    // //console.log('instructor test',this.courses,this.instructores,idInstructor)
    let respuesta = this.courses.filter(x => x.instructorRef.id == idInstructor)
    // //console.log('respuesta cosas instructor',respuesta)
    return respuesta
  }

  closeDialog() {
    this.closeEmit.emit()
  }

 

  goProgram(): void {
    this.dialog.close()
    this.info.setDesplegable(false);
    let id = this.programs[this.selectedProgram].id;
  }

  goCourse() {
    this.dialog.close()
    this.info.setDesplegable(false);

    // this.router.navigate([
    //   '/est/mi-curso',
    //   this.courses[this.selectedCourseIndex].id,
    // ]);
  }


}

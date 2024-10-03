import { Component } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CategoryService } from '../../shared/services/category.service';
import { SkillService } from '../../shared/services/skill.service';
import { take } from 'rxjs';
import { cursosProximos } from '../../../assets/data/proximamente.data'
import { CourseService } from '../../shared/services/course.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IndexesService } from '../../shared/services/indexes.service';
import { InfoService } from '../../shared/services/info.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FlexLayoutModule, FlexLayoutServerModule, MatDialogModule,RouterModule],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
 ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {


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

  constructor(
    public icon: IconService,
    private categoryService: CategoryService,
    private skillService: SkillService,
    private courseService: CourseService,
    private indexes: IndexesService,
    public info: InfoService,
    private router: RouterModule,
  ){}

  filterByCategory(categoryIndex: number): any[] {
    let category = this.categories[categoryIndex];
    let respuesta = this.categories.find(
      (x) => x.id == category.id
    ).courses;
    respuesta = respuesta.filter(x=> !x.dontshow)
    return  respuesta
  }

  hideCourseDescription(): void {
    this.showCourseFlag = 0;
    this.info.setDesplegable(false);
  }

  seleccionarPrograma(id): void {
    this.selectedProgram = this.programs.findIndex((x) => x.id == id);
    this.showProgramFlag = 1;
    this.info.setDesplegable(true);
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

  seleccionarCurso(id): void {
    this.selectedCourseIndex = this.courses.findIndex((x) => x.id == id);
    this.router
  }

  cursoProximamente = null

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
            curso['duracion'] = duracionCourse;
            if (curso.enterpriseRef == null){
              delete curso.enterpriseRef 
            }

          });
          // //console.log('cursos',courses)
          this.courses = courses;

          categories.forEach(category => {
            let filteredCourses = courses.filter(course => 
              course['categories'].some(cat => cat.id === category.id)
            );
            category.expanded = false;

            category.courses = filteredCourses;
          });

          this.categories = categories.filter(x=>x.courses.length>0)


          let cursosProxmosIn = cursosProximos
          // //console.log('cursosProxmos',cursosProximos,cursosProxmosIn)
          let proximamente = {
            name:'Proximamente',
            coursesPredyc: cursosProxmosIn,
            courses: cursosProxmosIn
          }

          // //console.log('this.categories',this.categories)
        })
      });
    })
    this.loaded = true;
  }

  getFilteredCursos(searchValue: string): any[] {
    let courses = this.courses
    if (searchValue) {
      return this.indexes.search(searchValue, courses);
    } else {
      return courses.filter((x) => x.prioridad == 1);
    }
  }



}

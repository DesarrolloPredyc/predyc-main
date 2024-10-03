import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-plan',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './student-plan.component.html',
  styleUrls: ['./student-plan.component.css']
})

export class StudentPlanComponent  {

  students = [
    {
      name: 'Arturo',
      position: 'Jefe de mantenimiento',
      progress: 63,
      optimalPace: 'Ritmo óptimo',
      studyPlan: [
        {
          month: 'Mayo',
          courses: [
            { title: 'Curso de Técnicas Predictivas para mantenimiento', status: 'Completado' }
          ]
        },
        {
          month: 'Junio',
          courses: [
            { title: 'Curso de Análisis de Vibraciones CAT 1', status: 'Completado' },
            { title: 'Curso de Termografía CAT 1', status: 'Completado' }
          ]
        },
        {
          month: 'Julio',
          courses: [
            { title: 'Curso de Análisis de Lubricantes', status: 'Atrasado' },
            { title: 'Curso Gestión del Mantenimiento Predictivo 173559', status: 'Pendiente' }
          ]
        }
      ]
    },
   
  ];

  selectedStudent: any;
  selectedStudentCourses: any[];

  selectStudent(student: any): void {
    this.selectedStudent = student;
    this.selectedStudentCourses = student.studyPlan;
  }
}
  


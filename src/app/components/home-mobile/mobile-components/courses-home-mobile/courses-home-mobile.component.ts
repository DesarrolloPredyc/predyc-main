import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses-home-mobile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './courses-home-mobile.component.html',
  styleUrl: './courses-home-mobile.component.css'
})
export class CoursesHomeMobileComponent {
  fotoCurso = "assets/profiles/fotoCurso.webp"

  _courses = [
    {
      name: 'Análisis de Vibraciones CAT 1',
      image: '/assets/images/cursosHD/CAT-II-1.webp',
      description: 'Curso introductorio sobre análisis de vibraciones.'
    },
    {
      name: 'Análisis de Criticidad',
      image: '/assets/images/cursosHD/analisis-de-criticidad.webp',
    },
    {
      name: 'Confiabilidad humana',
      image:  '/assets/images/cursosHD/Confiabilidad-humana.webp',
    },
    {
      name: 'Análisis Causa Raiz',
      image:  '/assets/images/cursosHD/Causa-Raiz.webp',
    },
    {
      name: 'Proceso de Gestión de Mantenimiento',
      image:  '/assets/images/cursosHD/procesoGestionMant.webp',
    },
    {
      name: 'Gestión de paradas de mantenimiento',
      image:  '/assets/images/cursosHD/image-209.webp',
    },
    // {
    //   name: 'Taxonomía según el ISO 14224',
    //   image:  '/assets/images/cursosHD/Taxonomia.webp',
    // },
    // {
    //   name: 'Curso RAM',
    //   image:  '/assets/images/cursosHD/RAMPREDYC.webp',
    // },
    // {
    //   name: 'Motocompresor Reciprocantes',
    //   image:  '/assets/images/cursosHD/motocompresor.webp',
    // },
    // {
    //   name: 'Instrumentos de Temperatura',
    //   image:  '/assets/images/cursosHD/image-230.webp',
    // },
    
    
  ];

  courses = [
    {
      id:'analisis-vibracion-nivel-i',
      name: 'Análisis de Vibraciones CAT 1',
      image: '/assets/images/cursosHD/CAT-II-1.webp',
      description: 'Curso introductorio sobre análisis de vibraciones.'
    },
    {
      id:'analisis-criticidad',
      name: 'Análisis de Criticidad',
      image: '/assets/images/cursosHD/analisis-de-criticidad.webp',
    },
    {
      id:'confiabilidad-humana',
      name: 'Confiabilidad humana',
      image: '/assets/images/cursosHD/Confiabilidad-humana.webp',
    },
    {
      id:'analisis-causa-raiz',
      name: 'Análisis Causa Raiz',
      image: '/assets/images/cursosHD/Causa-Raiz.webp',
    },
    {
      id:'procesos-gestion-mantenimiento-bs-en17007',
      name: 'Proceso de Gestión de Mantenimiento',
      image: '/assets/images/cursosHD/procesoGestionMant.webp',
    },
    {
      id:'gestion-paradas-mantenimiento',
      name: 'Gestión de paradas de mantenimiento',
      image: '/assets/images/cursosHD/image-209.webp',
    },
    // {
    //   id:'taxonomia-iso-14224',
    //   name: 'Taxonomía según el ISO 14224',
    //   image: '/assets/images/cursosHD/Taxonomia.webp',
    // },
    // {
    //   id:'analisis-ram',
    //   name: 'Curso RAM',
    //   image: '/assets/images/cursosHD/RAMPREDYC.webp',
    // },
    // {
    //   id:'motocompresores-reciprocantes',
    //   name: 'Motocompresor Reciprocantes',
    //   image: '/assets/images/cursosHD/motocompresor.webp',
    // },
    // {
    //   id:'instrumentos-temperatura',
    //   name: 'Instrumentos de Temperatura',
    //   image: '/assets/images/cursosHD/image-230.webp',
    // },
  ];


}

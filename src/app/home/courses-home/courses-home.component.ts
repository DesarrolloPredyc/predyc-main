import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.css'] // Corregido styleUrl a styleUrls
})
export class CoursesHomeComponent {
  fotoCurso = "assets/profiles/fotoCurso.webp";

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
    {
      id:'taxonomia-iso-14224',
      name: 'Taxonomía según el ISO 14224',
      image: '/assets/images/cursosHD/Taxonomia.webp',
    },
    {
      id:'analisis-ram',
      name: 'Curso RAM',
      image: '/assets/images/cursosHD/RAMPREDYC.webp',
    },
    {
      id:'motocompresores-reciprocantes',
      name: 'Motocompresor Reciprocantes',
      image: '/assets/images/cursosHD/motocompresor.webp',
    },
    {
      id:'instrumentos-temperatura',
      name: 'Instrumentos de Temperatura',
      image: '/assets/images/cursosHD/image-230.webp',
    },
  ];
}

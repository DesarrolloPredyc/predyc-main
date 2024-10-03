import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pc-demo',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './pc-demo.component.html',
  styleUrls: ['./pc-demo.component.css']
})
export class PcDemoComponent implements OnInit {
  selectedModuleIndex: number | null = null;
  videopredyc = "/assets/images/design/video-predyc.webp";
  // modules: any[] = []; // Arreglo para almacenar los módulos del curso

  course = {
    title: "Taxonomía de acuerdo a ISO 14224",
    modules: [
      {
        titulo: "Introducción a la taxonomía de equipos",
        duration: "1 hrs 8 min",
        image: "/assets/images/demo/toma-decis.jpg",
        clases: [
          { titulo: "Introducción" },
          { titulo: "Concepto y Aplicaciones" },
          { titulo: "Propósito de la Norma" },
          { titulo: "Referencia Histórica" },
          { titulo: "Familiarización con la terminología" },
          { titulo: "Aplicación" },
          { titulo: "Beneficios de la recolección e intercambio de datos RM" },
          { titulo: "Calidad de Datos" }
        ]
      },
      {
        titulo: "Taxonomía según ISO 14224",
        duration: "45 min",
        image: "/assets/images/demo/gest-paradas.jpg",
        clases: [
          { titulo: "Límite de Equipo" },
          { titulo: "Taxonomía ISO 12224" },
          { titulo: "Definiciones de tiempo" }
        ]
      },
      {
        titulo: "Datos recomendados para equipos, fallas y mantenimiento",
        duration: "1 hrs 45 min",
        image: "/assets/images/demo/sap.jpg",
        clases: [
          { titulo: "Categoría de Datos" },
          { titulo: "Datos de equipos" },
          { titulo: "Datos de Fallas" },
          { titulo: "Datos de Mantenimiento" },
          { titulo: "Mecanismos de Falla" },
          { titulo: "Causas de Falla" },
          { titulo: "Metodo de Detección" },
          { titulo: "Actividades de Mantenimiento" }
        ]
      },
      {
        titulo: "Aplicación del estándar ISO 14224 en CMMS para Gestión de Activos",
        duration: "23 min",
        image: "assets/images/module4.jpg",
        clases: [
          { titulo: "Uso de la taxonomía en la jerarquía de activos" },
          { titulo: "Equivalencia ISO 14224 con SAP" },
          { titulo: "Uso de la taxonomía en la gestión de órdenes de trabajo" }
        ]
      }
    ]
  };


  modules = this.course.modules;

  ngOnInit(): void {
    // Asignar los módulos del curso desde la estructura de datos
    this.modules = this.course.modules.map(module => ({
      ...module,
      expanded: false // Agregar propiedad "expanded" a cada módulo
    }));
  }

  toggleModule(index: number): void {
    if (this.selectedModuleIndex === index) {
      this.selectedModuleIndex = null;
    } else {
      this.selectedModuleIndex = index;
    }
  }
}
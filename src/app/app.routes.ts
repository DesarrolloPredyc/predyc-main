import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { RevistaComponent } from './components/revista/revista.component';
import { ConsultoriaComponent } from './components/consultoria/consultoria.component';
import { ArticulosComponent } from './components/blog/articulos/articulos.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { HomeMobileComponent } from './components/home-mobile/home-mobile.component';
import { ScreenSizeService } from './services/screen-size.service';
import { Injectable, NgModule } from '@angular/core';
import { ScreenSizeResolver } from './services/screen-size.resolver';
import { HomeComponentGlobalComponent } from './components/home-global/home-global.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { CursoIndividualComponent } from './components/terms-and-conditions/curso-individual/curso-individual.component';
import { LandingAds1Component } from './marketing/landing-ads-1/landing-ads-1.component';
import { PlanAnualComponent } from './components/terms-and-conditions/plan-anual/plan-anual.component';
import { PlanEmpresarialComponent } from './components/terms-and-conditions/plan-empresarial/plan-empresarial.component';
import { LandingMantenimientoAccionComponent } from './marketing/landing-mantenimiento-accion/landing-mantenimiento-accion.component';
import { freeCoursesComponent } from './components/free-courses/free-courses.component';
import { articlesResolver } from './components/blog/articulos/articulos.resolver';
import { diagnosticosComponent } from './components/diagnostico/diagnosticos.component';
import { diagnosticoFormComponent } from './components/diagnostico/diagnostico-form/diagnostico-form.component';
import { diagnosticoResultComponent } from './components/diagnostico/diagnostico-result/diagnostico-result.component';
import { courseDetailResolver } from './components/course-detail/course-detail.resolver';
import { diagnosticosResolver } from './components/diagnostico/diagnosticos.resolver';
import { programsResolver } from './components/programs/programs.resolver';
import { AsistenciagMantenimientoAccionComponent } from './marketing/asistencia-mantenimiento-accion/asistencia-mantenimiento-accion.component';


const MAIN_TITLE = "Predyc - ";
const DEFAULT_TITLE = "Predyc - Capacitación Industrial"
const DEFAULT_META_DESCRIPTION: string = "Revista de Mantenimiento, Confiabilidad y Gestión de Activos. Más de 350 Artículos Gratis: Mantenimiento predictivo, preventivo, correctivo, industrial."
const FOLLOW_ROUTE = "follow, index"
const NO_FOLLOW_ROUTE = "nofollow, noindex"

export const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home',
    component: HomeComponentGlobalComponent,
    data: {
        title: DEFAULT_TITLE,
        description: DEFAULT_META_DESCRIPTION,
        robots: FOLLOW_ROUTE,
        // ogTitle: null,
        // ogDescription: null,
        // ogUrl: null,
        // ogImage: null,
        keywords: "predyc, capacitación industrial, cursos",
        canonical: `https://predyc.com`,
    }
  },
  { 
    path: 'landing-predyc-lms',
    component: LandingAds1Component,
    data: {
      title: "Predyc - LMS para equipos de mantenimiento",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/landing-predyc-lms`,
    }
  },

  { 
    path: 'mantenimiento-en-accion',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion`,
    }
  },
  { 
    path: 'mantenimiento-en-accion-tractian',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-tractian`,
    }
  },

  { 
    path: 'mantenimiento-en-accion-ads',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-ads`,
    }
  },
  
  { 
    path: 'mantenimiento-en-accion-val',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-val`,
    }
  },
  { 
    path: 'mantenimiento-en-accion-vlil',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-vlil`,
    }
  },
  { 
    path: 'mantenimiento-en-accion-vlis',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-vlis`,
    }
  },
  { 
    path: 'mantenimiento-en-accion-van',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-van`,
    }
  },
  { 
    path: 'mantenimiento-en-accion-vg',
    component: AsistenciagMantenimientoAccionComponent,
    data: {
      title: "Predyc - Mantenimiento en acción",
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      keywords: "predyc, capacitación industrial, cursos",
      canonical: `https://predyc.com/mantenimiento-en-accion-vg `,
    } 
  },
  { 
    path: 'cursos-gratis',
    component: freeCoursesComponent,
    data: {
        title: "Predyc - Cursos gratis",
        description: DEFAULT_META_DESCRIPTION,
        robots: FOLLOW_ROUTE,
        // ogTitle: null,
        // ogDescription: null,
        // ogUrl: null,
        // ogImage: null,
        keywords: "predyc, cursos, gratis",
        canonical: `https://predyc.com/cursos-gratis`,
    }
  },
  { 
    path: 'diagnosticos',
    component: diagnosticosComponent,
    data: {
        title: "Predyc - Diagnósticos",
        description: DEFAULT_META_DESCRIPTION,
        robots: FOLLOW_ROUTE,
        // ogTitle: null,
        // ogDescription: null,
        // ogUrl: null,
        // ogImage: null,
        keywords: "predyc, cursos, diagnósticos",
        canonical: `https://predyc.com/diagnosticos`,
    }
  },
  {
    path: 'diagnostico/:id',
    component: diagnosticoFormComponent,
    resolve: {data: diagnosticosResolver}
  },
  {
    path: 'resultado-diagnostico/:id',
    component: diagnosticoResultComponent,
    data: {
      title: DEFAULT_TITLE,
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      // keywords: "",
      // canonical: `https://predyc.com/diagnosticos`,
    }
  },
  {
    path: 'cursos/:id',
    resolve: {data: courseDetailResolver},
    component: CourseDetailComponent
  },
  {
    path: 'programas/:id',
    resolve: {data: programsResolver},
    component: ProgramsComponent
  },
  // {
  //   path: 'recursos',
  //   component: ResourceListComponent
  // },
  // {
  //   path: 'recursos/:custom-url',
  //   component: ResourceDetailComponent
  // },
  {
    path: 'blog',
    children: [
      { 
        path: '',
        title: MAIN_TITLE + "Blog",
        component: BlogComponent,
        data: {
          title: DEFAULT_TITLE,
          description: DEFAULT_META_DESCRIPTION,
          robots: FOLLOW_ROUTE,
          // ogTitle: null,
          // ogDescription: null,
          // ogUrl: null,
          // ogImage: null,
          keywords: "predyc, blog",
          canonical: `https://predyc.com/blog`,
      }
      },
      { 
        path: ':slug',
        resolve: {data: articlesResolver},
        component: ArticulosComponent 
      }
    ]
  },
  // {
  //   path: 'revista',
  //   component: RevistaComponent
  // },
  // {
  //   path: 'consultoria',
  //   component: ConsultoriaComponent
  // },
  { 
    path: 'terminos-condiciones', 
    component: TermsAndConditionsComponent,
    data: {
      title: DEFAULT_TITLE,
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      // keywords: "",
      // canonical: `https://predyc.com/diagnosticos`,
    }
  },
  { 
    path: 'politica-privacidad', 
    component: PoliticaPrivacidadComponent,
    data: {
      title: DEFAULT_TITLE,
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      // keywords: "",
      // canonical: `https://predyc.com/diagnosticos`,
    }
  },
  { 
    path: 'plan-independiente', 
    component: PlanAnualComponent,
    data: {
      title: DEFAULT_TITLE,
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      // keywords: "",
      // canonical: `https://predyc.com/diagnosticos`,
    }
  },
  { 
    path: 'plan-empresarial', 
    component: PlanEmpresarialComponent,
    data: {
      title: DEFAULT_TITLE,
      description: DEFAULT_META_DESCRIPTION,
      robots: NO_FOLLOW_ROUTE,
      // ogTitle: null,
      // ogDescription: null,
      // ogUrl: null,
      // ogImage: null,
      // keywords: "",
      // canonical: `https://predyc.com/diagnosticos`,
    }
  },
  // { 
  //   path: 'curso-individual', 
  //   component: CursoIndividualComponent 
  // },

  { path: "**", redirectTo: "home", pathMatch: "full" }, // Wildcard Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
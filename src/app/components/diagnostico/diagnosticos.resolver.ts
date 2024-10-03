import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course.service';

export const diagnosticosResolver: ResolveFn<Observable<any>> = (route, state) => {
    const url = route.params.id
    const courseService = inject(CourseService);
    return courseService.getActivityCertificationsById(url).pipe(
        map(result => {
            const activity = result[0]
            return {
                title: `Diagnóstico ${activity.title}`,
                description: "Revista de Mantenimiento, Confiabilidad y Gestión de Activos. Más de 350 Artículos Gratis: Mantenimiento predictivo, preventivo, correctivo, industrial.",
                robots: "follow, index",
                // ogUrl: null,
                // ogTitle: null,
                // ogDescription: null,
                // ogImage: null,
                keywords: "predyc, cursos, diagnósticos",
                canonical: `https://predyc.com/diagnostico/${url}`,
            }
        })
    )
};
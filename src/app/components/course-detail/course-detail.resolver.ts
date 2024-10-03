import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course.service';

export const courseDetailResolver: ResolveFn<Observable<any>> = (route, state) => {
    const url = route.params.id
    const courseService = inject(CourseService);
    return courseService.getCourseByCustomUrl(route.params.id).pipe(
        map(course => {
            return {
                title: "Curso " + course.titulo,
                description: course.metaDescripcion ? course.metaDescripcion : course.descripcion,
                robots: "follow, index",
                // ogUrl: null,
                // ogTitle: null,
                // ogDescription: null,
                // ogImage: null,
                keywords: course.KeyWords,
                canonical: `https://predyc.com/cursos/${url}`,
            }
        })
    )
    //   https://predyc.com/cursos/${url}
};
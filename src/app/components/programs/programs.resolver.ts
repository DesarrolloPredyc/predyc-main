import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProgramService } from '../../shared/services/program.service';

export const programsResolver: ResolveFn<Observable<any>> = (route, state) => {
    const url = route.params.id
    const programService = inject(ProgramService);
    return programService.getProgramById(url).pipe(
        map(program => {
            return {
                title: 'Diplomado ' + program.name,
                description: program.metaDescription ? program.metaDescription : program.description,
                robots: "follow, index",
                // ogUrl: null,
                // ogTitle: null,
                // ogDescription: null,
                // ogImage: null,
                keywords: program.keyWords,
                canonical: `https://predyc.com/programas/${program.slug}`,
            }
        })
    )
};
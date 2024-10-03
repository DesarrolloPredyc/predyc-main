import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  firestore: any;

  constructor(private afs: AngularFirestore) {}

  private programsIndex: any[] = [];

  async getProgramsIndex(): Promise<any[]> {
    if (!this.programsIndex.length) {
      // Obtén los datos una vez usando firstValueFrom
      this.programsIndex = await firstValueFrom(
        this.afs.collection('diplomado').valueChanges({ idField: 'id' })
      );
    }

    return this.programsIndex;
  }

  search(searchValue: string, array: any[]): any[] {

    return array
    .filter((item) =>
      Object.values(item).some((val) =>
        typeof val === 'string' && 
        this.removeAccents(val.toLocaleLowerCase()).includes(this.removeAccents(searchValue.toLocaleLowerCase()))
      )
    )
      .sort((a, b) => {
        let aCount: number = Object.values<any>(a).reduce(
          (acc: number, val: number) =>
            acc +
            this.countOccurrences(
              val?.toString()?.toLocaleLowerCase(),
              searchValue?.toLocaleLowerCase()
            ),
          0
        );
        let bCount: number = Object.values<any>(b).reduce(
          (acc: number, val: number) =>
            acc +
            this.countOccurrences(
              val?.toString()?.toLocaleLowerCase(),
              searchValue?.toLocaleLowerCase()
            ),
          0
        );
        return bCount - aCount;
      });
  }

  removeAccents(str: string): string {
    return str?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
  }

  countOccurrences(value: string, search: string): number {
    return (value?.match(new RegExp(search, 'gi')) || [])?.length || 0;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category, CategoryJson } from '../models/category.model';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private afs: AngularFirestore
  ) {}

  getPredycCategories$() {
    return this.afs.collection<Category>(Category.collection, ref => 
      ref.where('enterprise', '==', null) // Suponiendo que el valor vacío es null. Ajusta según tu caso.
          .orderBy('name')
    ).valueChanges();
  }

  getCategoriesByIds(categorieIDs: string[]): Observable<CategoryJson[]> {
    if (!categorieIDs || categorieIDs.length === 0) {
      return of([]);
    }

    const categoryObservables = categorieIDs.map(tagId => this.afs.collection<Category>(Category.collection).doc(tagId).valueChanges());
    return combineLatest(categoryObservables)
  }

}

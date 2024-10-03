import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Freebie } from '../models/freebie.model';

@Injectable({
  providedIn: 'root'
})
export class FreebieService {

  constructor(
    private afs: AngularFirestore
  ) { }


  getFreebies$(): Observable<Freebie[]> {
    return this.afs.collection<Freebie>(Freebie.collection).valueChanges()
  }
}

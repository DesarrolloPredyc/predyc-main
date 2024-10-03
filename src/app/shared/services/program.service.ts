import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diplomado, DiplomadoJson } from '../models/diplomado.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private firestore: AngularFirestore) { }

  getProgramById(id: string): Observable<DiplomadoJson> {
    return this.firestore.collection(Diplomado.collection).doc(id).get().pipe(
      map((doc: DocumentSnapshot<any>) => {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        } else {
          throw new Error('Program not found');
        }
      })
    );
  }

  getCourseDetails(courseRef: string): Observable<any> {
    //console.log('Fetching course details for reference:', courseRef);
    const docRef = this.firestore.doc(courseRef);
    return docRef.get().pipe(
      map((doc: DocumentSnapshot<any>) => {
        if (doc.exists) {
          const data = doc.data();
          const id = doc.id;
          //console.log('Fetched course data:', data);
          return { id, ...data };
        } else {
          throw new Error('Course not found');
        }
      })
    );
  }

  

  getInstructorDetails(instructorRef: string): Observable<any> {
    //console.log('Fetching instructor details for reference:', instructorRef);
    const docRef = this.firestore.doc(instructorRef);
    return docRef.get().pipe(
      map((doc: DocumentSnapshot<any>) => {
        if (doc.exists) {
          const data = doc.data();
          const id = doc.id;
          //console.log('Fetched instructor data:', data);
          return { id, ...data };
        } else {
          throw new Error('Instructor not found');
        }
      })
    );
  }
}

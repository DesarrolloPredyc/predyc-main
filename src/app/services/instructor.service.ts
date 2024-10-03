import { Injectable } from '@angular/core';
import { AngularFirestore,DocumentReference } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private instructorSubject = new BehaviorSubject<any[]>([]);
  instructor$: Observable<any[]> = this.instructorSubject.asObservable();
  empresa

  constructor(private afs: AngularFirestore) {
    
    this.getInstructors()
    //this.fixInstructors();
  }



  getInstructors() {
    let instructorsQuery$;

    instructorsQuery$ = this.afs.collection<any>('instructors', ref =>
          ref.where('enterpriseRef', '==', null)
        ).valueChanges();

        instructorsQuery$.subscribe({
            next: instructors => {
              this.instructorSubject.next(instructors);
            },
            error: error => {
              console.error(error);
            }
          });

  }
  

  // Function to return the Observable for subscription
  getInstructorsObservable(): Observable<any[]> {
    return this.instructor$;
  }

  fetchInstructorDataById(instructorId: string): Observable<any> {
    const instructorRef = this.afs.doc<any>(`instructors/${instructorId}`).ref;
    return this.afs.doc<any>(instructorRef).valueChanges();
  }
  
  fetchInstructorDataByRef(instructorRef: DocumentReference): Observable<any> {
    return this.afs.doc<any>(instructorRef).valueChanges();
  }


  async fixInstructors() {
    // //console.log('fix instructors')
    const batch = this.afs.firestore.batch();
    
    // Referencia a la colección de 'instructors'
    const collectionRef = this.afs.collection('instructors').ref;
    
    // Obtiene todos los documentos de la colección 'instructors'
    const snapshot = await collectionRef.get();
    
    // Itera sobre cada documento
    snapshot.docs.forEach(doc => {
      const data = doc.data();
  
      // Verifica si el documento no tiene el campo 'enterpriseRef'
      if (data['enterpriseRef'] === undefined) {
        // Si 'enterpriseRef' no existe, actualiza el documento para establecer 'enterpriseRef' a null
        batch.update(doc.ref, { enterpriseRef: null });
      }
    });
  
    // Ejecuta el batch write si hay documentos para actualizar
    if (!snapshot.empty) {
      await batch.commit();
    }
  }
  
}
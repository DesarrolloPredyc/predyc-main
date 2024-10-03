import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map, of, switchMap, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private afs: AngularFirestore,
  ) { }


// Función para buscar el evento más reciente o con 'assistanceData' y filtrado por 'campana'
  getLatestEventByEmail(email: string, campana: string): Promise<any> {
    return this.afs.collection('eventosRegister', ref => 
      ref.where('email', '==', email)
        .where('campana', '==', campana) // Filtro adicional por 'campana'
        .orderBy('date', 'desc') // Ordenar por fecha descendente
    ).get().toPromise().then(snapshot => {
      const filteredEvents = snapshot.docs.map(doc => {
        const data = doc.data() as any; // Aseguramos que data es de tipo 'any'
        const id = doc.id;
        
        // Verificamos que 'data' es un objeto antes de usar el spread operator
        if (typeof data === 'object' && data !== null) {
          return { id, ...data }; // Si es un objeto, aplicamos el spread
        } else {
          return { id }; // Si no es un objeto, solo devolvemos el ID
        }
      });

      // Buscar el evento más reciente o el que tenga 'assistanceData'
      const recentEvent = filteredEvents.find(event => event.assistanceData) || filteredEvents[0];

      return recentEvent || null; // Devolver el más reciente o null si no se encuentra
    });
  }

  // Función para actualizar el assistanceData de un evento
updateAssistanceData(idEvento: string, asistencia: any): Promise<void> {
  // Referencia al documento por ID
  const eventoRef = this.afs.collection('eventosRegister').doc(idEvento).ref;

  return eventoRef.get().then(doc => {
    if (!doc.exists) {
      throw new Error('El evento no existe');
    }

    const data = doc.data() as any;

    // Verificar si 'assistanceData' existe y es un arreglo
    let assistanceData = data.assistanceData || [];

    // Verificar si el objeto de asistencia ya existe en el arreglo
    const existeAsistencia = assistanceData.some((entry: any) => entry.id === asistencia.id);

    if (!existeAsistencia) {
      // Si no existe, agregar el nuevo objeto de asistencia
      assistanceData.push(asistencia);

      // Actualizar el documento en Firestore con el nuevo assistanceData
      return eventoRef.update({ assistanceData });
    } else {
      console.log('El objeto de asistencia ya existe en el arreglo.');
      return Promise.resolve();
    }
  }).catch(error => {
    console.error('Error al actualizar la asistencia:', error);
    throw error;
  });
}





  
  
}

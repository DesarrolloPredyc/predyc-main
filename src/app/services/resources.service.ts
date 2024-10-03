
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  resources: any[] = []

  getResources(): Observable<any>{
    return this.afs.collection("freebie").valueChanges()
  }

  getResourceByUrl(url: string){
    return this.afs.collection("freebie").ref.where("customUrl", "==",url).get().then(doc => {
      if(doc.empty){
        return null
      } else {
        return doc.docs[0].data()
      }
    })
  }

  getResourceById(id: string){
    return this.afs.collection("freebie").doc(id).ref.get().then(doc => {
      return doc.data()
    })
  }

  async downloadResource(form, resource){
    return this.afs.collection("freebie").doc(resource.id).collection("downloads").add(form).then(() => {
      return true
    }).catch(err => {
      return false
    })
  }

  async setContactFrom(form){
    await this.afs.collection("contact-form-home").add(form)
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Author, AuthorJson } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAuthors$(): Observable<AuthorJson[]> {
    //console.log("Authors")
    return this.afs.collection<Author>(Author.collection).valueChanges()
  }

  getAuthorById$(authorId: string): Observable<Author> {
    return this.afs.collection<Author>(Author.collection).doc(authorId).valueChanges()
  }

  getAuthorRefById(authorId: string): DocumentReference<Author> {
    return this.afs.collection<Author>(Author.collection).doc(authorId).ref
  }
  
}

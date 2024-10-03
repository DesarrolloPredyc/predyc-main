import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getPredycSkills$() {
    return this.afs.collection<Skill>(Skill.collection, ref => 
      ref.where('enterprise', '==', null) // Suponiendo que el valor vacío es null. Ajusta según tu caso.
          .orderBy('name')
    ).valueChanges();
  }
}

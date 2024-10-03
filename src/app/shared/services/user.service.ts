import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private functions: AngularFireFunctions,
  ) { }


    generateRandomPassword(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters[randomIndex];
      }
      return password;
    }


  async createUser(userData: any, mailchimpTag: string) {

    const usersRef = this.afs.collection(User.collection).ref.where("email", "==", userData.email);
    const querySnapshot = await usersRef.get();
    if (!querySnapshot.empty) {
      console.log("User already exists")
      return
    }

    let generalPassword = this.generateRandomPassword(10);
    const password = userData.password ? userData.password : generalPassword
    const credentials = await this.afAuth.createUserWithEmailAndPassword(userData.email, password);
    const userCredentials = credentials.user
    const user = {
      createdAt: userData.createdAt,
      displayName: userData.name.toLocaleLowerCase(),
      email: userCredentials.email.toLocaleLowerCase(),
      name: userData.name.toLocaleLowerCase(),
      photoUrl: "",
      job: userData.job,
      phoneNumber: userData.phoneNumber,
      uid: userCredentials.uid,
    };
    // console.log("user credentials", user)
    
    const userDataToSave = User.getStudentUser();
    userDataToSave.displayName = user.displayName;
    userDataToSave.email = user.email;
    userDataToSave.name = user.displayName;
    userDataToSave.photoUrl = user.photoUrl;
    userDataToSave.job = user.job;
    userDataToSave.phoneNumber = user.phoneNumber;
    userDataToSave.uid = user.uid;
    
    // const userRef = this.afs.collection(User.collection).doc(user.uid);
    //await userRef.set(userDataToSave.toJson(), { merge: true })
    await firstValueFrom(this.functions.httpsCallable("createUserDocument")({
      userDataToSave: userDataToSave.toJson(),
      mailchimpTag:mailchimpTag
    }))

    //Añadimos campo mailchimpTag despues para que se cumpla la condicion de carrera con la extension de mailchimp
    // setTimeout(async() => {
    //   await userRef.set({mailchimpTag: mailchimpTag},{ merge: true }); 
    // }, 5000);
    console.log("user created");
  }
}

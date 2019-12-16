import { Injectable } from '@angular/core';
import { User } from './User';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase,
              private aut: AngularFireAuth) { }

  createUser() {
    return this.db.list('/users/').push({
      gak : {
        email : 'babooo',
        password : 1234
      }
    });
  }

  boom() {
    // this.aut.auth.createUserWithEmailAndPassword('alanigogoss@gmail.com', '1234567').catch(function(error) {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    //   // ...
    // });
    this.aut.auth.sendPasswordResetEmail('alanigogos@gmail.com').catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  }
}

import { Injectable } from '@angular/core';
import { User } from './User';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

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

  public boom(email) {
    let one;
    this.db.database.ref('/users/' + email).once('value').then((snapshot) => {
      one = snapshot.exists();
    });
    console.log(one);
  }
}

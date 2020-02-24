import { Injectable } from '@angular/core';
import { User } from './User';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase,
              private aut: AngularFireAuth) { }

  private signedIn = new Subject();
  private error = new Subject();

  isSignedIn() {
    return this.signedIn;
  }
  updateSignIn(signedIn: boolean) {
    this.signedIn.next(signedIn);
  }

  getError() {
    return this.error;
  }
  updateError(error: string) {
    this.error.next(error);
  }
}

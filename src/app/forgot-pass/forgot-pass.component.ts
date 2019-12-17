import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  email = '';
  hint = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private db: AngularFireDatabase,
              private aut: AngularFireAuth) {}

  ngOnInit() {
  }

  onSubmit() {
    this.aut.auth.fetchSignInMethodsForEmail(this.email).then((s) => {
      if (s.length === 0) {
        this.hint = 'There is not an account with that email';
      } else {
        this.hint = '';
        this.aut.auth.sendPasswordResetEmail(this.email).then(() => {
          Swal.fire(
            'Done!',
            'An email has been sent to <strong>' + this.email + '</strong> to reset your password',
            'success'
          ).then(() => {
            this.email = '';
          });
        });
      }
    });
  }

}

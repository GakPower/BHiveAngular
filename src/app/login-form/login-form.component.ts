import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {errorObject} from 'rxjs/internal-compatibility';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public email = '';
  public password = '';
  public show = false;
  public type = 'password';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  showHide() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }
  onSubmit() {
    this.aut.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.email = '';
        this.password = '';
        this.emailFormControl.reset();
        this.passwordFormControl.reset();
        console.log(this.aut.auth.currentUser.email);
      }
    );
  }
  constructor(private db: AngularFireDatabase,
              private aut: AngularFireAuth) { }

  ngOnInit() {
  }
}

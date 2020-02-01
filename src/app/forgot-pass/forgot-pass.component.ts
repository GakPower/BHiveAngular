import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

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
  emailForm = new FormControl('');
  emailErrorText = '';

  constructor(private aut: AngularFireAuth,
              private router: Router,
              private userService: UserService) {
    if (aut.auth.currentUser != null) {
      this.router.navigate(['/monitor']);
      this.userService.updateSignIn(true);
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.emailForm.value;
    if (!email) {
      this.emailForm.setErrors({empty: true});
      this.emailErrorText = 'The field can not be empty';
    } else if (email.indexOf('@') === -1) {
      this.emailForm.setErrors({notEmail: true});
      this.emailErrorText = 'Wrongly formatted email';
    } else {
      this.aut.auth.fetchSignInMethodsForEmail(email).then((s) => {
        if (s.length === 0) {
          this.emailErrorText = 'There is not an account with that email';
          this.emailForm.setErrors({accMailNotFound: true});
        } else {
          this.aut.auth.sendPasswordResetEmail(email).then(() => {
            Swal.fire(
              'Done!',
              'An email has been sent to <strong>${email}</strong> to reset your password',
              'success'
            ).then(() => {
              this.emailForm.reset();
            });
          });
        }
      });
    }
  }

}

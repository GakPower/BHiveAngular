import { Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  emailForm = new FormControl('');
  emailErrorText = '';
  disabled = false;

  constructor(private aut: AngularFireAuth,
              public router: Router,
              private userService: UserService) {
    if (aut.auth.currentUser != null) {
      this.router.navigate(['/monitor']);
      this.userService.updateSignIn(true);
    }
  }

  onSubmit() {
    this.disabled = true;
    setTimeout(() => {
      const email = this.emailForm.value;
      if (!email) {
        this.setError({empty: true}, 'The field can not be empty');
      } else if (email.indexOf('@') === -1) {
        this.setError({notEmail: true}, 'Wrongly formatted email');
      } else {
        this.aut.auth.fetchSignInMethodsForEmail(email).then((s) => {
          if (s.length === 0) {
            this.setError({accMailNotFound: true}, 'There is not an account with that email');
          } else {
            this.aut.auth.sendPasswordResetEmail(email).then(() => {
              Swal.fire(
                'Done!',
                'An email has been sent to <strong>' + email + '</strong> to reset your password',
                'success'
              ).then(() => {
                this.emailForm.reset();
                this.router.navigate(['/login']);
              });
              this.disabled = false;
            });
          }
        });
      }
    }, 500);
  }

  setError(error, errorMessage) {
    this.emailForm.setErrors(error);
    this.emailErrorText = errorMessage;
    this.disabled = false;
  }

}

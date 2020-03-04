import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  emailForm = new FormControl('');
  passForm = new FormControl('');
  showPassField = false;
  typePassField = 'password';
  signedIn;
  emailErrorText = '';
  passErrorText = '';
  disabled = false;

  constructor(private aut: AngularFireAuth,
              private router: Router,
              private userService: UserService) {
    if (aut.auth.currentUser != null) {
      this.router.navigate(['/monitor']);
      this.userService.updateSignIn(true);
    }
    this.userService.isSignedIn().subscribe(isSigned => {
      this.signedIn = isSigned;
    });
  }

  showHide() {
    this.showPassField = !this.showPassField;
    this.typePassField = this.showPassField ? 'text' : 'password';
  }
  onSubmit() {
    this.disabled = true;
    setTimeout(() => {
      this.aut.auth.signInWithEmailAndPassword(this.emailForm.value, this.passForm.value).then(() => {
          this.emailForm.reset();
          this.passForm.reset();

          this.userService.updateSignIn(true);
          this.router.navigate(['/monitor']);

          this.disabled = false;
        }
      ).catch((reason => {
        if (!this.emailForm.value) {
          this.emailForm.setErrors({empty: true});
          this.emailErrorText = 'The field can not be empty';
        } else if (reason.code === 'auth/invalid-email') {
          this.emailForm.setErrors({notEmail: true});
          this.emailErrorText = 'Wrongly formatted email';
        }

        if (!this.passForm.value) {
          this.passForm.setErrors({empty: true});
          this.passErrorText = 'The field can not be empty';
        } else if (reason.code === 'auth/wrong-password' || reason.code === 'auth/user-not-found') {
          this.passForm.setErrors({wrongComb: true});
          this.passErrorText = 'Invalid combination of email and password';
        }
        this.disabled = false;
      }));
    }, 500);
  }
}

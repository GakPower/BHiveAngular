import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../shared/user.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public emailForm = new FormControl('');
  public passForm = new FormControl('');
  public show = false;
  public type = 'password';
  public signedIn;
  emailErrorText = '';
  passErrorText = '';

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

  ngOnInit() {
  }

  showHide() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }
  onSubmit() {
    this.aut.auth.signInWithEmailAndPassword(this.emailForm.value, this.passForm.value).then(() => {
        this.emailForm.reset();
        this.passForm.reset();

        this.userService.updateSignIn(true);
        this.router.navigate(['/monitor']);

        console.log(this.aut.auth.currentUser.uid);
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
    }));
  }
}

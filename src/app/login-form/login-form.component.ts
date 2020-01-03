import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../shared/user.service';

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
  public signedIn;

  showHide() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }
  onSubmit() {
    this.aut.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.email = '';
        this.password = '';

        this.userService.updateSignIn(true);

        console.log(this.aut.auth.currentUser.uid);
      }
    );
  }
  constructor(private db: AngularFireDatabase,
              private aut: AngularFireAuth,
              private userService: UserService) {
    this.userService.isSignedIn().subscribe(isSigned => {
      this.signedIn = isSigned;
    });
  }

  ngOnInit() {

  }
}

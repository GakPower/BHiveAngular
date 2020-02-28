import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private aut: AngularFireAuth,
              private router: Router,
              private userService: UserService) {
    if (aut.auth.currentUser != null) {
      this.router.navigate(['/monitor']);
      this.userService.updateSignIn(true);
    }
  }

  openInNewTab(url) {
    window.open(url, '_blank').focus();
  }
}

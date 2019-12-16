import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public username = '';
  public password = '';
  public show = false;
  public type = 'password';
  public icon = 'remove_red_eye';

  showHide() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
    this.icon = this.show ? 'panorama_fish_eye' : 'remove_red_eye';
  }
  onSubmit() {
    this.userService.createUser().then(r => console.log(r));
    this.userService.boom();
    console.log(this.username + ' ' + this.password);
  }
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}

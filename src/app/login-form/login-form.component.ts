import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public value = '#ff0005';
  public vr = '#ff0005';

  constructor() { }

  ngOnInit() {
  }

}

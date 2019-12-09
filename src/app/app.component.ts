import {Component} from '@angular/core';

window.addEventListener('scroll', f);

function f() {
  this.fixed = !this.fixed;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BHiveProject';
  public fixed = false;

}

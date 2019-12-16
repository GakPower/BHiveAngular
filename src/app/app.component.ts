import {Component} from '@angular/core';

window.addEventListener('scroll', f);

function f() {
  this.fixed = window.pageYOffset > 241;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BHiveProject';
  public fixed = false;
  public animateContacts = false;

  async scrollToBottom() {
    scrollTo(0, document.documentElement.clientHeight);
    await sleep(500);
    this.animateContacts = !this.animateContacts;
    await sleep(700);
    this.animateContacts = !this.animateContacts;
  }
}

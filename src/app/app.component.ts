import {Component} from '@angular/core';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BHive';
  public fixed = false;
  animateContacts = false;

  async scrollToBottom() {
    scrollTo(0, document.documentElement.clientHeight);
    await sleep(500);
    this.animateContacts = !this.animateContacts;
    await sleep(700);
    this.animateContacts = !this.animateContacts;
  }
  constructor() {
    setInterval(() => {
      this.fixed = window.pageYOffset > 220;
    }, 10);
  }
}

import {Component} from '@angular/core';
import {UserService} from "./shared/user.service";

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
  public signedIn;

  async scrollToBottom() {
    scrollTo(0, document.documentElement.clientHeight);
    await sleep(500);
    this.animateContacts = !this.animateContacts;
    await sleep(700);
    this.animateContacts = !this.animateContacts;
  }
  constructor(private userService: UserService) {
    setInterval(() => {
      this.fixed = window.pageYOffset > 220;
    }, 1);

    this.userService.isSignedIn().subscribe(isSigned => {
      this.signedIn = isSigned;
    })
  }
}

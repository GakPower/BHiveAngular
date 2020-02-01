import {Component} from '@angular/core';
import { UserService } from './shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

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
  color = 'rgba(255, 172, 29, 0.25)';

  async scrollToBottom() {
    scrollTo(0, document.body.scrollHeight);
    await sleep(500);
    this.animateContacts = !this.animateContacts;
    await sleep(700);
    this.animateContacts = !this.animateContacts;
  }
  constructor(private userService: UserService,
              private aut: AngularFireAuth) {
    aut.auth.signOut();
    setInterval(() => {
      this.fixed = window.pageYOffset > 198;
    }, 1);

    this.userService.isSignedIn().subscribe(isSigned => {
      this.signedIn = isSigned;
    });
  }
}

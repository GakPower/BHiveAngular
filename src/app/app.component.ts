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
  fixed = false;
  animateContacts = false;
  signedIn;
  secondaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--secondaryRipple');
  barText: unknown = '';
  barColor: unknown = '';

  constructor(private userService: UserService,
              private aut: AngularFireAuth) {
    aut.auth.signOut();
    setInterval(() => {
      this.fixed = window.pageYOffset > 220;
    }, 1);

    this.userService.isSignedIn().subscribe(isSigned => {
      this.signedIn = isSigned;
    });

    this.userService.getBarText().subscribe(barText => {
      this.barText = barText;
    });
    this.userService.getBarColor().subscribe(barColor => {
      this.barColor = barColor;
    });
  }

  async scrollToBottom() {
    scrollTo(0, document.body.scrollHeight);
    await sleep(500);
    this.animateContacts = !this.animateContacts;
    await sleep(700);
    this.animateContacts = !this.animateContacts;
  }

  hideBar() {
    this.userService.updateBarText('');
  }
}

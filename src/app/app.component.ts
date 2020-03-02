import {AfterContentInit, Component} from '@angular/core';
import { UserService } from './shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {slideInAnimation} from './animations';
import {RouterOutlet} from '@angular/router';
import { HostListener } from '@angular/core';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements AfterContentInit {
  title = 'BHive';
  fixed = false;
  animateContacts = false;
  signedIn;
  secondaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--secondaryRipple');
  barText: unknown = '';
  barColor: unknown = '';
  openSideBar = false;

  constructor(private userService: UserService,
              private aut: AngularFireAuth) {
    aut.auth.signOut();

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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngAfterContentInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.fixed = window.pageYOffset > 220;
  }
}

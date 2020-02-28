import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private signedIn = new Subject<boolean>();
  private barText = new Subject<string>();
  private barColor = new Subject<string>();

  isSignedIn() {
    return this.signedIn;
  }

  updateSignIn(signedIn: boolean) {
    this.signedIn.next(signedIn);
  }

  getBarText() {
      return this.barText;
  }
  getBarColor() {
      return this.barColor;
  }

  updateBar(barText: string, barColor: string) {
    this.barText.next(barText);
    this.barColor.next(barColor);
  }
  updateBarText(barText: string) {
    this.barText.next(barText);
  }
  updateBarColor(barColor: string) {
    this.barColor.next(barColor);
  }
}

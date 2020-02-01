import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: number;

  public constructor(private el: ElementRef) {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {

      this.el.nativeElement.focus();

    }, this.appAutoFocus);
  }
}

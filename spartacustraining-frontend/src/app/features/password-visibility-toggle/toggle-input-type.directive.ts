import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggleType]',
  exportAs: 'inputType',
})
export class ToggleInputTypeDirective {
  isShown: boolean = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.isShown = !this.isShown;
    if (this.isShown) {
      this.el.nativeElement.setAttribute('type', 'text');
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
    }
  }

  getIcon() {
    return this.isShown ? 'fa-eye' : 'fa-eye-slash';
  }
}

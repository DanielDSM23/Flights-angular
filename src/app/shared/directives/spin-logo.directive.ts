import { Directive, ElementRef, HostListener, input, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpinLogo]'
})
export class SpinLogoDirective {

  @Input() appSpinLogo: string = '';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.classList.add(this.appSpinLogo)
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.classList.remove(this.appSpinLogo)
  }

}

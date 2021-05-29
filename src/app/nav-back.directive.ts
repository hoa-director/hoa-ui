import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common'

@Directive({
  selector: '[appNavBack]'
})
export class NavBackDirective {

  constructor(private location: Location) { }

  @HostListener('click')
  navBack() {
    this.location.back()
  }
}

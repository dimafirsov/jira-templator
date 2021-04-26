import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jitViewRef]'
})
export class ViewRefDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

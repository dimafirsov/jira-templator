import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

    public mainPage$: Subject<ComponentType<any>> = new Subject<ComponentType<any>>();

  constructor() { }
}

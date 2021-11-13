import { ComponentType } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { ToastComponent } from '../lib/toast/toast.component';

export interface IToastLoad {
    type: 'success' | 'warning' | 'error';
    text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    public body: HTMLElement;
    public showToast$: Subject<IToastLoad> = new Subject<IToastLoad>();

    @ViewChild(ViewRefDirective, { static: true }) public jitViewRef!: ViewRefDirective;

    constructor(private cfr: ComponentFactoryResolver) {
        this.body = document.body;
    }

    public toggle(vrd: ViewRefDirective, params: IToastLoad): void {
        this.createComponent(vrd, ToastComponent, params.type, params.text);
    }

    private createComponent(vrd: ViewRefDirective,
                            component: ComponentType<ToastComponent>,
                            type: 'success' | 'warning' | 'error' = 'success',
                            text: string): void {

        const fact = this.cfr.resolveComponentFactory(component);
        const compRef = vrd.viewContainerRef.createComponent(fact);
        compRef.instance.text = text;
        compRef.instance[type] = true;
        vrd.viewContainerRef.move(compRef.hostView, 0);

        setTimeout(() => {
            compRef.destroy();
        }, 4000);
    }
}

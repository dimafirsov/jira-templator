import { ComponentType, Portal } from '@angular/cdk/portal';
import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PageService } from '../services/page.service';
import { takeUntil, tap } from 'rxjs/operators';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { SettingsPageComponent } from '../pages/settings-page/settings-page.component';
import { IToastLoad, ToastService } from '../services/toast.service';

@Component({
  selector: 'jit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'jit';
    public page: Portal<any> | undefined;

    private destroy$: Subject<any> = new Subject<any>();

    @ViewChild(ViewRefDirective, { static: true }) public jitViewRef!: ViewRefDirective;

    constructor(private pageService: PageService, private cfr: ComponentFactoryResolver, private toast: ToastService) {
        this.pageService.mainPage$
            .pipe(
                tap(val => {
                    const componentRef: ComponentRef<any> = this.createComponent(val, {temp: 'Some new string'}) as ComponentRef<any> ;
                    this.pageService.mainPageRef = componentRef;
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();

        this.toast.showToast$
            .pipe(
                tap((val: IToastLoad) => {
                    this.toast.toggle(this.jitViewRef, val);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    ngOnInit(): void {
        // this.pageService.mainPage$.next(MainPageComponent);
        this.pageService.mainPage$.next(SettingsPageComponent);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private createComponent(component: ComponentType<any>, config?: Record<string, any>): ComponentRef<any> {
        const fact = this.cfr.resolveComponentFactory(component);
        this.jitViewRef?.viewContainerRef.clear();
        const compRef = this.jitViewRef?.viewContainerRef.createComponent(fact);

        if (config && Object.keys(config).length > 0 ) {
            Object.entries(config).forEach(([k, v]) => {
                compRef.instance[k] = v;
            });
        }

        return compRef;
    }
}

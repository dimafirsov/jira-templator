import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PageService } from '../services/page.service';
import { takeUntil, tap } from 'rxjs/operators';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { IDynamicConfigurable } from '../type';

@Component({
  selector: 'jit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'jit';
    public page: Portal<any> | undefined;

    private destroy$: Subject<any> = new Subject<any>();

    @ViewChild(ViewRefDirective, { static: true })
    public jitViewRef!: ViewRefDirective;

    constructor(private pageService: PageService, private cfr: ComponentFactoryResolver) {
        this.pageService.mainPage$
            .pipe(
                // tap(val => this.page = new ComponentPortal(val)),
                tap(val => {
                    const componentRef: ComponentRef<MainPageComponent> =
                        this.createComponent(MainPageComponent, {temp: 'Some new string'}) as ComponentRef<MainPageComponent> ;
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();


        // this.pageService.currentPage$.next();
    }

    ngOnInit(): void {
        // const componentRef: ComponentRef<MainPageComponent> =
            // this.createComponent(MainPageComponent) as ComponentRef<MainPageComponent> ;
        // componentRef.instance.temp = 'Another hello!';
        this.pageService.mainPage$.next(MainPageComponent);
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

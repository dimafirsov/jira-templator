import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Self,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DEFAULT_TEMPLATE } from '../../constants';
import { SettingsService } from '../../services/settings.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { IJTStorage } from '../../type';
import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form/settings-issue-template-form.component';
import { formControlConfig, tabsContent } from './constants';
import { FormControlConfig, ITabsContent } from './types';
import { ComponentType } from '@angular/cdk/portal';
import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form/settings-issue-selector-form.component';
import { SettingsTemplateTabComponent } from './settings-template-tab/settings-template-tab.component';
import { SettingsUtilsTabComponent } from './settings-utils-tab/settings-utils-tab.component';
import { FORM_CONTROL_CONFIG, TABS_CONTENT } from './tokens';

@Component({
    selector: 'jit-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FORM_CONTROL_CONFIG,
            useValue: formControlConfig,
        },
        {
            provide: TABS_CONTENT,
            useValue: tabsContent,
        },
    ]
    })
export class SettingsPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public issueTypes: string[] = Object.keys(DEFAULT_TEMPLATE.issueTypes);

    public currentIssueType!: string;
    public currentTabRef!: ComponentRef<any>;

    private destroy$: Subject<any> = new Subject();
    private destroySettingsTemplateFormUpdate$: Subject<any> = new Subject();

    @ViewChild(SettingsIssueTemplateFormComponent) public settingsTemplateForm!: SettingsIssueTemplateFormComponent;
    @ViewChild('newItemInput') public newItemInput!: ElementRef<HTMLInputElement>;
    @ViewChild('tabContent', { read: ViewContainerRef }) public dynamicArea!: ViewContainerRef;

    constructor(
        @Self() @Inject(FORM_CONTROL_CONFIG) public controlConfig: FormControlConfig,
        @Self() @Inject(TABS_CONTENT) public tabsConfig: ITabsContent[],
        public storage: StorageService,
        public settings: SettingsService,
        public toast: ToastService,
        private cdRef: ChangeDetectorRef,
        private cfr: ComponentFactoryResolver,
    ) {}

    ngOnInit(): void {
        this.setupSubscriptions();
    }

    ngAfterViewInit(): void {
        this.loadComponentForTab(SettingsIssueSelectorFormComponent);
        this.cdRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        if (!this.destroySettingsTemplateFormUpdate$.closed) {
            this.destroySettingsTemplateFormSubject();
        }
    }

    public selectItem(item: string): void {
        this.settings.currentIssueType$.next(item);
        this.cdRef.detectChanges();
    }

    public loadComponentForTab(component?: ComponentType<any>): void {
        if (!component) { return; }

        if (component === SettingsIssueSelectorFormComponent) {
            const ref = this.createComponentRef(component) as ComponentRef<SettingsIssueSelectorFormComponent>;
        }

        if (component === SettingsTemplateTabComponent) {
            this.currentTabRef = this.createComponentRef(component) as ComponentRef<SettingsTemplateTabComponent>;
            this.currentTabRef.instance.issueTypes = this.issueTypes;
        }

        if (component === SettingsUtilsTabComponent) {
            const ref = this.createComponentRef(component) as ComponentRef<SettingsUtilsTabComponent>;
        }
    }

    private destroySettingsTemplateFormSubject(): void {
        this.destroySettingsTemplateFormUpdate$.next();
        this.destroySettingsTemplateFormUpdate$.complete();
    }

    private createComponentRef(component: ComponentType<any>): ComponentRef<any> {
        const fact = this.cfr.resolveComponentFactory(component);
        this.dynamicArea.clear();
        return this.dynamicArea.createComponent(fact);
    }

    private setupSubscriptions(): void {
        this.storage.current$
            .pipe(
                filter(value => !isEqual(value, DEFAULT_TEMPLATE)),
                tap(() => this.settingsTemplateForm?.updateControls()),
                tap(() => this.destroySettingsTemplateFormSubject()),
                takeUntil(this.destroySettingsTemplateFormUpdate$)
            )
            .subscribe();

        this.storage.current$
            .pipe(
                filter((data: IJTStorage) => !!data),
                tap((data: IJTStorage) => {
                    console.log('>>> data from pipe', data);
                    this.issueTypes = Object.keys(data?.issueTypes || {});

                    if (this.currentTabRef?.instance instanceof SettingsTemplateTabComponent) {
                        this.currentTabRef.instance.issueTypes = this.issueTypes;
                    }

                    console.log('>>> this.issueTypes', this.issueTypes);
                    console.log('>>> currentIssueType', this.currentIssueType);
                    const currentIssue = this.settings.currentIssueType$.value;
                    this.issueTypes.includes(currentIssue)
                        ? this.settings.currentIssueType$.next(currentIssue)
                        : this.settings.currentIssueType$.next(Object.keys(data?.issueTypes)[0]);
                    console.log('>>> this.issueTypes.includes(currentIssue)', this.issueTypes.includes(currentIssue));
                    console.log('>>> currentIssue', currentIssue);
                    console.log('>>> current 111 issue', this.settings.currentIssue$.value);
                    this.cdRef.detectChanges();
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();

        this.settings.currentIssueType$
            .pipe(
                tap((type: string) => {
                    const current = this.storage.current$.value?.issueTypes;
                    const currentType = current[type];
                    this.currentIssueType = currentType ? type : Object.keys(current)[0];
                    this.settings.currentIssue$.next(current[this.currentIssueType].slice());
                    console.log('>>> from sub', type);
                    console.log('>>> current issue from sub', this.settings.currentIssue$.value);
                    this.cdRef.detectChanges();
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}

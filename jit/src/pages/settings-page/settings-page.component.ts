import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DEFAULT_TEMPLATE, STORAGE_NAME } from '../../constants';
import { SettingsService } from '../../services/settings.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { IJTStorage } from '../../type';
import { SettingsIssueItemComponent } from './settings-issue-item/settings-issue-item.component';
import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form/settings-issue-template-form.component';

@Component({
  selector: 'jit-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public issueTypes: string[] = Object.keys(DEFAULT_TEMPLATE.issueTypes);

    public currentIssueType!: string;
    public showInput!: boolean;
    public settingsForm!: FormGroup;
    public formControlNames = {
        GlobalTrigger: 'globalTrigger',
        LoadTimeout: 'loadTimeout',
    };
    public globalTriggerSelector = '#createGlobalItem';
    public loadTimeout = 2700;

    private destroy$: Subject<any> = new Subject();
    private destroySettingsTemplateFormUpdate$: Subject<any> = new Subject();

    @ViewChildren(SettingsIssueItemComponent) public issueTypeElements!: QueryList<SettingsIssueItemComponent>;
    @ViewChild(SettingsIssueTemplateFormComponent) public settingsTemplateForm!: SettingsIssueTemplateFormComponent;
    @ViewChild('newItemInput') public newItemInput!: ElementRef<HTMLInputElement>;

    constructor(public storage: StorageService,
                private cdRef: ChangeDetectorRef,
                public settings: SettingsService,
                public toast: ToastService,
                private formBuilder: FormBuilder,
                ) {}

    ngOnInit(): void {
        console.log('>>> on init');
        this.settingsForm = this.formBuilder.group({
            [this.formControlNames.GlobalTrigger]: [
                this.storage.current$.value.globalTriggerSelector || this.globalTriggerSelector,
                Validators.required],
            [this.formControlNames.LoadTimeout]: [this.storage.current$.value.loadTimeout || this.loadTimeout],
        });

        this.settingsForm.valueChanges
            .pipe(
                tap(data => {
                    this.storage.getStorage(STORAGE_NAME, (d: IJTStorage) => {
                        this.storage.setStorage({
                            ...d,
                            globalTriggerSelector: data[this.formControlNames.GlobalTrigger],
                            loadTimeout: data[this.formControlNames.LoadTimeout]
                        } as IJTStorage);
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();

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
                    console.log('>>> currentIssueType', this.currentIssueType);
                    const currentIssue = this.settings.currentIssueType$.value || Object.keys(data?.issueTypes)[0];
                    this.settings.currentIssueType$.next(currentIssue);
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

        this.storage.loadStorage();
    }

    ngAfterViewInit(): void {
        this.issueTypeElements
            .toArray()
            .filter(item => item.type === this.currentIssueType)[0].active = true;

        this.storage.getStorage(STORAGE_NAME, (data: IJTStorage) => {
            this.settingsForm.setValue({
                [this.formControlNames.GlobalTrigger]: data.globalTriggerSelector || this.globalTriggerSelector,
                [this.formControlNames.LoadTimeout]: data.loadTimeout || this.loadTimeout,
            });
        });
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

    public addIssueType(): void {
        if (!this.newItemInput.nativeElement.value) {
            this.toast.showToast$.next({type: 'error', text: 'Can\'t create an issue with empty name!'});
            return;
        }
        if (this.newItemInput.nativeElement.value) {
            this.storage.setStorage({
                issueTypes: {
                    ...this.storage.current$.value?.issueTypes,
                    [this.newItemInput.nativeElement.value]: [
                        {
                            selectors: [],
                            template: 'new template',
                            title: 'new title',
                        }
                    ]
                },
            });
        }
    }

    public clearStorage(): void {
        this.storage.clearStorage();
    }
    public getStorage(): void {
        console.log('>>> storage', this.storage.current$.value);
    }

    private destroySettingsTemplateFormSubject(): void {
        this.destroySettingsTemplateFormUpdate$.next();
        this.destroySettingsTemplateFormUpdate$.complete();
    }
}

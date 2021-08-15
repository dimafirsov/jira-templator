import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { STORAGE_NAME } from '../../../constants';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { IIssueType, IJTStorage } from '../../../type';

@Component({
    selector: 'jit-settings-issue-template-form',
    templateUrl: './settings-issue-template-form.component.html',
    styleUrls: ['./settings-issue-template-form.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsIssueTemplateFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() currentIssueType!: string;

    public formArray: FormArray = new FormArray([]);

    private destroy$: Subject<any> = new Subject();
    private destroyControls$: Subject<any> = new Subject();

    @ViewChild('templateContainer') public templateContainer!: ElementRef<HTMLDivElement>;

    constructor(private formBuilder: FormBuilder,
                private storage: StorageService,
                private cdRef: ChangeDetectorRef,
                public settings: SettingsService) {

                    // this.storage.loadStorage();
                    // this.setControls();
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.currentIssueType) {
            this.updateControls();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getControls(): FormGroup[] {
        if (!this.formArray.controls.length) {
            this.updateControls();
        }
        return this.formArray.controls as FormGroup[];
    }

    public setControls(): void {
        this.destroyControls$.next();
        this.formArray.clear();

        this.storage.storage$.value?.issueTypes[this.currentIssueType]?.forEach((property, i) => {
            this.formArray.push(
                this.formBuilder.group({
                    selectors: [property.selectors, Validators.required],
                    template: [property.template, Validators.required],
                    title: [property.title],
                })
            );
        });

        this.formArray.updateValueAndValidity();
    }

    public updateControls(): void {
        this.setControls();
        this.subscribeToControls();
    }

    public addNewFormData(): void {
        const newValue = this.storage.storage$.value;
        newValue?.issueTypes[this.currentIssueType].push({
            selectors: [],
            template: 'new template',
            title: 'new title',
        });
        this.storage.storage$.next(newValue);
        this.storage.setStorage({ ...newValue });

        this.updateControls();
    }

    public removeForm(id: number): void {
        this.formArray.removeAt(id);

        const newValue = this.storage.storage$.value;
        newValue?.issueTypes[this.currentIssueType].splice(id, 1);
        this.storage.storage$.next(newValue);
        this.storage.setStorage({ ...newValue });
    }

    private subscribeToControls(): void {
        this.formArray.controls.forEach((control, i) => {
            control.valueChanges
                .pipe(
                    distinctUntilChanged(),
                    tap((value: IIssueType) => {
                        const state = this.storage.storage$.value as IJTStorage;
                        console.log('>>> value', value);
                        if (state) {
                            const currentTypeArray = state.issueTypes[this.currentIssueType];
                            currentTypeArray[i] = {...value, title: currentTypeArray[i].title};

                            this.storage.setStorage({...state});
                        }

                    }),
                    takeUntil(this.destroyControls$)
                )
                .subscribe();
        });
    }
}

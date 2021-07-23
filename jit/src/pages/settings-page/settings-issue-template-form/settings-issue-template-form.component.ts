import {
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
import { IJTStorage } from '../../../type';

@Component({
    selector: 'jit-settings-issue-template-form',
    templateUrl: './settings-issue-template-form.component.html',
    styleUrls: ['./settings-issue-template-form.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsIssueTemplateFormComponent implements OnInit, OnChanges, OnDestroy {
    @Input() currentIssueType!: string;

    public formArray: FormArray = new FormArray([]);

    private destroy$: Subject<any> = new Subject();

    @ViewChild('templateContainer') public templateContainer!: ElementRef<HTMLDivElement>;

    constructor(private formBuilder: FormBuilder,
                private storage: StorageService,
                private cdRef: ChangeDetectorRef,
                public settings: SettingsService) {

        this.formArray.push(
            this.formBuilder.group({
                selectors: ['selector!', Validators.required],
                template: ['template!', Validators.required],
                title: ['title!', Validators.required],
            })
        );
    }

    ngOnInit(): void {
        this.getControls().forEach((control, i) => {
            control.valueChanges
                    .pipe(
                        distinctUntilChanged(),
                        tap(value => {
                            const state = this.storage.storage$.value as IJTStorage;
                            console.log('>>> value', value);
                            if (state) {
                                const currentTypeArray = state.issueTypes[this.currentIssueType];
                                currentTypeArray[i] = {...value};

                                this.storage.setStorage({...state});
                            }

                        }),
                        takeUntil(this.destroy$)
                    )
                    .subscribe();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.currentIssueType && !changes?.currentIssueType.firstChange) {
            // this.form.get('selector')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType]?.selectors.toString());
            // this.form.get('template')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType]?.template.toString());
            this.getControls().forEach((group, i) => {
                group.get('selectors')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType][i]?.selectors.toString());
                group.get('template')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType][i]?.template);
                group.get('title')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType][i]?.title);
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getRows(element: HTMLDivElement): number {
        return Math.ceil(+getComputedStyle(element).height.slice(0, -2) / 30);
    }

    public getControls(): FormGroup[] {
        return this.formArray.controls as FormGroup[];
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
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

    public form: FormGroup;

    private destroy$: Subject<any> = new Subject();

    @ViewChild('templateContainer') public templateContainer!: ElementRef<HTMLDivElement>;

    constructor(private formBuilder: FormBuilder,
                private storage: StorageService,
                private cdRef: ChangeDetectorRef,
                private settings: SettingsService) {
        this.form = this.formBuilder.group({
            selector: ['selector!', Validators.required],
            template: ['template!', Validators.required],
        });
    }

    ngOnInit(): void {
        this.form.get('template')?.valueChanges
            .pipe(
                tap(value => {
                    const state = this.storage.storage$.value as IJTStorage;
                    if (state) {
                        state.issueTypes[this.settings.currentIssueType$.value].template = value;
                        this.storage.setStorage({...state});
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.form.get('selector')?.valueChanges
            .pipe(
                tap(value => {
                    const state = this.storage.storage$.value as IJTStorage;
                    state.issueTypes[this.settings.currentIssueType$.value].selectors = value;
                    this.storage.setStorage({...state});
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.currentIssueType && !changes?.currentIssueType.firstChange) {
            this.form.get('selector')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType]?.selectors.toString());
            this.form.get('template')?.setValue(this.storage.storage$.value?.issueTypes[this.currentIssueType]?.template.toString());
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getRows(element: HTMLDivElement): number {
        return Math.ceil(+getComputedStyle(element).height.slice(0, -2) / 30);
    }
}

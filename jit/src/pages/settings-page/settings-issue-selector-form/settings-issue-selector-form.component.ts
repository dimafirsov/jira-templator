import { AfterViewInit, Component, Inject, Input, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { STORAGE_NAME } from '../../../constants';
import { StorageService } from '../../../services/storage.service';
import { IJTStorage } from '../../../type';
import { FORM_CONTROL_CONFIG } from '../constants';
import { FormControlConfig, IFormControlConfig, ControlTypes } from '../types';

@Component({
  selector: 'jit-settings-issue-selector-form',
  templateUrl: './settings-issue-selector-form.component.html',
  styleUrls: ['./settings-issue-selector-form.component.scss'],
})
export class SettingsIssueSelectorFormComponent implements OnInit, AfterViewInit {
    public settingsForm!: FormGroup;

    private destroy$: Subject<any> = new Subject();

    public formControlConfigKeys: IFormControlConfig[] = [];

    constructor(
        @SkipSelf() @Inject(FORM_CONTROL_CONFIG) public controlConfig: FormControlConfig,
        public storage: StorageService,
        private formBuilder: FormBuilder,
    ) {
        this.formControlConfigKeys = Object.keys(this.controlConfig).map(key => this.controlConfig[key as ControlTypes]);
    }

    ngOnInit(): void {
        this.settingsForm = this.formBuilder.group({
            [this.controlConfig.GlobalTrigger.name]: [
                this.storage.current$.value.globalTriggerSelector || this.controlConfig.GlobalTrigger.defaultValue,
                Validators.required],
            [this.controlConfig.LoadTimeout.name]: [
                this.storage.current$.value.loadTimeout || this.controlConfig.LoadTimeout.defaultValue],
            [this.controlConfig.IssueTypeSelector.name]: [
                this.storage.current$.value.issueTypeSelector || this.controlConfig.IssueTypeSelector.defaultValue,
                Validators.required],
        });

        this.settingsForm.valueChanges
            .pipe(
                tap(data => {
                    this.storage.getStorage(STORAGE_NAME, (d: IJTStorage) => {
                        this.storage.setStorage({
                            ...d,
                            globalTriggerSelector: data[this.controlConfig.GlobalTrigger.name],
                            loadTimeout: data[this.controlConfig.LoadTimeout.name],
                            issueTypeSelector: data[this.controlConfig.IssueTypeSelector.name],
                        } as IJTStorage);
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this.storage.getStorage(STORAGE_NAME, (data: IJTStorage) => {
            this.settingsForm.setValue({
                [this.controlConfig.GlobalTrigger.name]: data.globalTriggerSelector || this.controlConfig.GlobalTrigger.defaultValue,
                [this.controlConfig.LoadTimeout.name]: data.loadTimeout || this.controlConfig.LoadTimeout.defaultValue,
                [this.controlConfig.IssueTypeSelector.name]: data.issueTypeSelector || this.controlConfig.IssueTypeSelector.defaultValue,
            });
        });
    }

}

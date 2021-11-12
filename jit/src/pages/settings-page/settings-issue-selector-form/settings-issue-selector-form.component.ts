import { Component, Inject, Input, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FORM_CONTROL_CONFIG } from '../constants';
import { FormControlConfig, IFormControlConfig, ControlTypes } from '../types';

@Component({
  selector: 'jit-settings-issue-selector-form',
  templateUrl: './settings-issue-selector-form.component.html',
  styleUrls: ['./settings-issue-selector-form.component.scss'],
})
export class SettingsIssueSelectorFormComponent implements OnInit {
    @Input() public form!: FormGroup;

    public formControlConfigKeys: IFormControlConfig[] = [];

    constructor(@SkipSelf() @Inject(FORM_CONTROL_CONFIG) public formControlConfig: FormControlConfig) { }

    ngOnInit(): void {
        this.formControlConfigKeys = Object.keys(this.formControlConfig).map(key => this.formControlConfig[key as ControlTypes]);
    }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TEMPLATE } from '../constants';
import { ISettingsTabUtils } from '../pages/settings-page/types';
import { IIssueType } from '../type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    public currentIssueType$: BehaviorSubject<string> = new BehaviorSubject<string>('Bug');
    public currentIssue$: BehaviorSubject<Array<IIssueType>> = new BehaviorSubject<Array<IIssueType>>(DEFAULT_TEMPLATE.issueTypes.Bug);
    public issueTypeEditEnabled = false;
    public currentGlobalTriggerSelectorValue = '';
    public utilsTab: ISettingsTabUtils = {
        clearStorage: false,
        getStorage: false,
    };

    constructor() { }
}

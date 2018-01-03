import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TEMPLATE } from '../constants';
import { IIssueType } from '../type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    public currentIssueType$: BehaviorSubject<string> = new BehaviorSubject<string>('Bug');
    public currentIssue$: BehaviorSubject<Array<IIssueType>> = new BehaviorSubject<Array<IIssueType>>({...DEFAULT_TEMPLATE}.issueTypes.Bug);
    public issueTypeEditEnabled = false;
    public currentGlobalTriggerSelectorValue = '';

    constructor() { }
}

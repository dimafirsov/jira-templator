import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    public currentIssueType$: BehaviorSubject<string> = new BehaviorSubject<string>('Bug');
    public issueTypeEditEnabled = false;

    constructor() { }
}

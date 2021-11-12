import { InjectionToken } from '@angular/core';
import { FormControlConfig } from './types';

export const formControlConfig: FormControlConfig = {
        GlobalTrigger: {
            name: 'globalTriggerSelector',
            defaultValue: '#createGlobalItem',
            hint: 'Selector of the component which allows for creating issues on interaction',
            label: 'Global Trigger selector',
        },
        LoadTimeout: {
            name: 'loadTimeout',
            defaultValue: 2700,
            hint: 'Sets the timeout before applying event listeners. Usually needed to wait until all critical elements are loaded and their selectors are set in stone',
            label: 'Load Timeout',
        },
        IssueTypeSelector: {
            name: 'issueTypeSelector',
            defaultValue: '#issuetype-field',
            hint: 'The selector defines an input holding the information about the current issue type',
            label: 'Issue Type Selector',
        }
    };

export const FORM_CONTROL_CONFIG = new InjectionToken<FormControlConfig>('form-control-config');

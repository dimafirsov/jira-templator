import { InjectionToken } from '@angular/core';
import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form/settings-issue-selector-form.component';
import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form/settings-issue-template-form.component';
import { SettingsTemplateTabComponent } from './settings-template-tab/settings-template-tab.component';
import { FormControlConfig, ITabsContent } from './types';

export const FORM_CONTROL_CONFIG = new InjectionToken<FormControlConfig>('form-control-config');
export const TABS_CONTENT = new InjectionToken<ITabsContent[]>('tabs-config');

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

export const tabsContent: ITabsContent[] = [
    {
        id: 'tab-general',
        title: `General`,
        component: SettingsIssueSelectorFormComponent,
        icon: {
            name: 'check',
            inactiveColor: 'gray',
            activeColor: 'black',
        },
    },
    {
        id: 'tab-template',
        title: `Template`,
        component: SettingsTemplateTabComponent,
        icon: {
            name: 'gear',
            inactiveColor: 'gray',
            activeColor: 'black',
        },
    },
    // {
    //     id: 'tab-about',
    //     title: `About`,
    //     icon: {
    //         name: 'add',
    //         inactiveColor: 'gray',
    //         activeColor: 'black',
    //     },
    // }
];

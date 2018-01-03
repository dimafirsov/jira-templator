import { DEFAULT_TEMPLATE } from '../../constants';
import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form/settings-issue-selector-form.component';
import { SettingsTemplateTabComponent } from './settings-template-tab/settings-template-tab.component';
import { SettingsUtilsTabComponent } from './settings-utils-tab/settings-utils-tab.component';
import { FormControlConfig, ITabsContent } from './types';

export const formControlConfig: FormControlConfig = {
        GlobalTrigger: {
            name: 'globalTriggerSelector',
            defaultValue: DEFAULT_TEMPLATE.globalTriggerSelector,
            hint: 'Selector of the component which allows for creating issues on interaction',
            label: 'Global Trigger selector',
        },
        LoadTimeout: {
            name: 'loadTimeout',
            defaultValue: DEFAULT_TEMPLATE.loadTimeout,
            hint: 'Sets the timeout before applying event listeners. Usually needed to wait until all critical elements are loaded and their selectors are set in stone',
            label: 'Load Timeout',
        },
        IssueTypeSelector: {
            name: 'issueTypeSelector',
            defaultValue: DEFAULT_TEMPLATE.issueTypeSelector,
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
            name: 'edit',
            inactiveColor: 'gray',
            activeColor: 'black',
        },
    },
    {
        id: 'tab-utils',
        title: `Utils`,
        component: SettingsUtilsTabComponent,
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

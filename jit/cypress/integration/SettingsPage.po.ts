

export class SettingsPagePo {
    public static page = {
        tab: {
            el: 'nui-tab-heading',
            general: {
                label: 'General',
                globalTrigger: 'nui-form-field[ng-reflect-caption="Global Trigger selector"] input',
                globalTriggerDefaultText: '#createGlobalItem',
                globalTriggerResetButton: 'nui-form-field[ng-reflect-caption="Global Trigger selector"] button[icon=reset]',
                loadTimeout: 'nui-form-field[ng-reflect-caption="Load Timeout"] input',
                loadTimeoutDefaultText: '2700',
                loadTimeoutResetButton: 'nui-form-field[ng-reflect-caption="Load Timeout"] button[icon=reset]',
                issueTypeSelector: 'nui-form-field[ng-reflect-caption="Issue Type Selector"] input',
                issueTypeSelectorDefaultText: '#issuetype-field',
                issueTypeSelectorResetButton: 'nui-form-field[ng-reflect-caption="Issue Type Selector"] button[icon=reset]',

            },
            template: {
                label: 'Template',
            },
            utils: {
                label: 'Utils',
            },
        },
    };
}

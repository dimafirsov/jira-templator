import { ComponentType } from '@angular/cdk/portal';

export type ControlTypes = 'GlobalTrigger' | 'LoadTimeout' | 'IssueTypeSelector';

export interface IFormControlConfig {
    name: string;
    defaultValue: string | number | boolean;
    hint: string;
    label: string;
}

export interface ITabsContent {
    id: string;
    title: string;
    component: ComponentType<any>;
    icon: ITabsContentIcon;
}

export interface ITabsContentIcon {
    name: string;
    inactiveColor: string;
    activeColor: string;
}

export type FormControlConfig = Record<ControlTypes, IFormControlConfig>;

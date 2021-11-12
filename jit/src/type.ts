import { ComponentType } from '@angular/cdk/portal';

export interface IDynamicConfigurable {
    component: ComponentType<any>;
    config: Record<string, any>;
}

export interface IJTStorage {
    issueTypes: Record<string, Array<IIssueType>>;
    globalTriggerSelector: string;
    loadTimeout?: number;
    issueTypeSelector: string;
}

export interface IIssueType {
    selectors: string[];
    template: string;
    title: string;
}

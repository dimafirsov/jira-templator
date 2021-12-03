import { ComponentType } from '@angular/cdk/portal';

export interface IDynamicConfigurable {
    component: ComponentType<any>;
    config: Record<string, any>;
}

export interface IJTStorage {
    issueTypes: Record<string, Array<IIssueType>>;
    globalTriggerSelector: string;
    loadTimeout: number;
    issueTypeSelector: string;
    mainPage?: IMainPage;
    showReadyMessage: boolean;
}

export interface IIssueType {
    selectors: string[];
    template: string;
    title: string;
}

export interface IMainPageQuickAccess {
    clearStorage?: boolean;
    getStorage?: boolean;
    importConfig?: boolean;
    exportConfig?: boolean;
    showReadyMessage?: boolean;
}

export interface IMainPage {
    quickAccess: IMainPageQuickAccess;
}

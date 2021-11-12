
export type ControlTypes = 'GlobalTrigger' | 'LoadTimeout' | 'IssueTypeSelector';

export interface IFormControlConfig {
    name: string;
    defaultValue: string | number | boolean;
    hint: string;
    label: string;
}

export type FormControlConfig = Record<ControlTypes, IFormControlConfig>;

import { ComponentType } from '@angular/cdk/portal';

export interface IDynamicConfigurable {
    component: ComponentType<any>;
    config: Record<string, any>;
}

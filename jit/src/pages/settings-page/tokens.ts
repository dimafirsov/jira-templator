import { InjectionToken } from '@angular/core';
import { FormControlConfig, ITabsContent } from './types';

export const FORM_CONTROL_CONFIG = new InjectionToken<FormControlConfig>('form-control-config');
export const TABS_CONTENT = new InjectionToken<ITabsContent[]>('tabs-config');

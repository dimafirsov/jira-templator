import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibModule } from '../lib/lib.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsIssueItemComponent } from './settings-page/settings-issue-item/settings-issue-item.component';
import { SettingsIssueTemplateFormComponent } from './settings-page/settings-issue-template-form/settings-issue-template-form.component';
import {
    NuiButtonModule,
    NuiCheckboxModule,
    NuiFormFieldModule,
    NuiIconModule,
    NuiSwitchModule,
    NuiTabsModule,
    NuiTextboxModule,
    NuiToastModule,
    NuiTooltipModule,
    ToastService
} from '@nova-ui/bits';
import { SettingsIssueSelectorFormComponent } from './settings-page/settings-issue-selector-form/settings-issue-selector-form.component';
import { SettingsTemplateTabComponent } from './settings-page/settings-template-tab/settings-template-tab.component';
import { SettingsUtilsTabComponent } from './settings-page/settings-utils-tab/settings-utils-tab.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SettingsPageComponent,
    SettingsIssueItemComponent,
    SettingsIssueTemplateFormComponent,
    SettingsIssueSelectorFormComponent,
    SettingsTemplateTabComponent,
    SettingsUtilsTabComponent,
  ],
  imports: [
      LibModule,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      NuiButtonModule,
      NuiCheckboxModule,
      NuiIconModule,
      NuiTooltipModule,
      NuiFormFieldModule,
      NuiTextboxModule,
      NuiTabsModule,
      NuiToastModule,
      NuiSwitchModule,
  ],
  exports: [
    MainPageComponent,
    SettingsPageComponent,
    CommonModule,
    LibModule,
  ],
  providers: [ToastService],
})
export class PagesModule { }

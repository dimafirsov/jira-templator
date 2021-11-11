import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibModule } from '../lib/lib.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsIssueItemComponent } from './settings-page/settings-issue-item/settings-issue-item.component';
import { SettingsIssueTemplateFormComponent } from './settings-page/settings-issue-template-form/settings-issue-template-form.component';
import { NuiButtonModule, NuiCheckboxModule, NuiFormFieldModule, NuiIconModule, NuiTextboxModule, NuiTooltipModule } from '@nova-ui/bits';

@NgModule({
  declarations: [
    MainPageComponent,
    SettingsPageComponent,
    SettingsIssueItemComponent,
    SettingsIssueTemplateFormComponent,
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
  ],
  exports: [
    MainPageComponent,
    SettingsPageComponent,
    CommonModule,
    LibModule,
  ],
  providers: [],
})
export class PagesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibModule } from '../lib/lib.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsIssueItemComponent } from './settings-page/settings-issue-item/settings-issue-item.component';
import { SettingsIssueTemplateFormComponent } from './settings-page/settings-issue-template-form/settings-issue-template-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

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

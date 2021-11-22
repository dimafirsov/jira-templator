import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    NuiButtonModule,
    NuiCheckboxModule,
    NuiIconModule,
    NuiTooltipModule,
    NuiFormFieldModule,
    NuiTextboxModule,
    NuiTabsModule,
    NuiToastModule,
    NuiSwitchModule
} from '@nova-ui/bits';
import { LibModule } from '../../lib/lib.module';
import { formControlConfig, tabsContent } from './constants';
import { SettingsIssueItemComponent } from './settings-issue-item/settings-issue-item.component';
import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form/settings-issue-selector-form.component';
import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form/settings-issue-template-form.component';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsTemplateTabComponent } from './settings-template-tab/settings-template-tab.component';
import { SettingsUtilsTabComponent } from './settings-utils-tab/settings-utils-tab.component';
import { FORM_CONTROL_CONFIG, TABS_CONTENT } from './tokens';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
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
      providers: [
        {
            provide: FORM_CONTROL_CONFIG,
            useValue: formControlConfig,
        },
        {
            provide: TABS_CONTENT,
            useValue: tabsContent,
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

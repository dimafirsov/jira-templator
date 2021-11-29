import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
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
        ChangeDetectorRef,
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

  describe('when settings tab is changed,', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = spyOn(component, 'loadComponentForTab');
        component.ngOnInit();
        component.ngAfterViewInit();
      });

      it('should create SettingsIssueSelectorFormComponent by default', () => {
          expect(spy).toHaveBeenCalledWith(SettingsIssueSelectorFormComponent);
      });

      it('should set the current tab ref to SettingsIssueSelectorFormComponent by default', () => {
          expect(component.currentTabRef.componentType).toEqual(SettingsIssueSelectorFormComponent);
      });

      it('should create nothing if falsy argument was passed', () => {
          component.loadComponentForTab();
          expect(component.currentTabRef.componentType.name).toEqual(SettingsIssueSelectorFormComponent.name);
      });

      it('should create SettingsUtilsTabComponent page if expected argument is passed in', () => {
          fixture.whenStable().then(() => {
              component.loadComponentForTab(SettingsUtilsTabComponent);
              expect(component.currentTabRef.componentType.name).toEqual(SettingsUtilsTabComponent.name);
          });
      });

      it('should create SettingsTemplateTabComponent page if expected argument is passed in', () => {
          fixture.whenStable().then(() => {
              component.loadComponentForTab(SettingsTemplateTabComponent);
              expect(component.currentTabRef.componentType.name).toEqual(SettingsTemplateTabComponent.name);
          });
      });
  });

  it('When item is selected notify settings with the currect issue type', () => {
      const spy = spyOn(component.settings.currentIssueType$, 'next');
      component.selectItem('item');
      expect(spy).toHaveBeenCalledWith('item');
  });
});

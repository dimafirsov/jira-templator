import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NuiCheckboxModule, NuiIconModule, NuiSwitchModule, NuiTextboxModule, ToastService } from '@nova-ui/bits';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { SettingsIssueItemComponent } from '../settings-issue-item/settings-issue-item.component';
import { SettingsIssueTemplateFormComponent } from '../settings-issue-template-form/settings-issue-template-form.component';

import { SettingsTemplateTabComponent } from './settings-template-tab.component';

describe('SettingsTemplateTabComponent', () => {
  let component: SettingsTemplateTabComponent;
  let fixture: ComponentFixture<SettingsTemplateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
          SettingsTemplateTabComponent,
          SettingsIssueItemComponent,
          SettingsIssueTemplateFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NuiCheckboxModule,
        NuiIconModule,
        NuiTextboxModule,
      ],
      providers: [
          ToastService,
          SettingsService,
          StorageService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTemplateTabComponent);
    component = fixture.componentInstance;
    component.issueTypes = ['Bug', 'Story', 'Task', 'Epic'];
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NuiIconModule } from '@nova-ui/bits';

import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form.component';

describe('SettingsIssueTemplateFormComponent', () => {
  let component: SettingsIssueTemplateFormComponent;
  let fixture: ComponentFixture<SettingsIssueTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIssueTemplateFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NuiIconModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIssueTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

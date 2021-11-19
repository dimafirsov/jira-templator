import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIssueTemplateFormComponent } from './settings-issue-template-form.component';

describe('SettingsIssueTemplateFormComponent', () => {
  let component: SettingsIssueTemplateFormComponent;
  let fixture: ComponentFixture<SettingsIssueTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIssueTemplateFormComponent ]
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

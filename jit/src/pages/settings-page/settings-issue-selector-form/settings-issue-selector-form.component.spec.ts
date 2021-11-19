import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form.component';

describe('SettingsIssueSelectorFormComponent', () => {
  let component: SettingsIssueSelectorFormComponent;
  let fixture: ComponentFixture<SettingsIssueSelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIssueSelectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIssueSelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

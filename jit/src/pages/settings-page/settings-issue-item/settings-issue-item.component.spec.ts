import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIssueItemComponent } from './settings-issue-item.component';

describe('SettingsIssueItemComponent', () => {
  let component: SettingsIssueItemComponent;
  let fixture: ComponentFixture<SettingsIssueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIssueItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

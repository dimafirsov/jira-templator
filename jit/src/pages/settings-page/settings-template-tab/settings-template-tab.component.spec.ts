import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTemplateTabComponent } from './settings-template-tab.component';

describe('SettingsTemplateTabComponent', () => {
  let component: SettingsTemplateTabComponent;
  let fixture: ComponentFixture<SettingsTemplateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTemplateTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTemplateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

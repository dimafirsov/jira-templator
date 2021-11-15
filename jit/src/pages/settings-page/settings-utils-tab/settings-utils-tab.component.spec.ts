import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUtilsTabComponent } from './settings-utils-tab.component';

describe('SettingsUtilsTabComponent', () => {
  let component: SettingsUtilsTabComponent;
  let fixture: ComponentFixture<SettingsUtilsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsUtilsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUtilsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

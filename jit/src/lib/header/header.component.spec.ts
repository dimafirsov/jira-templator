import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuiButtonModule, NuiIconModule } from '@nova-ui/bits';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SettingsPageComponent } from '../../pages/settings-page/settings-page.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
          NuiButtonModule,
          NuiIconModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openSettings() call the Settings component', () => {
      const spy = spyOn(component.pageService.mainPage$, 'next');

      component.openSettings();

      expect(spy).toHaveBeenCalledWith(SettingsPageComponent);
  });

  it('should goHome() call the Main page component', () => {
      const spy = spyOn(component.pageService.mainPage$, 'next');

      component.goHome();

      expect(spy).toHaveBeenCalledWith(MainPageComponent);
  });
});

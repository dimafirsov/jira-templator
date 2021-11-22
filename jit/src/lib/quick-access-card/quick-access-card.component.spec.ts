import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuiButtonModule } from '@nova-ui/bits';
import { DEFAULT_TEMPLATE } from '../../constants';
import { SettingsPageComponent } from '../../pages/settings-page/settings-page.component';

import { QuickAccessCardComponent } from './quick-access-card.component';

describe('QuickAccessCardComponent', () => {
  let component: QuickAccessCardComponent;
  let fixture: ComponentFixture<QuickAccessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickAccessCardComponent ],
      imports: [
          NuiButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hasQuickAccessItems be false if no items supplied to the input', () => {
    component.storage.current$.next({...DEFAULT_TEMPLATE});
    expect(component.hasQuickAccessItems).toBe(false);
  });

  it('should hasQuickAccessItems be true if at least one item is supplied to the input', () => {
      component.storage.current$.next({...DEFAULT_TEMPLATE, mainPage: {
          quickAccess: {
              clearStorage: true,
          }
      }});
      expect(component.hasQuickAccessItems).toBe(true);
  });

  it('should hasQuickAccessItems be true if all items are supplied to the input', () => {
      component.storage.current$.next({...DEFAULT_TEMPLATE, mainPage: {
          quickAccess: {
              clearStorage: true,
              exportConfig: true,
              getStorage: true,
              importConfig: true,
          }
      }});
      expect(component.hasQuickAccessItems).toBe(true);
  });

  it('should navigate to Settings page', () => {
      const spy = spyOn(component.pageService.mainPage$, 'next');
      component.navigateToSettingsPage();
      expect(spy).toHaveBeenCalledOnceWith(SettingsPageComponent);
  });
});

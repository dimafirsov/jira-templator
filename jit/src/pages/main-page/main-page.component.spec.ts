import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NuiButtonModule, NuiIconModule } from '@nova-ui/bits';
import { LibModule } from '../../lib/lib.module';
import { QuickAccessCardComponent } from '../../lib/quick-access-card/quick-access-card.component';
import { WhatsNewCardComponent } from '../../lib/whats-new-card/whats-new-card.component';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
          MainPageComponent,
      ],
      imports: [
          LibModule,
          NuiIconModule,
          NuiButtonModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create WhatsNewCardComponent', () => {
    const whatsNewComp = fixture.debugElement.query(By.directive(WhatsNewCardComponent));
    expect(whatsNewComp).toBeTruthy();
  });

  it('should create QuickAccessCardComponent', () => {
    const quickAccessComp = fixture.debugElement.query(By.directive(QuickAccessCardComponent));
    expect(quickAccessComp).toBeTruthy();
  });
});

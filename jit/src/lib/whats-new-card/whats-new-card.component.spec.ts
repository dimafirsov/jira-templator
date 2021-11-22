import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuiIconModule } from '@nova-ui/bits';

import { WhatsNewCardComponent } from './whats-new-card.component';

describe('WhatsNewCardComponent', () => {
  let component: WhatsNewCardComponent;
  let fixture: ComponentFixture<WhatsNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNewCardComponent ],
      imports: [
          NuiIconModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the whats new card on close', () => {
      component.closeWhatsNew();

      expect(component.showCloseIcon).toBe(false);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuiButtonModule, NuiIconModule } from '@nova-ui/bits';
import { LibModule } from '../../lib/lib.module';

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
});

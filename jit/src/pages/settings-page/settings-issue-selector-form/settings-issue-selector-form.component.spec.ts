import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NuiButtonModule, NuiFormFieldModule, NuiIconModule, NuiTextboxModule } from '@nova-ui/bits';
import { StorageService } from '../../../services/storage.service';
import { formControlConfig } from '../constants';
import { FORM_CONTROL_CONFIG } from '../tokens';

import { SettingsIssueSelectorFormComponent } from './settings-issue-selector-form.component';

describe('SettingsIssueSelectorFormComponent', () => {
  let component: SettingsIssueSelectorFormComponent;
  let fixture: ComponentFixture<SettingsIssueSelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsIssueSelectorFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NuiButtonModule,
        NuiTextboxModule,
        NuiFormFieldModule,
        NuiIconModule,
      ],
      providers: [
        {
            provide: FORM_CONTROL_CONFIG,
            useValue: formControlConfig,
        },
        StorageService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIssueSelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});

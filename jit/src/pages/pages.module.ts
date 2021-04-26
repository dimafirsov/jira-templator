import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibModule } from '../lib/lib.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SettingsPageComponent,
  ],
  imports: [
      LibModule,
      CommonModule,
  ],
  exports: [
    MainPageComponent,
    SettingsPageComponent,
    CommonModule,
    LibModule,
  ],
  providers: [],
})
export class PagesModule { }

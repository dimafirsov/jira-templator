import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { QuickAccessCardComponent } from './quick-access-card/quick-access-card.component';
import { WhatsNewCardComponent } from './whats-new-card/whats-new-card.component';
import { NuiButtonModule, NuiIconModule, NuiTooltipModule } from '@nova-ui/bits';

@NgModule({
  declarations: [
    HeaderComponent,
    QuickAccessCardComponent,
    WhatsNewCardComponent,
  ],
  imports: [
      CommonModule,
      NuiButtonModule,
      NuiIconModule,
      NuiTooltipModule,
  ],
  exports: [
    HeaderComponent,
    WhatsNewCardComponent,
    QuickAccessCardComponent,
  ],
  providers: [],
})
export class LibModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { QuickAccessCardComponent } from './quick-access-card/quick-access-card.component';
import { WhatsNewCardComponent } from './whats-new-card/whats-new-card.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    QuickAccessCardComponent,
    WhatsNewCardComponent,
    ToastComponent,
  ],
  imports: [
      CommonModule,
  ],
  exports: [
    HeaderComponent,
    LayoutComponent,
    WhatsNewCardComponent,
    QuickAccessCardComponent,
    ToastComponent,
  ],
  providers: [],
})
export class LibModule { }

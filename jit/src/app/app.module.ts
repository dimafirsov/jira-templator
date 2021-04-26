import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { PagesModule } from '../pages/pages.module';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageService } from '../services/page.service';
import { ViewRefDirective } from '../directives/view-ref.directive';

@NgModule({
    declarations: [
        AppComponent,
        ViewRefDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PortalModule,
        PagesModule,
    ],
    providers: [PageService],
    bootstrap: [AppComponent]
})
export class AppModule { }

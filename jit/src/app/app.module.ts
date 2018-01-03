import { NgModule, TRANSLATIONS, MissingTranslationStrategy, TRANSLATIONS_FORMAT } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from '../pages/pages.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageService } from '../services/page.service';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        ViewRefDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        BrowserAnimationsModule,
    ],
    providers: [PageService, {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}, {provide: TRANSLATIONS, useValue: ''}, ],
    bootstrap: [AppComponent]
})
export class AppModule { }

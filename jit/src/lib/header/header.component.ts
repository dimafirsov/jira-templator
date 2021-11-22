import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SettingsPageComponent } from '../../pages/settings-page/settings-page.component';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'jit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public pageService: PageService) { }

    ngOnInit(): void {
    }

    public openSettings(): void {
        this.pageService.mainPage$.next(SettingsPageComponent);
    }

    public goHome(): void {
        this.pageService.mainPage$.next(MainPageComponent);
    }

}

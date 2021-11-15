import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'jit-quick-access-card',
  templateUrl: './quick-access-card.component.html',
  styleUrls: ['./quick-access-card.component.scss']
})
export class QuickAccessCardComponent implements OnInit {

    constructor(public settings: SettingsService) { }

    ngOnInit(): void {
    }

}

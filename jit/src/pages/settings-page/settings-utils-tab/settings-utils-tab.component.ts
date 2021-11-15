import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { ISettingsTabUtils } from '../types';

@Component({
    selector: 'jit-settings-utils-tab',
    templateUrl: './settings-utils-tab.component.html',
    styleUrls: ['./settings-utils-tab.component.scss']
})
export class SettingsUtilsTabComponent {
    public state = false;
    public message = 'Add';
    public currentOptionId!: keyof ISettingsTabUtils;

    constructor(public storage: StorageService, public settings: SettingsService) { }

    public onValueChanged(value: boolean, el: Element): void {
        this.currentOptionId = el.getAttribute('id') as keyof ISettingsTabUtils;
        if (this.currentOptionId) {
            this.settings.utilsTab[this.currentOptionId] = value;
            this.message = this.settings.utilsTab[this.currentOptionId] ? 'Added' : 'Add';
        }
        console.log(this.settings.utilsTab);
    }

    public handleClick(el: Element): void {
        this.currentOptionId = el.getAttribute('id') as keyof ISettingsTabUtils;
    }
}

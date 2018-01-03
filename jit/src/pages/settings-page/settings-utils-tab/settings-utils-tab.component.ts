import { Component } from '@angular/core';
import { STORAGE_NAME } from '../../../constants';
import { FileService } from '../../../services/file.service';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { IJTStorage, IMainPageQuickAccess } from '../../../type';

@Component({
    selector: 'jit-settings-utils-tab',
    templateUrl: './settings-utils-tab.component.html',
    styleUrls: ['./settings-utils-tab.component.scss']
})
export class SettingsUtilsTabComponent {
    public state = false;
    public message = 'Add';
    public currentOptionId!: keyof IMainPageQuickAccess;

    constructor(
        public storage: StorageService,
        public settings: SettingsService,
        public file: FileService,
    ) { }

    public onValueChanged(value: boolean, el: Element): void {
        this.currentOptionId = el.getAttribute('id') as keyof IMainPageQuickAccess;
        if (this.currentOptionId) {
            this.storage.getStorage(STORAGE_NAME, (data: IJTStorage) => {
                this.storage.setStorage({
                    ...data,
                    mainPage: {
                        quickAccess: {
                            ...data.mainPage?.quickAccess,
                            [this.currentOptionId]: value,
                        },
                    }
                } as IJTStorage);
            });
            this.message = this.storage.current$.value.mainPage?.quickAccess[this.currentOptionId] ? 'Added' : 'Add';
        }
    }

    public handleClick(el: Element): void {
        this.currentOptionId = el.getAttribute('id') as keyof IMainPageQuickAccess;
    }
}

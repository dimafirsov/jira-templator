import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'jit-settings-issue-item',
  templateUrl: './settings-issue-item.component.html',
  styleUrls: ['./settings-issue-item.component.scss']
})
export class SettingsIssueItemComponent implements OnInit {

    @Input() public type!: string;
    @Input() public active!: boolean;
    @Input() public editable!: boolean;
    @Input() public showOptions = true;

    private newType!: string;

    constructor(private storage: StorageService, private settings: SettingsService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    public handleInputChange(event: any): void {
        this.newType = event.target.value;
    }

    public async handleEdit(): Promise<void> {
        if (this.editable) {
            const currentState = this.storage.storage$.value;

            if (this.newType && this.type !== this.newType && !currentState?.issueTypes[this.newType]) {
                Object.defineProperty(
                    currentState?.issueTypes,
                    this.newType,
                    Object.getOwnPropertyDescriptor(currentState?.issueTypes, this.type) as PropertyDescriptor);

                delete currentState?.issueTypes[this.type];

                await this.storage.setStorage({ ...currentState });

                this.type = this.newType;
                this.settings.currentIssueType$.next(this.type);
            }
        }

        this.editable = !this.editable;
        this.cdRef.detectChanges();
    }

    public handleItemClick(): void {
        this.settings.currentIssueType$.next(this.newType || this.type);
        this.cdRef.detectChanges();
    }

    public removeIssueType(type: string): void {
        const current = this.storage.storage$.value;
        delete current?.issueTypes[type];

        this.storage.setStorage({ ...current });
    }

}

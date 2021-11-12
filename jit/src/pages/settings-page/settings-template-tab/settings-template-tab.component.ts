import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { ToastService } from '../../../services/toast.service';
import { SettingsIssueItemComponent } from '../settings-issue-item/settings-issue-item.component';

@Component({
    selector: 'jit-settings-template-tab',
    templateUrl: './settings-template-tab.component.html',
    styleUrls: ['./settings-template-tab.component.scss']
})
export class SettingsTemplateTabComponent implements OnInit, AfterViewInit {

    @Input() issueTypes: string[] = [];
    public showInput!: boolean;

    @ViewChild('newItemInput') public newItemInput!: ElementRef<HTMLInputElement>;
    @ViewChildren(SettingsIssueItemComponent) public issueTypeElements!: QueryList<SettingsIssueItemComponent>;

    constructor(
        public settings: SettingsService,
        public storage: StorageService,
        public toast: ToastService
    ) {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.issueTypeElements
            .toArray()
            .filter(item => item.type === this.settings.currentIssueType$.value)[0].active = true;
    }

    public addIssueType(): void {
        if (!this.newItemInput.nativeElement.value) {
            this.toast.showToast$.next({type: 'error', text: 'Can\'t create an issue with empty name!'});
            return;
        }
        if (this.newItemInput.nativeElement.value) {
            this.storage.setStorage({
                issueTypes: {
                    ...this.storage.current$.value?.issueTypes,
                    [this.newItemInput.nativeElement.value]: [
                        {
                            selectors: [],
                            template: 'new template',
                            title: 'new title',
                        }
                    ]
                },
            });
        }
    }

}

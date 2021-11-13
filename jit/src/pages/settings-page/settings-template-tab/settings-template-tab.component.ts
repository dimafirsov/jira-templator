import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IToastService, ToastService } from '@nova-ui/bits';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
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
        @Inject(ToastService) private toastService: IToastService,
        public settings: SettingsService,
        public storage: StorageService,
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
            this.toastService.error({title: 'Error', message: 'Can\'t create an issue with empty name!'});
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

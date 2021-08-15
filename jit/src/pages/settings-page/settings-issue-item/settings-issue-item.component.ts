import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_TEMPLATE } from '../../../constants';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { IIssueType } from '../../../type';

@Component({
  selector: 'jit-settings-issue-item',
  templateUrl: './settings-issue-item.component.html',
  styleUrls: ['./settings-issue-item.component.scss']
})
export class SettingsIssueItemComponent implements OnInit, OnDestroy {

    @Input() public type!: string;
    @Input() public property!: 'title';
    @Input() public active!: boolean;
    @Input() public editable!: boolean;
    @Input() public removable = true;
    @Input() public showOptions = true;
    @Input() public index = 0;

    public inputValue!: string;
    public currentIssueProperties: IIssueType = DEFAULT_TEMPLATE.issueTypes.Bug[this.index];

    private destroy$: Subject<any> = new Subject<any>();

    constructor(private storage: StorageService, private settings: SettingsService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.settings.currentIssue$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => this.currentIssueProperties = this.settings.currentIssue$.value[this.index]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public handleInputChange(event: any): void {
        this.inputValue = event.target.value;
    }

    public async handleEdit(): Promise<void> {
        if (this.editable) {
            const currentState = this.storage.storage$.value;

            if (this.inputValue && !currentState?.issueTypes[this.inputValue]) {

                if (this.type && this.type !== this.inputValue && !this.property) {
                    this.defineNewProperty(currentState?.issueTypes, this.inputValue, this.type);
                    delete currentState?.issueTypes[this.type];
                    this.type = this.inputValue;
                    this.settings.currentIssueType$.next(this.type);
                }

                if (this.property && this.property !== this.inputValue) {
                    currentState.issueTypes[this.type][this.index][this.property] = this.inputValue;
                    this.settings.currentIssue$.next(currentState.issueTypes[this.type].slice());
                }

                await this.storage.setStorage({ ...currentState });
            }
        }

        this.editable = !this.editable;
        this.cdRef.detectChanges();
    }

    public handleItemClick(): void {
        this.settings.currentIssueType$.next(this.inputValue || this.type);
        this.settings.currentIssue$.next(this.storage.storage$.value.issueTypes[this.inputValue || this.type]);
        this.cdRef.detectChanges();
    }

    public removeIssueType(type: string): void {
        const current = this.storage.storage$.value;
        delete current?.issueTypes[type];

        this.storage.setStorage({ ...current });
    }

    public get issueProperties(): IIssueType {
        console.log('>>>>> this.settings.currentIssue$.value[this.index]', this.settings.currentIssue$.value[this.index]);
        return this.settings.currentIssue$.value[this.index];
    }

    private defineNewProperty(obj: object | undefined, newProperty: string, oldProperty: string): void {
        if (!obj) {
            console.error('Can not define a new property, no object was set, ot its undefined');
            return;
        }
        Object.defineProperty(
            obj,
            newProperty,
            Object.getOwnPropertyDescriptor(obj, oldProperty) as PropertyDescriptor);
    }

}

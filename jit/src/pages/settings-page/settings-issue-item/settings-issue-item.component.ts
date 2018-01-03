import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DEFAULT_TEMPLATE } from '../../../constants';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';
import { IIssueType } from '../../../type';

@Component({
  selector: 'jit-settings-issue-item',
  templateUrl: './settings-issue-item.component.html',
  styleUrls: ['./settings-issue-item.component.scss']
})
export class SettingsIssueItemComponent implements OnChanges, OnInit, OnDestroy {

    @Input() public type!: string;
    @Input() public property!: 'title';
    @Input() public active!: boolean;
    @Input() public editable!: boolean;
    @Input() public removable = true;
    @Input() public showOptions = true;
    @Input() public index = 0;

    public inputValue!: string;
    public currentIssueProperties: IIssueType = {...DEFAULT_TEMPLATE}.issueTypes.Bug[this.index];

    private destroy$: Subject<any> = new Subject<any>();

    constructor(public storage: StorageService, public settings: SettingsService, private cdRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.showOptions && this.editable && !changes.showOptions.currentValue) {
            this.editable = !this.editable;
        }
    }

    ngOnInit(): void {
        this.settings.currentIssue$
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(value => {
                this.currentIssueProperties = value[this.index];
            });
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
            const currentState = this.storage.current$.value;

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
        this.settings.currentIssue$.next(this.storage.current$.value.issueTypes[this.inputValue || this.type].slice());
        this.cdRef.detectChanges();
    }

    public removeIssueType(type: string): void {
        const current = {...this.storage.current$.value};
        delete current?.issueTypes[type];

        this.storage.setStorage({ ...current });
    }

    public get issueProperties(): IIssueType {
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

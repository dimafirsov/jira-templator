import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DEFAULT_TEMPLATE } from '../../constants';
import { SettingsService } from '../../services/settings.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { IJTStorage } from '../../type';
import { SettingsIssueItemComponent } from './settings-issue-item/settings-issue-item.component';

@Component({
  selector: 'jit-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public issueTypes: string[] = Object.keys(DEFAULT_TEMPLATE.issueTypes);

    public currentIssueType!: string;
    public showInput!: boolean;

    private destroy$: Subject<any> = new Subject();
    private runOnce!: boolean;

    @ViewChildren(SettingsIssueItemComponent) public issueTypeElements!: QueryList<SettingsIssueItemComponent>;
    @ViewChild('newItemInput') public newItemInput!: ElementRef<HTMLInputElement>;

    constructor(public storage: StorageService,
                private cdRef: ChangeDetectorRef,
                public settings: SettingsService,
                public toast: ToastService,
                ) {}

    ngOnInit(): void {
        console.log('>>> on init');
        this.storage.storage$
            .pipe(
                filter((data: IJTStorage | undefined) => !!data),
                tap((data: IJTStorage | undefined) => {
                    console.log('>>> data from pipe', data);
                    this.issueTypes = Object.keys(data?.issueTypes || {});
                    console.log('>>> currentIssue', this.currentIssueType);
                    this.cdRef.detectChanges();
                    if (this.issueTypeElements.first.type !== this.currentIssueType && !this.runOnce) {
                        this.settings.currentIssueType$.next(this.issueTypeElements.first.type);
                        this.runOnce = !this.runOnce;
                    }
                    console.log('>>> this.issueTypeElements.first.type', this.issueTypeElements.first.type);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();

        this.settings.currentIssueType$
            .pipe(
                tap((type: string) => {
                    this.currentIssueType = type;
                    console.log('>>> from sub', type);
                    this.cdRef.detectChanges();
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();

        this.storage.loadStorage();
    }

    ngAfterViewInit(): void {
        console.log('>>> after view init');
        this.issueTypeElements.toArray()[0].active = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public selectItem(item: string): void {
        this.settings.currentIssueType$.next(item);
        this.cdRef.detectChanges();
    }

    public addIssueType(): void {
        if (!this.newItemInput.nativeElement.value) {
            this.toast.showToast$.next({type: 'error', text: 'Can\'t create an issue with empty name!'});
            return;
        }
        if (this.newItemInput) {
            this.storage.setStorage({
                issueTypes: {
                    ...this.storage.storage$.value?.issueTypes,
                    [this.newItemInput.nativeElement.value]: {
                        selectors: [''],
                        template: '',
                    }
                },
            });
        }
    }

    public clearStorage(): void {
        this.storage.clearStorage();
    }
    public getStorage(): void {
        console.log('>>> storage', this.storage.storage$.value);
    }
}

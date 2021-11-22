import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { SettingsPageComponent } from '../../pages/settings-page/settings-page.component';
import { FileService } from '../../services/file.service';
import { PageService } from '../../services/page.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'jit-quick-access-card',
  templateUrl: './quick-access-card.component.html',
  styleUrls: ['./quick-access-card.component.scss']
})
export class QuickAccessCardComponent implements OnInit, OnDestroy {
    public hasQuickAccessItems = false;

    private destroy$: Subject<any> = new Subject();

    constructor(
        public storage: StorageService,
        public file: FileService,
        public pageService: PageService,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.storage.current$.pipe(take(2)).subscribe(() => {
            this.cdRef.detectChanges();
        });

        this.storage.current$
            .pipe(
                tap(value => this.hasQuickAccessItems =
                    Object.values(value.mainPage?.quickAccess || []).reduce((acc, val) => acc = acc || val, false)),
                tap(() => this.cdRef.detectChanges()),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public navigateToSettingsPage(): void {
        this.pageService.mainPage$.next(SettingsPageComponent);
    }
}

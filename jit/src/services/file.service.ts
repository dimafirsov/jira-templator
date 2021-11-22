import { Inject, Injectable, OnDestroy } from '@angular/core';
import { StorageService } from './storage.service';
import { saveAs } from 'file-saver';
import { STORAGE_NAME } from '../constants';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IToastService, ToastService } from '@nova-ui/bits';

@Injectable({
    providedIn: 'root'
})
export class FileService implements OnDestroy {

    public current$: Subject<any> = new Subject();

    private destroy$: Subject<any> = new Subject();

    constructor(public storage: StorageService, @Inject(ToastService) public toastService: IToastService, ) {
        this.current$
            .pipe(
                tap(data => console.log('... data', data.target?.files[0] as File)),
                tap(async data => {
                    const file = data.target?.files[0] as File;
                    const text = await file.text();
                    const json = JSON.parse(text);

                    await this.storage.setStorage({ ...json });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public downloadJtConfig(): void {
        this.storage.getStorage(STORAGE_NAME, (data) => {
            const blob = new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'});
            saveAs(blob, 'jt-config.json');
        });
    }

    public applyConfig(event: any): void {
        if (event.target.files.length) {
            this.current$.next(event);
            this.toastService.success({title: 'Success!', message: 'Custom config has been successfully applied!'});
        }
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TEMPLATE, STORAGE_NAME } from '../constants';
import { IJTStorage } from '../type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    public current$: BehaviorSubject<IJTStorage> = new BehaviorSubject<IJTStorage>({...DEFAULT_TEMPLATE});

    constructor() {}

    public async setStorage(data: object = {}): Promise<void> {
        const newStorage = {} as any;
        newStorage[STORAGE_NAME] = {...data};

        // @ts-ignore-next-line
        chrome.storage?.sync.set({...newStorage});
        this.current$.next(newStorage[STORAGE_NAME]);
    }

    public async getStorage(key: string, fn?: (data: any) => void): Promise<any> {
        // @ts-ignore-next-line
        chrome.storage?.sync.get(key, (data) => {
            if (fn) {
                fn(data[key]);
                return;
            }
            this.current$.next(data[key]);
        });
    }

    public loadStorage(): void {
        this.getStorage(STORAGE_NAME, (data) => {
            data
                ? this.setStorage({...data})
                : this.setStorage({...DEFAULT_TEMPLATE});
        });
    }

    public clearStorage(): void {
        // @ts-ignore-next-line
        chrome.storage?.sync.clear();
        this.current$.next({} as IJTStorage);
    }

    public removeFromStorage(item: string, fn?: () => void): void {
        // @ts-ignore-next-line
        chrome.storage.sync.remove(item, fn);
    }

    public logStorage(): void {
        return console.log('>>> storage', this.current$.value);
    }
}

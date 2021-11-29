import { TestBed } from '@angular/core/testing';
import { IToastService, ToastService } from '@nova-ui/bits';
import { DEFAULT_TEMPLATE } from '../constants';

import { FileService } from './file.service';
import { StorageService } from './storage.service';

const file = new File([JSON.stringify({...DEFAULT_TEMPLATE})], 'file.txt');
const data = {
    target: {
        files: [file],
    },
};
const toast: IToastService = {
    clear: () => void 0,
    error: () => void 0 as any,
    info: () => void 0 as any,
    remove: () => void 0 as any,
    setConfig: () => void 0 as any,
    success: () => void 0 as any,
    warning: () => void 0 as any,
};

describe('FileService', () => {
    let service: FileService;
    let storage: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ToastService,
                    useValue: toast,
                }
            ]
        });
        service = TestBed.inject(FileService);
        storage = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call storage setter', () => {
        service.current$
            .subscribe(d => {
                expect(d).toEqual({...data});
            });
        service.current$.next({...data});
    });

    it('should call storage getter on config download', () => {
        const spy = spyOn(service.storage, 'getStorage');
        service.downloadJtConfig();
        expect(spy).toHaveBeenCalled();
    });

    it('should apply config if there are files', () => {
        const spy = spyOn(service.current$, 'next');
        service.applyConfig(data);
        expect(spy).toHaveBeenCalled();
    });

    it('should apply config if there are files', () => {
        const spy = spyOn(service.current$, 'next');
        const emptyData = {target: { files: [] }};
        service.applyConfig(emptyData);
        expect(spy).not.toHaveBeenCalled();
    });
});

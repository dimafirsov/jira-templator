import { TestBed } from '@angular/core/testing';
import { DEFAULT_TEMPLATE } from '../constants';
import { IJTStorage } from '../type';

import { StorageService } from './storage.service';

const data = {
    globalTriggerSelector: '#createGlobalItem',
    issueTypeSelector: '#issuetype-field',
    loadTimeout: 2700,
    showReadyMessage: true,
    issueTypes: {
        Story: [
            {
                selectors: ['#description'],
                template: 'story description template',
                title: 'Description',
            },
            {
                selectors: ['#summary'],
                template: 'story summary template',
                title: 'Summary',
            },
        ],
    }
};


describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default service value equal to default template', () => {
    expect(service.current$.value).toEqual({...DEFAULT_TEMPLATE});
  });

  it('should setStorage() set correct object value', () => {
    const spy = spyOn(service.current$, 'next');
    service.setStorage(data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should setStorage() set correct object value', () => {
    const spy = spyOn(service.current$, 'next');
    service.setStorage(data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should clearStorage() call the chrome clear function', () => {
    const spy = spyOn(service.current$, 'next');
    service.clearStorage();
    expect(spy).toHaveBeenCalledWith({} as IJTStorage);
  });
});

import { IJTStorage } from './type';

export const STORAGE_NAME = 'JT_Templates';

export const DEFAULT_TEMPLATE: IJTStorage = {
    issueTypes: {
        Bug: {
            selectors: ['bug_selector'],
            template: '',
        },
        Epic: {
            selectors: [],
            template: '',
        },
        'Internal Improvement': {
            selectors: [],
            template: '',
        },
        Story: {
            selectors: [],
            template: '',
        },
    }
};



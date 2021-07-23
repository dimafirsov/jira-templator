import { IJTStorage } from './type';

export const STORAGE_NAME = 'JT_Templates';

export const DEFAULT_TEMPLATE: IJTStorage = {
    issueTypes: {
        Bug: [
            {
                selectors: ['bug_selector'],
                template: 'bug_template',
                title: 'description',
            }
        ],
        Epic: [
            {
                selectors: ['epic_selector'],
                template: 'epic_template',
                title: 'description',
            }
        ],
        'Internal Improvement': [
            {
                selectors: ['II_selector'],
                template: 'II_template',
                title: 'description',
            },
            {
                selectors: ['II_selector - 2'],
                template: 'II_template - 2',
                title: 'acceptance criteria',
            },
        ],
        Story: [
            {
                selectors: [],
                template: '',
                title: 'description',
            },
            {
                selectors: [],
                template: '',
                title: 'acceptance criteria',
            },
        ],
    }
};



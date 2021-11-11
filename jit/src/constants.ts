import { IJTStorage } from './type';

export const STORAGE_NAME = 'JT_Templates';

export const DEFAULT_TEMPLATE: IJTStorage = {
    globalTriggerSelector: '',
    issueTypes: {
        Bug: [
            {
                selectors: ['bug_selector'],
                template: 'bug_template',
                title: 'Description',
            }
        ],
        Epic: [
            {
                selectors: ['epic_selector'],
                template: 'epic_template',
                title: 'Description',
            }
        ],
        'Internal Improvement': [
            {
                selectors: ['II_selector'],
                template: 'II_template',
                title: 'Description',
            },
            {
                selectors: ['II_selector - 2'],
                template: 'II_template - 2',
                title: 'Acceptance Criteria',
            },
        ],
        Story: [
            {
                selectors: ['story_selector'],
                template: 'story description template',
                title: 'Description',
            },
            {
                selectors: [],
                template: 'story ac template',
                title: 'Acceptance Criteria',
            },
        ],
    }
};



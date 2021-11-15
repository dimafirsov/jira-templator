import { IJTStorage } from './type';

// tslint:disable:no-trailing-whitespace

export const STORAGE_NAME = 'JT_Templates';

export const DEFAULT_TEMPLATE: IJTStorage = {
    globalTriggerSelector: '',
    issueTypeSelector: '',
    issueTypes: {
        Bug: [
            {
                selectors: ['#description'],
                template: `*Setup:*
(i) 
{panel:bgColor=#F5CFC5}(!) Critical Note {panel}
{panel:bgColor=#fffca8}(!) Warning Note {panel}

*Steps to reproduce:*

# Go to
# ...


h1. (/) Expected result:



h1. (x) Actual result:



See screenshot for more details`,
                title: 'Description',
            },
            {
                selectors: ['#summary'],
                template: 'bug_template',
                title: 'Summary',
            }
        ],
        Epic: [
            {
                selectors: ['#description'],
                template: 'epic_template',
                title: 'Description',
            },
            {
                selectors: ['#summary'],
                template: '',
                title: 'Summary',
            }
        ],
        Task: [
            {
                selectors: ['#description'],
                template: 'II_template',
                title: 'Description',
            },
            {
                selectors: ['#summary'],
                template: 'Task',
                title: 'Summary',
            },
        ],
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

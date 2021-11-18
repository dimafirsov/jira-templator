import { STORAGE_NAME, DEFAULT_TEMPLATE } from '../src/constants';
import * as toast from './toast';

(async function() {
    let storage = (await getStorage())[STORAGE_NAME];

    if (!storage) {
        await setStorage({...DEFAULT_TEMPLATE});
        storage = (await getStorage())[STORAGE_NAME];
    }
    console.log('>>> storage', storage);

    setTimeout(async () => {
        let createButton = getGlobalTriggerElementFromStorage(storage);

        vt.success("Jira Templator IS READY!", { title: "Let's GO!", position: "top-right",})

        createButton.addEventListener("click", async () => {
            storage = (await getStorage())[STORAGE_NAME]
            applyTemplates(storage);
            watchForIssueTypeChanges(storage);
        })

    }, storage?.loadTimeout)
})()

function applyTemplates(storage) {
    const interval = setInterval(() => {
        const currentIssueType = document.querySelector(storage?.issueTypeSelector);

        if (currentIssueType) {
            const issueTypeFromStorage = storage.issueTypes[currentIssueType.value];
            if (issueTypeFromStorage) {
                issueTypeFromStorage.forEach(item => {
                    const targetElement = document.querySelector(`${item.selectors}`);
                    const targetElementInterval = setInterval(() => {
                        if (targetElement && !targetElement.getAttribute('disabled')) {
                            targetElement.value = '';
                            targetElement.value = item.template;
                            clearInterval(targetElementInterval);
                        }
                    }, 200);
                });
            }
        }
        clearInterval(interval);
    }, 400);
}

function watchForIssueTypeChanges(storage) {
    let currentIssueType = null;
    let oldIssueTypeValue = 'Story';

    setTimeout(() => {
        const internalInterval = setInterval(() => {
            currentIssueType = document.querySelector("#issuetype-field");

            if (oldIssueTypeValue !== currentIssueType?.value) {
                oldIssueTypeValue = currentIssueType?.value;
                applyTemplates(storage);
            }

            if (oldIssueTypeValue === undefined) {
                clearTimeout(internalInterval);
            }
        }, 100);
    }, 400);
}

function getGlobalTriggerElementFromStorage(storage) {
    return document.querySelector(storage?.globalTriggerSelector);
}

async function getStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(STORAGE_NAME, (items) => {
            if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
};

async function setStorage(data) {
    const newStorage = {};
    newStorage[STORAGE_NAME] = {...data};

    return new Promise((resolve, reject) => {
        chrome.storage?.sync.set({...newStorage}, () => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve();
        });
    });
}

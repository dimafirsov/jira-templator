var StorageID = "JT_Templates";

var templateType = {
    DEFAULT_TEMPLATE: "default",
    CUSTOM_TEMPLATE: "custom",
    CURRENT_TEMPLATE: "current",
    EMPTY_TEMPLATE: "empty"
};

var templateKeys = {
    epicTemplate: "epicTemplate",
    bugTemplate: "bugTemplate",
    storyTemplate: "storyTemplate",
    improvementTemplate: "improvementTemplate",
    researchTemplate: "researchTemplate",
    fixedCommentTemplate: "fixedCommentTemplate"
};

var selectors = {
    BUTTON_COMMENT_DEV: "#addFixedComment_DEV",
    BUTTON_COMMENT_QA: "#addFixedComment_QA",
    BUTTON_SAVE_BUG_TEMPLATE: "#saveCustomBugTemplate",
    BUTTON_SAVE_EPIC_TEMPLATE: "#saveCustomEpicTemplate",
    BUTTON_SAVE_FIXED_COMMENT_TEMPLATE: "#saveCustomFixedCommentTemplate",
    BUTTON_SAVE_IMPROVEMENT_TEMPLATE: "#saveCustomInternalImprovementTemplate",
    BUTTON_SAVE_RESEARCH_TEMPLATE: "#saveCustomResearchTemplate",
    BUTTON_SAVE_STORY_TEMPLATE: "#saveCustomStoryTemplate",
    TEXTAREA_BUG_TEMPLATE: "#bug_template",
    TEXTAREA_EPIC_TEMPLATE: "#epic_template",
    TEXTAREA_STORY_TEMPLATE: "#story_template",
    TEXTAREA_RESEARCH_TEMPLATE: "#research_template",
    TEXTAREA_IMPROVEMENT_TEMPLATE: "#ii_template",
    TEXTAREA_FIXED_COMMENT_TEMPLATE: "#fixed_comment_template"
};

function prohibitNewLinesForTemplateTexareas() {
   $.each(selectors, (k, v) => {
       switch(k) {
           case('TEXTAREA_BUG_TEMPLATE'):
           case('TEXTAREA_FIXED_COMMENT_TEMPLATE'):
           case('TEXTAREA_IMPROVEMENT_TEMPLATE'):
           case('TEXTAREA_RESEARCH_TEMPLATE'):
           case('TEXTAREA_EPIC_TEMPLATE'):
           case('TEXTAREA_STORY_TEMPLATE'):
               $(v).keydown(function(e){
                   // Enter was pressed without shift key
                   if (e.keyCode === 13) {
                       // prevent default behavior
                       e.preventDefault();
                       let errorToast = $('<span class="errorMessage">ERROR: New lines are not allowed</span>');
                       Materialize.toast(errorToast, 3000);
                   }
               });
               break;
           default:
               break;
       }
   });
}

function setTextareaValueAndFocus(selector, issue) {
    $(selector).text(JSON.stringify(issue, null, 4));
}

function addCurrentTemplatesToTextareas() {
    chrome.storage.sync.get(StorageID, (data) => {
       let getCurrent = data[StorageID].template.current;
       setTextareaValueAndFocus(selectors.TEXTAREA_BUG_TEMPLATE, getCurrent.bugTemplate);
       setTextareaValueAndFocus(selectors.TEXTAREA_STORY_TEMPLATE, getCurrent.storyTemplate);
       setTextareaValueAndFocus(selectors.TEXTAREA_EPIC_TEMPLATE, getCurrent.epicTemplate);
       setTextareaValueAndFocus(selectors.TEXTAREA_RESEARCH_TEMPLATE, getCurrent.researchTemplate);
       setTextareaValueAndFocus(selectors.TEXTAREA_IMPROVEMENT_TEMPLATE, getCurrent.improvementTemplate);
       setTextareaValueAndFocus(selectors.TEXTAREA_FIXED_COMMENT_TEMPLATE, getCurrent.fixedCommentTemplate);
    });
}

function getStorage() {
    chrome.storage.sync.get(StorageID, (data) => {
        console.log('Got data from storage >>> ', data);
        return data;
    });
}

function removeStorage() {
    chrome.storage.sync.clear(() => {
        console.log("Storage successfully cleared");
    });
}

function cleanCurrentStorage() {
    chrome.storage.sync.get(StorageID, (data) => {
        let storage = data;
        let template = storage[StorageID].template;
        //template[templateType.CUSTOM_TEMPLATE] = template[templateType.epicTemplate];
        template[templateType.CURRENT_TEMPLATE] = template[templateType.EMPTY_TEMPLATE];
        console.log('Current tempaltes are set to empty state');
        chrome.storage.sync.set(storage);
    });
}

function setCurrentTo(tmpltType) {
    chrome.storage.sync.get(StorageID, (data) => {
        let storage = data;
        if (storage[StorageID]) {
            let current = storage[StorageID].template.current;
            let targetTemplate = storage[StorageID].template[tmpltType];

                $.each(current, (k, v) => {
                    current[k] = targetTemplate[k];
                });

            chrome.storage.sync.set(storage, () => {
                if (tmpltType === templateType.DEFAULT_TEMPLATE) {
                    console.log("Default templates are set");
                } else {
                    console.log("Custom templates are set");
                }
            });
        }
    });
}

function getTextareaValue(selector) {
    return $(selector).val();
}

function saveTemplate(textareaSelector, templateKey) {
    chrome.storage.sync.get(StorageID, (data) => {
        let storage = data;

        if (getTextareaValue(textareaSelector) !== "" && getTextareaValue(textareaSelector).valueOf() !== "object") {
            storage[StorageID].template.custom[templateKey] = JSON.parse(getTextareaValue(textareaSelector));
            storage[StorageID].template.current[templateKey] = JSON.parse(getTextareaValue(textareaSelector));
            console.log("Successfully stored");
        }else {
            storage[StorageID].template.custom[templateKey] = getTextareaValue(textareaSelector);
            storage[StorageID].template.current[templateKey] = getTextareaValue(textareaSelector);
            console.log("Successfully stored");
        }

        chrome.storage.sync.set(storage);
    });
}

function sendMessageOnTemplateSave(tKey) {
    let request = {
        isSaved: true,
        tKey: tKey
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
            if (response) {
                console.log(response.actionResult);
                switch (tKey) {
                    case(templateKeys.bugTemplate):
                        Materialize.toast("Bug Template was successfully saved", 3000);
                        break;
                    case(templateKeys.fixedCommentTemplate):
                        Materialize.toast("Fixed Comment Template was successfully saved", 3000);
                        break;
                    case(templateKeys.researchTemplate):
                        Materialize.toast("Research Template was successfully saved", 3000);
                        break;
                    case(templateKeys.improvementTemplate):
                        Materialize.toast("Improvement Template was successfully saved", 3000);
                        break;
                    case(templateKeys.storyTemplate):
                        Materialize.toast("Story Template was successfully saved", 3000);
                        break;
                    case(templateKeys.epicTemplate):
                        Materialize.toast("Epic Template was successfully saved", 3000);
                        break;
                }
            }else{
                let errorToast = $('<span style="font-weight: bold">TEMPLATE SAVED SUCCESSFULLY!</span><span class="errorMessage" style="font-size: 12px;">However, the receiving side sent no response. <br>You are probably not on the JIRA page. If you are please refresh the page</span>');
                Materialize.toast(errorToast, 5000);
            }
        });
    });
}

function sendMessageOnButtonClick(buttonSelector) {
    let request = {
        isClicked: true,
        buttonSelector: buttonSelector,
        selectors: selectors
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
            if (!response) {
                let errorToast = $('<span style="font-weight: bold; font-size: 14px">ERROR: The template was not inserted</span><br /><span>You are probably not on the JIRA page or there is no Comment button.<br />If you are please refresh the page</span>');
                Materialize.toast(errorToast, 7000, "errorMessage-up");
            }
        });
    });
}

/**
 * ==================== Actions performed and handled after the popup page is loaded
 */
$( document ).ready( function(){
    /**
     * Populate the template textareas with default template
     */
    addCurrentTemplatesToTextareas();
    prohibitNewLinesForTemplateTexareas();

    /**
     *  Enabling Materialize sidebar
     */
    $(".button-collapse").sideNav();

    /**
     *  Handling the Comment button click events
     */
    $(selectors.BUTTON_COMMENT_QA).on("click", () => {
        sendMessageOnButtonClick(selectors.BUTTON_COMMENT_QA);
    });

    $(selectors.BUTTON_COMMENT_DEV).on("click", () => {
        sendMessageOnButtonClick(selectors.BUTTON_COMMENT_DEV);
    });

    /**
     *  Helper methods for working with the storage
     */
    $("#remove").on("click", () => {
        removeStorage();
    });

    $("#get").on("click", () => {
        getStorage();
    });

    $("#clear").on("click", () => {
        cleanCurrentStorage();
    });

    $("#default").on("click", () => {
        setCurrentTo(templateType.DEFAULT_TEMPLATE);
    });

    $("#custom").on("click", () => {
        setCurrentTo(templateType.CUSTOM_TEMPLATE);
    });
    /**
     *  Handling template save action for every item
     */
    $(selectors.BUTTON_SAVE_BUG_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_BUG_TEMPLATE, templateKeys.bugTemplate);
        sendMessageOnTemplateSave(templateKeys.bugTemplate);
    });

    $(selectors.BUTTON_SAVE_EPIC_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_EPIC_TEMPLATE, templateKeys.epicTemplate);
        sendMessageOnTemplateSave(templateKeys.epicTemplate);
    });

    $(selectors.BUTTON_SAVE_FIXED_COMMENT_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_FIXED_COMMENT_TEMPLATE, templateKeys.fixedCommentTemplate);
        sendMessageOnTemplateSave(templateKeys.fixedCommentTemplate);
    });

    $(selectors.BUTTON_SAVE_IMPROVEMENT_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_IMPROVEMENT_TEMPLATE, templateKeys.improvementTemplate);
        sendMessageOnTemplateSave(templateKeys.improvementTemplate);
    });

    $(selectors.BUTTON_SAVE_RESEARCH_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_RESEARCH_TEMPLATE, templateKeys.researchTemplate);
        sendMessageOnTemplateSave(templateKeys.researchTemplate);
    });

    $(selectors.BUTTON_SAVE_STORY_TEMPLATE).on("click", () => {
        saveTemplate(selectors.TEXTAREA_STORY_TEMPLATE, templateKeys.storyTemplate);
        sendMessageOnTemplateSave(templateKeys.storyTemplate);
    });
});


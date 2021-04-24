const StorageID = "JT_Templates";

const url = "https://jira.solarwinds.com/secure/CreateIssue.jspa";

const selector = {
    DESCRIPTION:"#description",
    SUMMARY: "#summary",
    COMMENT_BUTTON: "footer-comment-button",
    COMMENT_TEXTAREA: "comment",
    SCRUM_TEAM: "#customfield_11100"
};

let availableIssueTypes = [
    "Bug",
    "Story",
    "Epic",
    "Research",
    "Internal Improvement"
];

let currentTemplates = {};

/**
 * Getting target elements from the page
 */
let issueType;
let issueTypeFixedField;
let issueDescription;
let issueSummary;
let issueAcceptanceCriteria;
let issueAssignee;
let fixVersionsMultiselect;
let createIssueButton;
let selectedOption;
let issueTypeField;
let commentButton;
let commentTextarea;

/**
 * Messaging
 */
// var what = setInterval(() => {
//     console.log("currentTemplates >>> ", currentTemplates);
// }, 2000);

function updateCurrentTemplates() {
    chrome.storage.sync.get(StorageID, (data) => {
       currentTemplates = data[StorageID].template.current;
    });
}

function getCommentButton() {
    commentButton = document.getElementById(selector.COMMENT_BUTTON);
    return commentButton;
}

function getCommentTextarea() {
    commentTextarea =  document.getElementById(selector.COMMENT_TEXTAREA);
    return commentTextarea;
}

function listenForTemplatesUpdate() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.isSaved === true) {
                updateCurrentTemplates();
                sendResponse({actionResult: request.tKey + " was successfully saved"});
            }
        });
}

function listenForInsertCommentButtonClick() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.isClicked === true) {
                if (getCommentButton()) {
                    getCommentButton().click();
                }
                switch (request.buttonSelector) {
                    case request.selectors.BUTTON_COMMENT_QA:
                        getCommentTextarea().value = currentTemplates.fixedCommentTemplate.contentQA;
                        //Materialize.toast("Comment added", 3000);
                        break;
                    case request.selectors.BUTTON_COMMENT_DEV:
                        getCommentTextarea().value = currentTemplates.fixedCommentTemplate.contentDEV;
                        break;
                    default:
                        break;
                }
                sendResponse({actionResult: request.buttonSelector + " button was clicked"});
            }
        });
}

let getSelectedOption = () => {
    selectedOption = $('option[data-selected="selected"]');
    return selectedOption;
};

let getCreateIssueButton = () => {
    createIssueButton = document.getElementById('create_link');
    return createIssueButton;
};

// let getFixVersionsMultiselect = () => {
//     fixVersionsMultiselect = document.getElementById("fixVersions-multi-select");
//     return fixVersionsMultiselect;
// };

let getAccepatanceCriteria = () => {
    issueAcceptanceCriteria = $("#customfield_10300");
    return issueAcceptanceCriteria;
};

let getSummary = () => {
    issueSummary = $("#summary");
    return issueSummary;
};

let getDescription = () => {
    issueDescription = $("#description");
    return issueDescription;
};

let getAssignee = () => {
    issueAssignee = $("#assignee-field");
    return issueAssignee;
};

let getIssueTypeFixedField = () => {
    issueTypeFixedField = document.getElementById("issue-create-issue-type");
    return issueTypeFixedField;
};

let getIssueTypeField = () => {
    issueTypeField = $('#issuetype-field');
    return issueTypeField;   
};

let getIssueType = () => {

    getIssueTypeFixedField();
    getCreateIssueButton();

    if (issueTypeFixedField)
    {
        issueType = issueTypeFixedField.innerHTML;
    }
    else if (createIssueButton)
    {
        createIssueButton.addEventListener('click', function() {
            let id = setInterval(() => {
                let option = getSelectedOption();
                if (!option) {
                    option = getIssueTypeField();
                }
                if (option.val() !== "")
                {
                    let optionText = option.val();
                    availableIssueTypes.forEach((issue) =>
                    {
                        if (optionText === issue)
                        {
                            issueType = issue;
                        }
                    });
                clearInterval(id);
                }
            }, 200);
        });
    }
};

let getAllFields = () => {
    getIssueTypeFixedField();
    getSelectedOption();
    getCreateIssueButton();
    //getFixVersionsMultiselect();
    getAccepatanceCriteria();
    getSummary();
    getDescription();
    getAssignee();
    getIssueTypeField();
    getIssueType();
};

let clearFields = () => {
    if (getDescription()) {
        getDescription().val("");
    }
    if (getAccepatanceCriteria()) {
        getAccepatanceCriteria().val("");
    }
    if (getSummary()) {
        getSummary().val("");
    }
};

/**
 * Inserting templates into the target elements
 */

let insertFixVersions = function(template) {
    let dropDown = $("#fixVersions-textarea ~ span");
    $('em.item-delete').click();
        template.forEach((fv) => {
            $("#fixVersions-textarea").val(fv);
            dropDown.click();
            $("li.active").click();
        });
};

let selectScrumTeam = function(team) {
    let select = $(selector.SCRUM_TEAM);
    let options = select.children();

    options.each((i, v) => {
        if (v.text === team) {
            select.prop('selectedIndex', i);
        }
    });
};

let insertBugTemplate = function() {
    getAllFields();
    updateCurrentTemplates();
    getAssignee().val(currentTemplates.bugTemplate.assignee);
    getSummary().val(currentTemplates.bugTemplate.summary);
    getDescription().val(currentTemplates.bugTemplate.description);
    insertFixVersions(currentTemplates.bugTemplate.fixVersions);
    selectScrumTeam(currentTemplates.bugTemplate.scrumTeam);
    getSummary().focus();
};

let insertStoryTemplate = function() {
    getAllFields();
    updateCurrentTemplates();
    getAssignee().val(currentTemplates.storyTemplate.assignee);
    getDescription().val(currentTemplates.storyTemplate.description);
    getSummary().val(currentTemplates.storyTemplate.summary);
    getAccepatanceCriteria().val(currentTemplates.storyTemplate.acceptanceCriteria);
    insertFixVersions(currentTemplates.storyTemplate.fixVersions);
    selectScrumTeam(currentTemplates.storyTemplate.scrumTeam);
    getSummary().focus();
};

let insertResearchTemplate = function() {
    getAllFields();
    updateCurrentTemplates();
    getAssignee().val(currentTemplates.researchTemplate.assignee);
    getDescription().val(currentTemplates.researchTemplate.description);
    getSummary().val(currentTemplates.researchTemplate.summary);
    getAccepatanceCriteria().val(currentTemplates.researchTemplate.acceptanceCriteria);
    insertFixVersions(currentTemplates.researchTemplate.fixVersions);
    selectScrumTeam(currentTemplates.researchTemplate.scrumTeam);
    getSummary().focus();
};

let insertEpicTemplate = function() {
    getAllFields();
    updateCurrentTemplates();
    getAssignee().val(currentTemplates.epicTemplate.assignee);
    getDescription().val(currentTemplates.epicTemplate.description);
    getSummary().val(currentTemplates.epicTemplate.summary);
    getAccepatanceCriteria().val(currentTemplates.epicTemplate.acceptanceCriteria);
    insertFixVersions(currentTemplates.epicTemplate.fixVersions);
    selectScrumTeam(currentTemplates.epicTemplate.scrumTeam);
    getSummary().focus();
};

let insertInternalImprovementTemplate = function() {
    getAllFields();
    updateCurrentTemplates();
    getAssignee().val(currentTemplates.improvementTemplate.assignee);
    getDescription().val(currentTemplates.improvementTemplate.description);
    getSummary().val(currentTemplates.improvementTemplate.summary);
    getAccepatanceCriteria().val(currentTemplates.improvementTemplate.acceptanceCriteria);
    insertFixVersions(currentTemplates.improvementTemplate.fixVersions);
    selectScrumTeam(currentTemplates.improvementTemplate.scrumTeam);
    getSummary().focus();
};

let setTemplates = () => {
    switch(issueType) {
        case 'Bug':
            clearFields();
            insertBugTemplate();
        break;
    
        case 'Story':
            clearFields();
            insertStoryTemplate();
        break;

        case 'Epic':
            clearFields();
            insertEpicTemplate();
        break;

        case 'Research':
            clearFields();
            insertResearchTemplate();
        break;

        case 'Internal Improvement':
            clearFields();
            insertInternalImprovementTemplate();
        break;
    
        default:
        break;
    }
};

/**
 * ================================= Magic starts here =================================
 */
function main() {
    getIssueType();
    updateCurrentTemplates();
    listenForTemplatesUpdate();
    // Listening for the input from the user to insert a Fixed Comment template (corresponding button is available
    // from the extension popup). We need to handle this as a separate action since user may not want to post
    // fixed comments automatically every time.
    listenForInsertCommentButtonClick();

    // From the very start here we're trying to handle two scenarios: issue is being created
    // by opening in the new tab or using a modal dialog window in the same page
    // The first statement covers the case when we attempt to create a JIRA item using the modal dialog
    if (!getIssueTypeFixedField()) {

        // Method set() waits for the non-disabled issue description field. When it finds one it automatically
        // inserts the predefined template depending on current issue type
        let set = () => {
            let id = setInterval(() => {
                if (getDescription() && getDescription().attr("disabled") !== "disabled") {
                    updateCurrentTemplates();
                    setTemplates();
                    clearInterval(id);
                }
            }, 100);
        };

        // Listen for the user click on CREATE button to call the Create Issue modal dialog
        createIssueButton.addEventListener('click', () => {
            set();

            // Once the modal dialog window is opened and a template for the current issue type has been applied,
            // we constantly wait for the possible change of the issue type since user may change his mind and
            // decide to select a different issue type. In this case we automatically apply a corresponding template
            // depending on the issue type the user has selected
            let checkingIssueType = setInterval( () => {
                if (getDescription() && getDescription().attr("disabled") !== "disabled") {
                    let currentIssueType = getIssueTypeField().val();
                    if (currentIssueType !== issueType) {
                        issueType = currentIssueType;
                        set();
                    }
                }
            }, 200);
        });
    } else {
        updateCurrentTemplates();
        $( document ).ready(() => {
            setTemplates();
        });
    }
}

main();


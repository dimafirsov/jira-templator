/**
 * Templates for JIRA items
 */

var templateEmpty = {
    general: {
        acceptanceCriteria: "",
        assignee: "",
        summary: "",
        description: "",
        fixVersions: [],
        scrumTeam: ""
    },
    comment: {
        contentQA: "",
        contentDEV:""
    }
};

var templateFixedComment = {
    contentQA:  "+Successfully verified with+:\n" +
                "xui #\n" +
                "Check screenshots\n" +
                "Demo: ",
    contentDEV:  "Fix is available in:\n" +
                "xui #\n" +
                "PR: \n" +
                "Demo: "
};

var templateBug = {
    assignee: "Unassigned",
    summary : "",
    description: "*Setup:*\n" +
                "(i) \n" +
                "{panel:bgColor=#F5CFC5}(!) Critical Note {panel}\n" +
                "{panel:bgColor=#fffca8}(!) Warning Note {panel}\n\n" +
                "*Steps to reproduce:*\n" +
                "# Go to \n" +
                "# \n\n" +
                "h1. (/) Expected result: \n\n\n" +
                "h1. (x) Actual result: \n\n\n" +
                "See screenshot for more details.",
    fixVersions: [],
    scrumTeam: ""
};

var templateResearch = {
    assignee: "Unassigned",
    summary : "",
    description: "",
    acceptanceCriteria:  "* Provide research results with a plan\n* Create new jira items (if required)\n* Be able to estimate jira items: <list of items>\n",
    fixVersions: [],
    scrumTeam: ""
};

var templateEpic = {
    assignee: "Unassigned",
    summary : "",
    description: "",
    acceptanceCriteria:  "",
    fixVersions: [],
    scrumTeam: ""
};

var templateInternalImprovement = {
    assignee: "Unassigned",
    summary : "",
    description: "",
    acceptanceCriteria: "",
    fixVersions: [],
    scrumTeam: ""
};

var templateStory = {
    assignee: "Unassigned",
    summary : "",
    description: "*As a* user, \n*I want* goal \n*I should have* \n... \n*So that* reason",
    acceptanceCriteria:  "* (!) \n" +
                "* (!) \n" +
                "----\n" +
                "* (!) Cross-browser tested\n" +
                "* (!) Unit tests are written and verified\n" +
                "* (!) Test coverage is verified\n" +
                "* (!) The rest of the [DoD|https://cp.solarwinds.com/display/UIFRD/Teams#expand-DefinitionofDoneforApollo] criteria are met",
    fixVersions: [],
    scrumTeam: ""
};

var text = {
    assignee: "Dmytro Firsov",
    summary: "",
    description: "*THIS IS SPARTA!!1*",
    acceptanceCriteria:  "Some criteria",
    fixVersions: [],
    scrumTeam: ""
};

/**
 * Creating default storage using the storage model
 */

var StorageID = "JT_Templates";

var storageModel = {
    default: {
        epicTemplate: templateEpic,
        bugTemplate: templateBug,
        storyTemplate: templateStory,
        improvementTemplate: templateInternalImprovement,
        researchTemplate: templateResearch,
        fixedCommentTemplate: templateFixedComment
    },
    current: {
        epicTemplate: templateEpic,
        bugTemplate: templateBug,
        storyTemplate: templateStory,
        improvementTemplate: templateInternalImprovement,
        researchTemplate: templateResearch,
        fixedCommentTemplate: templateFixedComment
    },
    custom: {
        epicTemplate: templateEmpty.general,
        bugTemplate: templateEmpty.general,
        storyTemplate: templateEmpty.general,
        improvementTemplate: templateEmpty.general,
        researchTemplate: templateEmpty.general,
        fixedCommentTemplate: templateEmpty.comment,
    },
    empty: {
        epicTemplate: templateEmpty.general,
        bugTemplate: templateEmpty.general,
        storyTemplate: templateEmpty.general,
        improvementTemplate: templateEmpty.general,
        researchTemplate: templateEmpty.general,
        fixedCommentTemplate: templateEmpty.comment,
    }
};

function setDefaultStorage() {
    var defaultData = {};
    defaultData[StorageID] = {
        template: storageModel
    };
    chrome.storage.sync.set(defaultData, () => {
        console.log('Settings saved');
    });
}

chrome.storage.sync.get(StorageID, (data) => {
    let storage = data;

   if (!storage[StorageID]) {
       setDefaultStorage();
   } else if (storage[StorageID].template.default !== storageModel.default) {
       storage[StorageID].template.default = storageModel.default;
       storage[StorageID].template.current = storageModel.default;
       chrome.storage.sync.set(storage, () => {
           console.log("Default tempaltes updated");
       })
   }
});
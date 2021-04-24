# Changelog

## v.1.x.x

### v.1.0.1
*   Added template for issue type BUG
*   Automatically set Assignee file to Unassigned

### v.1.0.2 
*   Added a template for the `STORY` issue type
*   Issues created in a modal dialog are supported! The extension automatically detects the issue type user 
selects and uses an appropriate template
*   Auto-clear of all fields for the JIRA issues that have no templates.

### v.1.1.0
*   Adapted the extension to work with the latest breaking JIRA update
*   Added a templates for the `Epic` and `Internal Improvement` issue types. For now they just set asignee to Unassigned by default

### v.1.1.1
*   Added a possibility to add fixed comment from the extension ui page
*   Visual design changes

## v.2.x.x
### v.2.0.0
*   Added a possibility to set a custom template for every issue type
*   The extension is now using the `chrome.storage.sync` to store data
*   Visual design changes
*   Added quick access buttons to use the following options (mostly for debugging purposes):
    *   Pop into the browser console the local storage contents;
    *   Apply default per-defined templates for all issues
    *   Apply custom set templates for all issues
    *   Empty current templates
*   Information toast message on successful template save
*   Validation error messages:
    *   on loosing connection with content script
    *   on attempt to use new lines when setting up the custom templates.
    
### v.2.0.1
*   Updated the error message that appears on lost connection to a content script

### v.2.0.2
*   Default templates are updated automatically if changed in a commit
*   Added error message for fixed comment button
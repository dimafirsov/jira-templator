# Jira Templator
[![CircleCI](https://circleci.com/gh/dimafirsov/jira-templator/tree/develop.svg?style=shield&circle-token=7df1dc5b6e57e2bdd4478fae9c4afd10219d4b2b)](https://circleci.com/gh/dimafirsov/jira-templator/tree/develop)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/72fa82a6/jira-templator)

Jira Templator is a Chrome extension that allows you to use pre-defined templates for any jira items defined on your project. 
This can be a great improvement to the already established processes, as it helps to standardize the common format of the 
jira items. No more bug reports without expected and actual results, and stories with empty descriptions!

<img src="jt_logo.png" width="200" />

## Key features
###  General Settings
* Allows to modify the `Global Trigger` selector (e.g. `Create` button, or some sort). It can vary depending on the Jira versions you have.
* Allows to tweak the `Load Timeout` - it is needed to delay the creation of all the necessary pollings and subscriptions until all the selectors
are eventually set in stone. This is a must have for the brand new Cloud Jira, which changes references to some critical elements on the page pretty often. 
On other versions of Jira, including the on-premise one, this timeout may be redundant, so the settings allow you to modify it however you want.
* Allows changing `Issue Type Selector` - the selector for the element which actually delivers the information about which jira item type is currently selected. 
This selector may also vary dramatically among the Jira versions, therefore it is customizable.

### Template Settings
* Allows enabling/disabling the templates configuration
* Allows to create new jira item types, rename, and remove existing ones
* Allows for multiple inputs cofigurations (e.g. you can apply different templates for `Description` and `Summary` inputs)

### Utils Settings
* Allows to clear the specific chrome local storage. This destructive option rolls back the application to defaults when re-launched.
* Allows to `Export` the current Jira Templator config to share it among the team
* Allows to `Import` the config and make everyone to be on the same page about the jira items templates.

### Main Page
* You're able to throw your favorite utils action to the main page to quickly access them

## How to install
1. Switch to the `main` branch
2. Navigate inside the `jit` folder find the `jit-<version>.tgz` package
3. Download the package and unpack it
4. Start the Chrome browser and navigate to the `Settings --> More Tools --> Extensions`
5. On the top-left side of the screen find the `Upload unpacked` button
6. Click the `Upload unpacked` button and choose the folder containing the `manifest.json` file (`<your_unpacked_directory>/jit`)
7. Find the extension under the `Extensions` quick access toggle on the bookmark panel. Pin it to quick access the extension.

p.s. You'll probably want to edit the `manifest.json` file to adjust the `matches` setting  - this is where you define urls where the extension will work.

## Troubleshooting
1. 

## DISCLAIMER
Thins is my first complete product, so, even though I tested it, I don't have an access to all the possible Jira modifications, versions and environments, so there may be bugs. 
Please check the `Troubleshooting` section first before logging any new issues. If you still haven't found an answer to your problem, please log an issue using the provided template. 
I'll do my best to fix it.
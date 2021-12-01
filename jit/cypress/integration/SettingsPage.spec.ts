import { MainPagePo as main } from './MainPage.po';
import { SettingsPagePo as settings } from './SettingsPage.po';

describe('Settings Page > ', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(main.page.header.settingsButton).click();
    });

    describe('When user enters General Settings ', () => {
        it('should contain globalTrigger expected text', () => {
            cy.get(settings.page.tab.general.globalTrigger)
            .should('have.value', settings.page.tab.general.globalTriggerDefaultText);

            // cy.percySnapshot('Settings default view');
        });

        it('should globalTrigger input remain empty if cleared', () => {
            const trigger = cy.get(settings.page.tab.general.globalTrigger);
            trigger.clear();
            trigger.should('be.empty');

            // cy.percySnapshot('Triggers the validation error for the globalTrigger input if empty');
        });

        it('should restore the default value for the input if globalTrigger Reset button is clicked', () => {
            cy.get(settings.page.tab.general.globalTrigger).clear();
            cy.get(settings.page.tab.general.globalTriggerResetButton).click();
            cy.get(settings.page.tab.general.globalTrigger)
                .should('have.value', settings.page.tab.general.globalTriggerDefaultText);
        });

        it('should loadTimeout contain expected text', () => {
            cy.get(settings.page.tab.general.loadTimeout)
            .should('have.value', settings.page.tab.general.loadTimeoutDefaultText);
        });

        it('should loadTimeout input remain empty if cleared', () => {
            const trigger = cy.get(settings.page.tab.general.loadTimeout);
            trigger.clear();
            trigger.should('be.empty');

            // cy.percySnapshot('Triggers the validation error for the loadTimeout input if empty');
        });

        it('should restore the default value for the input if loadTimeout Reset button is clicked', () => {
            cy.get(settings.page.tab.general.loadTimeout).clear();
            cy.get(settings.page.tab.general.loadTimeoutResetButton).click();
            cy.get(settings.page.tab.general.loadTimeout)
                .should('have.value', settings.page.tab.general.loadTimeoutDefaultText);
        });

        it('should issueTypeSelector contain expected text', () => {
            cy.get(settings.page.tab.general.issueTypeSelector)
            .should('have.value', settings.page.tab.general.issueTypeSelectorDefaultText);
        });

        it('should issueTypeSelector input remain empty if cleared', () => {
            const trigger = cy.get(settings.page.tab.general.issueTypeSelector);
            trigger.clear();
            trigger.should('be.empty');

            // cy.percySnapshot('Triggers the validation error for the issueTypeSelector input if empty');
        });

        it('should restore the default value for the input if issueTypeSelector Reset button is clicked', () => {
            cy.get(settings.page.tab.general.issueTypeSelector).clear();
            cy.get(settings.page.tab.general.issueTypeSelectorResetButton).click();
            cy.get(settings.page.tab.general.issueTypeSelector)
                .should('have.value', settings.page.tab.general.issueTypeSelectorDefaultText);
        });
    });
});

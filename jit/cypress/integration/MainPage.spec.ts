import { MainPagePo as main } from './MainPage.po';
import { SettingsPagePo as settings } from './SettingsPage.po';

describe('Main Page > ', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should contain expected text', () => {
        cy.contains(main.page.header.homeTitleText);
        cy.contains('No items selected');
        cy.contains('Quick Access Board');

        // cy.percySnapshot('Default view of the Main page');
    });

    it('should navigate to Settings when clicked on corresponding link', () => {
        cy.get('a').contains('Settings').click();
        cy.get(settings.page.tab.el).contains(settings.page.tab.general.label).should('exist');
        cy.get(settings.page.tab.el).contains(settings.page.tab.general.label)
          .get('.nui-tab-heading')
          .should('have.class', 'active');
    });

    it('should close the whats new card on Close button click', () => {
        const icon = cy.get(main.page.whatsNewCard.closeIcon);
        icon.click();
        cy.contains(main.page.whatsNewCard.linkToChangeLogText).should('not.exist');
        icon.should('not.exist');

        // cy.percySnapshot('Should the whats new card be removed');
    });

    it('should show the tooltip then hovered over the close icon', () => {
        const icon = cy.get(main.page.whatsNewCard.closeIcon);
        icon.trigger('onmouseover');

        // cy.percySnapshot('Should show the tooltip over the close icon');
    });

    it('should Settings button exist', () => {
        const settingsButton = cy.get(main.page.header.settingsButton);
        settingsButton.should('exist');
    });

    it('should Settings button lead to settings', () => {
        const settingsButton = cy.get(main.page.header.settingsButton);
        settingsButton.click();
        cy.contains('General Settings');
    });
});

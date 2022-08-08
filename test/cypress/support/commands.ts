import 'cypress-file-upload';
import { endpointUrls } from './utils/endpointUrls';
import { network } from './utils/network';

Cypress.Commands.add(
  'visitWithUserInfo',
  (fixturePath: string, alias: string) => {
    network.intercept(endpointUrls.brukerinfo, fixturePath).as(alias);

    cy.window().then((win) => {
      win.sessionStorage.removeItem('persist:root');

      cy.visit('');
      cy.location().should('to.be', 'http://localhost:3006/skadeforklaring/');
    });
  }
);

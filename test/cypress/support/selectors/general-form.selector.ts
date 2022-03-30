export const general = {
  nextStep: () => cy.get('[data-test-id=neste-steg]'),
  backStep: () => cy.get('[data-test-id=tilbake-steg]'),
  feilmeldinger: () => cy.get('.navds-error-message'),
};

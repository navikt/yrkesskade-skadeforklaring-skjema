export const general = {
  nextStep: () => cy.get('[data-test-id=neste-steg]'),
  backStep: () => cy.get('[data-test-id=tilbake-steg]'),
  feilmeldinger: () => cy.get('.navds-error-message'),
  avbryt: {
    visModal: () => cy.get('[data-test-id="avbryt-skadeforklaring"]'),
    tilbake: () => cy.get('[data-test-id="avbryt-skadeforklaring-tilbake"]'),
    bekreft: () => cy.get('[data-test-id="avbryt-skadeforklaring-bekreft"]'),
  },
};

export const vedlegg = {
  ingenEttersending: () =>
    cy.get('[data-test-id="skal-ettersende-dokumentasjon-nei"]'),
  harEttersending: () =>
    cy.get('[data-test-id="skal-ettersende-dokumentasjon-ja"]'),
  opplastKnapp: () => cy.get('.attachmentButton'),
};

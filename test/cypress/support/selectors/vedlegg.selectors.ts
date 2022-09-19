export const vedlegg = {
  ingenEttersending: () =>
    cy.get('[data-test-id="skal-ettersende-dokumentasjon-nei"]'),
  harEttersendingSenere: () =>
    cy.get('[data-test-id="skal-ettersende-dokumentasjon-ja"]'),
  harEttersendingAlt: () =>
    cy.get('[data-test-id="skal-ettersende-dokumentasjon-ferdig"]'),
  opplastKnapp: () => cy.get('.attachmentButton'),
};

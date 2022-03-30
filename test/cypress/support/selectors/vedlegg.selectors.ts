export const vedlegg = {
  digital: () => cy.get('[data-test-id="vedlegg-type-digital"]'),
  papir: () => cy.get('[data-test-id="vedlegg-type-papir"]'),
  ingen: () => cy.get('[data-test-id="vedlegg-type-ingen"]'),
  opplastKnapp: () => cy.get('.attachmentButton'),
};

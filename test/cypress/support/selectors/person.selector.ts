export const person = {
  personvelger: (index: number = 1) =>
    cy.get(`.person-link-panel:nth-child(${index})`),
};

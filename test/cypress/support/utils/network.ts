export const network = {
  intercept: (
    url: string,
    fixture?: string,
    forceFixture: boolean = false,
    statusCode = 200
  ): Cypress.Chainable<null> => {
    const local = Cypress.env('local') || false;
    const useFixtureIfLocal = local && forceFixture && fixture;

    if (useFixtureIfLocal || (fixture && !local)) {
      return cy.intercept(url, { fixture: fixture });
    }

    return cy.intercept(url);
  },
};

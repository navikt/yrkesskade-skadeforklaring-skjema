export const ulykken = {
  timetype: (index: number) => cy.get('[data-test-id="tidstype-valg"]'),
  timeframeWhenDate: () => cy.get('.timeframe-when-date input'),
  timeframeWhenTime: () => cy.get('[data-test-id="timeframe-when-time"]'),
  timeframeWhenTimeSelect: (index: number) =>
    cy.get(`.react-datepicker__time-list-item:nth-child(${index})`),
  timeframeWhenOverPeriod: () =>
    cy.get('[data-test-id=timeframe-when-over-periode]'),
  arbeidsbeskrivelse: () => cy.get('.ulykke-arbeidsbeskrivelse'),
  ulykkesbeskrivelse: () => cy.get('.ulykke-ulykkesbeskrivelse'),
  antallFravaersdager: () =>
    cy.get('[data-test-id="data-test-id="fravaer-antall-dager"]'),
  fravaer: {
    valgTreDagerEllerMindre: () =>
      cy.get('[data-test-id="fravaer-valg-treDagerEllerMindre"]'),
    valgNei: () => cy.get('[data-test-id="fravaer-valg-nei"]'),
    sykemelding: () => cy.get('[data-test-id="fravaer-type-sykemelding"]'),
    egenmelding: () => cy.get('[data-test-id="fravaer-type-egenmelding"]'),
    antallDager: () => cy.get('[data-test-id="fravaer-antall-dager"]'),
  },
  lege: {
    oppsoktJa: () => cy.get('[data-test-id="lege-oppsokt-ja"]'),
    oppsoktNei: () => cy.get('[data-test-id="lege-oppsokt-nei"]'),
    behandlerNavn: () => cy.get('[data-test-id="lege-behandler-navn"]'),
    behandlerAdresse: () => cy.get('[data-test-id="lege-behandler-adresse"]'),
    behandlerPostnummer: () =>
      cy.get('[data-test-id="lege-behandler-postnummer"]'),
    behandlerPoststed: () => cy.get('[data-test-id="lege-behandler-poststed"]'),
  },
};

import { general } from '../support/selectors/general-form.selector';
import { oppsummering } from '../support/selectors/oppsummering.selector';
import { ulykken } from '../support/selectors/ulykken.selectors';
import { endpointUrls } from '../support/utils/endpointUrls';
import { network } from '../support/utils/network';
import * as dayjs from 'dayjs';
import { vedlegg } from '../support/selectors/vedlegg.selectors';

describe('Skadeforklaring skjema', () => {
  beforeEach(() => {
    cy.intercept(endpointUrls.vedlegg, {
      statusCode: 201,
      headers: {
        location: '/test/test',
      },
    }).as('postVedlegg');
    cy.visit('');
    cy.location().should('to.be', 'http://localhost:3006/');
  });

  it.only('med vedlegg - ingen avvik', () => {
    const injuryTime = dayjs();

    network
      .intercept(endpointUrls.innlogget, 'innlogget.json')
      .as('getInnlogget');

    general.nextStep().click();

    // velg tidspunkt
    ulykken
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    ulykken
      .timeframeWhenTime()
      .type('{selectall}' + injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til

    ulykken
      .arbeidsbeskrivelse()
      .type('Jeg drev med programmerings oppgaver ved plassen min');

    ulykken
      .ulykkesbeskrivelse()
      .type(
        'Jeg skrev på tastaturet da lampen falt i hodet på meg og kuttet av høyre øre.'
      );

    // fravær
    ulykken.fravaer.valgJa().click();
    ulykken.fravaer.sykemelding().click();
    ulykken.fravaer.antallDager().type('4');

    // lege
    ulykken.lege.oppsoktJa().click();
    ulykken.lege.behandlerNavn().type('Test Testesen');

    // gå til vedlegg
    general.nextStep().click();

    vedlegg.digital().click();
    vedlegg
      .opplastKnapp()
      .attachFile('test-dokument.pdf', { subjectType: 'drag-n-drop' });
    cy.wait('@postVedlegg');

    // gå til oppsummering
    general.nextStep().click();

    oppsummering.submit().click();
    cy.location().should('to.be', 'http://localhost:3006/skjema/kvittering');
  });

  it('med papir vedlegg - ingen avvik', () => {
    const injuryTime = dayjs();

    network
      .intercept(endpointUrls.innlogget, 'innlogget.json')
      .as('getInnlogget');

    general.nextStep().click();

    // velg tidspunkt
    ulykken
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    ulykken
      .timeframeWhenTime()
      .type('{selectall}' + injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til

    ulykken
      .arbeidsbeskrivelse()
      .type('Jeg drev med programmerings oppgaver ved plassen min');

    ulykken
      .ulykkesbeskrivelse()
      .type(
        'Jeg skrev på tastaturet da lampen falt i hodet på meg og kuttet av høyre øre.'
      );

    // fravær
    ulykken.fravaer.valgNei().click();

    // lege
    ulykken.lege.oppsoktNei().click();

    // gå til vedlegg
    general.nextStep().click();

    vedlegg.papir().click();

    // gå til oppsummering
    general.nextStep().click();

    oppsummering.submit().click();
    cy.location().should('to.be', 'http://localhost:3006/skjema/kvittering');
  });

  it('feilet innlogging', () => {
    network
      .intercept(endpointUrls.innlogget, 'innlogget.json', 401)
      .as('getInnlogget');
  });
});

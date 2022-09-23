/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Fravaer } from './Fravaer';
import type { Helseinstitusjon } from './Helseinstitusjon';
import type { Innmelder } from './Innmelder';
import type { Skadelidt } from './Skadelidt';
import type { Tid } from './Tid';
import type { Vedleggreferanse } from './Vedleggreferanse';

/**
 * skadeforklaring som skal sendes inn
 */
export type Skadeforklaring = {
    saksnummer?: string;
    innmelder: Innmelder;
    skadelidt: Skadelidt;
    arbeidetMedIUlykkesoeyeblikket: string;
    noeyaktigBeskrivelseAvHendelsen: string;
    tid: Tid;
    /**
     * Informasjon om dokumentasjon skal ettersendes eller om alt er lagt ved. Gyldige verdier er 'ja','nei' og 'ferdig'
     */
    skalEttersendeDokumentasjon: string;
    vedleggreferanser: Array<Vedleggreferanse>;
    fravaer: Fravaer;
    /**
     * Beskriver om skadelidt har vært hos medisinsk behandler. Gyldige verdier er 'ja' eller 'nei'
     */
    erHelsepersonellOppsokt: string;
    helseinstitusjoner: Array<Helseinstitusjon>;
    /**
     * Dato for når første helsepersonell ble oppsøkt
     */
    foersteHelsepersonellOppsoktDato?: string;
};

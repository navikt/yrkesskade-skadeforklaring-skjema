/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Behandler } from './Behandler';
import type { Fravaer } from './Fravaer';
import type { Innmelder } from './Innmelder';
import type { Skadelidt } from './Skadelidt';
import type { Tid } from './Tid';
import type { Vedleggreferanse } from './Vedleggreferanse';

/**
 * skadeforklaring som skal sendes inn
 */
export type Skadeforklaring = {
    saksnummer?: string;
    innmelder?: Innmelder;
    skadelidt?: Skadelidt;
    arbeidetMedIUlykkesoeyeblikket: string;
    noeyaktigBeskrivelseAvHendelsen: string;
    tid: Tid;
    vedleggtype: string;
    vedleggreferanser: Array<Vedleggreferanse>;
    fravaer: Fravaer;
    behandler: Behandler;
};

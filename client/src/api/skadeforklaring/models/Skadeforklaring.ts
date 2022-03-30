/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Behandler } from './Behandler';
import type { Fravaer } from './Fravaer';
import type { Tid } from './Tid';
import type { Vedleggreferanse } from './Vedleggreferanse';

export type Skadeforklaring = {
    identifikator?: string;
    arbeidsbeskrivelse?: string;
    ulykkesbeskrivelse?: string;
    tid?: Tid;
    vedleggtype?: string;
    vedleggreferanser?: Array<Vedleggreferanse>;
    fravaer?: Fravaer;
    behandler?: Behandler;
};

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Person } from './Person';

export type Brukerinfo = {
    identifikator: string;
    navn: string;
    fodselsdato: string;
    foreldreansvar: Array<Person>;
};


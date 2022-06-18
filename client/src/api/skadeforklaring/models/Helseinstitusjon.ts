/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Adresse } from './Adresse';

export type Helseinstitusjon = {
    /**
     * Beskriver om skadelidt har vært hos medisinsk behandler. Gyldige verdier er 'ja' eller 'nei'
     */
    erHelsepersonellOppsokt: string;
    navn?: string;
    adresse?: Adresse;
};


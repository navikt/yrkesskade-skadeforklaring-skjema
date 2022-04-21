/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Adresse } from './Adresse';

export type Behandler = {
    /**
     * Beskriver om skadelidt har vært hos medisinsk behandler. Gyldige verdier er 'ja' eller 'nei'
     */
    erBehandlerOppsokt: string;
    behandlerNavn?: string;
    adresse?: Adresse;
};

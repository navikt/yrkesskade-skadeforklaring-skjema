/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Fravaer = {
    /**
     * Beskriver om det har vært fravær i forbindelse med skaden. Gyldige verdier hentes fra kodeverktjenesten for typen 'foerteDinSkadeEllerSykdomTilFravaer'
     */
    foerteDinSkadeEllerSykdomTilFravaer: string;
    /**
     * Beskriver hvilken type fravær det har vært i forbindelse med skaden. Gyldige verdier hentes fra kodeverktjenesten for typen 'fravaertype'
     */
    fravaertype?: string;
};

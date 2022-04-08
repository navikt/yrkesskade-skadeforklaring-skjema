/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Periode } from './Periode';

/**
 * Tid for ulykken. Kan være et tidspunkt eller over en periode
 */
export type Tid = {
    tidstype?: string;
    tidspunkt?: string;
    periode?: Periode;
};

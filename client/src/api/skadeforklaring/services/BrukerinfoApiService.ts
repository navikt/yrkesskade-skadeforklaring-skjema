/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Brukerinfo } from '../models/Brukerinfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BrukerinfoApiService {

    /**
     * Hent informasjon om pålogget bruker
     * @returns Brukerinfo Brukerinfo
     * @throws ApiError
     */
    public static hentBrukerinfo(): CancelablePromise<Brukerinfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/brukerinfo',
            errors: {
                400: `Bad request`,
                413: `Payload too large`,
                422: `Virus oppdaget i vedlegg`,
                500: `Internal Server Error`,
            },
        });
    }

}
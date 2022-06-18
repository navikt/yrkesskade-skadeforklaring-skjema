/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Skadeforklaring } from '../models/Skadeforklaring';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkadeforklaringApiService {

    /**
     * Send inn skadeforklaring
     * @param requestBody
     * @returns any Skadeforklaring opprettet
     * @throws ApiError
     */
    public static postSkadeforklaring(
        requestBody: Skadeforklaring,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/skadeforklaringer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                413: `Payload too large`,
                422: `Virus oppdaget i vedlegg`,
                500: `Internal Server Error`,
            },
        });
    }

}

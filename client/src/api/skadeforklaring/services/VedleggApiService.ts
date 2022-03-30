/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VedleggApiService {

    /**
     * Last opp vedlegg. Max 8MB
     * @param formData
     * @returns string Vedlegg lastet opp
     * @throws ApiError
     */
    public static lastOppVedlegg(
        formData?: {
            id: string;
            vedlegg: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/vedlegg',
            formData: formData,
            mediaType: 'multipart/form-data',
            responseHeader: 'location',
            errors: {
                413: `Payload too large`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Slett vedlegg
     * @param id
     * @returns any Vedlegg slettet
     * @throws ApiError
     */
    public static slettVedlegg(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/vedlegg/{id}',
            path: {
                'id': id,
            },
            errors: {
                413: `Payload too large`,
                500: `Internal Server Error`,
            },
        });
    }

}
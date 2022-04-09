/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KodekategoriResponsDto } from '../models/KodekategoriResponsDto';
import type { KodetypeResponsDto } from '../models/KodetypeResponsDto';
import type { KodeverdiListeResponsDto } from '../models/KodeverdiListeResponsDto';
import type { KodeverdiResponsDto } from '../models/KodeverdiResponsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KodeverkControllerService {

    /**
     * @returns KodetypeResponsDto OK
     * @throws ApiError
     */
    public static hentKodeverktyper(): CancelablePromise<KodetypeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer',
        });
    }

    /**
     * @param typenavn
     * @returns KodekategoriResponsDto OK
     * @throws ApiError
     */
    public static hentKodeverkkategorier(
        typenavn: string,
    ): CancelablePromise<KodekategoriResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier',
            path: {
                'typenavn': typenavn,
            },
        });
    }

    /**
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiListeResponsDto OK
     * @throws ApiError
     */
    public static hentListeMedKodeverdierForTypeOgKategori(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiListeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier/{kategorinavn}/kodeverdierliste',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
        });
    }

    /**
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto OK
     * @throws ApiError
     */
    public static hentMapMedKodeverdierForTypeOgKategori(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier/{kategorinavn}/kodeverdier',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
        });
    }

}
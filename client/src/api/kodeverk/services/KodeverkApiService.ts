/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KodekategoriResponsDto } from '../models/KodekategoriResponsDto';
import type { KodetypeResponsDto } from '../models/KodetypeResponsDto';
import type { KodeverdiResponsDto } from '../models/KodeverdiResponsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KodeverkApiService {

    /**
     * Hent liste over tilgjengelige typer
     * @returns KodetypeResponsDto Kodeverktyper hentet
     * @throws ApiError
     */
    public static hentKodeverktyper(): CancelablePromise<KodetypeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer',
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over kodeverdier for en type
     * @param typenavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
     * @throws ApiError
     */
    public static hentListeKodeverdierForType(
        typenavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kodeverdierliste',
            path: {
                'typenavn': typenavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over kodeverdier for en type
     * @param typenavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
     * @throws ApiError
     */
    public static hentKodeverdierForType(
        typenavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kodeverdier',
            path: {
                'typenavn': typenavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over tilgjengelige kategorier for en type
     * @param typenavn
     * @returns KodekategoriResponsDto Kodeverkkategorier hentet for kodetype
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
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over tilgjengelige kategorier
     * @returns KodetypeResponsDto Kodeverkkategorier hentet
     * @throws ApiError
     */
    public static hentKodeverkategorier(): CancelablePromise<KodetypeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/kategorier',
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over tilgjengelige typer for en kategori
     * @param kategorinavn
     * @returns KodetypeResponsDto Kodeverktyper hentet
     * @throws ApiError
     */
    public static hentKodeverktyper1(
        kategorinavn: string,
    ): CancelablePromise<KodetypeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/kategorier/{kategorinavn}/typer',
            path: {
                'kategorinavn': kategorinavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over kodeverdier for en type og kategori
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
     * @throws ApiError
     */
    public static hentListeMedKodeverdierForTypeOgKategori(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier/{kategorinavn}/kodeverdierliste',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent liste over kodeverdier for en type og kategori
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
     * @throws ApiError
     */
    public static hentListeMedKodeverdierForTypeOgKategori1(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/kategorier/{kategorinavn}/typer/{typenavn}/kodeverdierliste',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent samling kodeverdier for en type og kategori
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
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
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Hent samling kodeverdier for en type og kategori
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto Kodeverkverdier hentet
     * @throws ApiError
     */
    public static hentMapMedKodeverdierForTypeOgKategori1(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/kategorier/{kategorinavn}/typer/{typenavn}/kodeverdier',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
            errors: {
                404: `Kunne ikke finne ressurs`,
                500: `Internal Server Error`,
            },
        });
    }

}

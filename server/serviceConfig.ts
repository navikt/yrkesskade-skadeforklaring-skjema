import { IService } from '@navikt/yrkesskade-backend/dist/typer';

let proxyUrls: { [key: string]: string } = {};
if (process.env.ENV === 'local') {
  proxyUrls = {
    yrkesskade_kodeverk: 'http://localhost:8080',
    yrkesskade_skadeforklaring_api: 'http://localhost:9082',
  };
} else {
  const env = process.env.ENV === 'prod' ? '' : `.${process.env.ENV}`;
  proxyUrls = {
    yrkesskade_kodeverk: `https://yrkesskade-kodeverk${env}.intern.nav.no`,
    yrkesskade_skadeforklaring_api: `https://yrkesskade-skadeforklaring-api${env}.intern.nav.no`,
  };
}

export const serviceConfig: IService[] = [
  {
    cluster: 'gcp',
    displayName: 'Yrkesskade Kodeverk',
    id: 'yrkesskade-kodeverk',
    proxyPath: '/kodeverk',
    proxyUrl: proxyUrls.yrkesskade_kodeverk,
  },
  {
    cluster: 'gcp',
    displayName: 'Yrkesskade Skadeforklaring API',
    id: 'yrkesskade-skadeforklaring-api',
    proxyPath: '/backend',
    proxyUrl: proxyUrls.yrkesskade_skadeforklaring_api,
  },
];

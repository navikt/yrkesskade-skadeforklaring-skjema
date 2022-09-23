import {
  // PdfAdresse,
  PdfHelseinstitusjon,
  PdfDokumentInfo,
  PdfFravaer,
  PdfInnmelder,
  PdfPeriode,
  PdfSkadeforklaring,
  PdfSkadelidt,
  PdfTekster,
  PdfTid,
  PdfTidspunkt,
} from './models';
import {
  Skadeforklaring,
  Innmelder,
  Skadelidt,
  Tid,
  Helseinstitusjon,
  // Adresse,
  Fravaer,
} from '../../client/src/api/skadeforklaring';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import { capitalize } from '../../client/src/utils/string';
import { KodeverkLoader } from '../kodeverk/kodeverk';

export const formatDate = (date: any, formatStr: string) =>
  format(date, formatStr, { locale: nb });

const DATO_FORMAT = 'dd.MM.yyyy';
const KLOKKESLETT_FORMAT = 'HH:mm';

export const pdfSkadeforklaringMapper = async (
  skadeforklaring: Skadeforklaring
): Promise<PdfSkadeforklaring> => {
  // hent kodeverk
  const kodeverkLoader = new KodeverkLoader();
  await kodeverkLoader.init();

  return {
    identifikator: '',
    innmelder: mapInnmelder(skadeforklaring.innmelder, kodeverkLoader),
    skadelidt: mapSkadelidt(skadeforklaring.skadelidt),
    tid: mapTid(skadeforklaring.tid),
    helseinstitusjoner: mapHelseinstitusjon(skadeforklaring.helseinstitusjoner),
    foersteHelsepersonellOppsoktDato: {
      label: 'Når hadde du første time hos lege/behandler?',
      verdi: formatDate(parseISO(skadeforklaring.foersteHelsepersonellOppsoktDato), DATO_FORMAT)
    },
    erHelsepersonellOppsokt: {
      label: 'Ble helsepersonell oppsøkt etter skaden?',
      verdi: capitalize(skadeforklaring.erHelsepersonellOppsokt),
    },
    dokumentInfo: hentDokumentinfo(),
    fravaer: mapFravaer(skadeforklaring.fravaer, kodeverkLoader),
    arbeidetMedIUlykkesoeyeblikket: {
      label: 'Hva arbeidet du med i ulykkesøyeblikket',
      verdi: skadeforklaring.arbeidetMedIUlykkesoeyeblikket,
    },
    noeyaktigBeskrivelseAvHendelsen: {
      label: 'Gi en så nøyaktig beskrivelse av hendelsen som mulig',
      verdi: skadeforklaring.noeyaktigBeskrivelseAvHendelsen,
    },
    vedleggInfo: mapVedleggInfo(skadeforklaring),
  };
};

const mapVedleggInfo = (skadeforklaring: Skadeforklaring) => {
  const vedlegg = skadeforklaring.vedleggreferanser.map(
    (vedleggreferanse) => vedleggreferanse.navn
  );
  if (skadeforklaring.skalEttersendeDokumentasjon === 'ja') {
    vedlegg.push('Skal ettersende dokumentasjon');
  }
  else {
    vedlegg.push('Bruker har ingenting mer å tilføye')
  }
  return {
    label: 'Vedlegg',
    verdi: vedlegg,
  };
};

const mapInnmelder = (
  innmelder: Innmelder,
  kodeverkLoader: KodeverkLoader
): PdfInnmelder => {
  return {
    norskIdentitetsnummer: {
      label: 'Fødselsnummer',
      verdi: innmelder.norskIdentitetsnummer,
    },
    navn: { label: 'Navn', verdi: '' },
    innmelderrolle: {
      label: 'Innmelderrolle',
      verdi: kodeverkLoader.mapKodeTilVerdi(
        innmelder.innmelderrolle,
        'innmelderrolle'
      ),
    },
  };
};

const mapSkadelidt = (skadelidt: Skadelidt): PdfSkadelidt => {
  return {
    norskIdentitetsnummer: {
      label: 'Fødselsnummer',
      verdi: skadelidt.norskIdentitetsnummer,
    },
  };
};

const mapHelseinstitusjon = (
  helseinstitusjoner: Helseinstitusjon[]
): PdfHelseinstitusjon => {
  return {
    navn: {
      label: 'Hvor har du blitt behandlet (valgfritt)',
      verdi: helseinstitusjoner.map(instutisjon => `${instutisjon.navn} `).toString(),
    },
  };
};

const mapFravaer = (
  fravaer: Fravaer,
  kodeverkLoader: KodeverkLoader
): PdfFravaer => {
  return {
    foerteDinSkadeEllerSykdomTilFravaer: {
      label: 'Førte din skade/sykdom til fravær?',
      verdi: kodeverkLoader.mapKodeTilVerdi(
        fravaer.foerteDinSkadeEllerSykdomTilFravaer,
        'foerteDinSkadeEllerSykdomTilFravaer'
      ),
    },
    fravaertype: {
      label: 'Type fravær',
      verdi: kodeverkLoader.mapKodeTilVerdi(fravaer.fravaertype, 'fravaertype'),
    },
  };
};

const mapTid = (tid: Tid): PdfTid => {
  if (tid.tidstype === 'TIDSPUNKT') {
    return {
      tidspunkt: {
        label: 'Tidspunkt',
        verdi: {
          dato: formatDate(parseISO(tid.tidspunkt), DATO_FORMAT),
          klokkeslett: formatDate(parseISO(tid.tidspunkt), KLOKKESLETT_FORMAT),
        } as PdfTidspunkt,
      },
      tidstype: tid.tidstype,
    };
  } else if (tid.tidstype === 'PERIODE') {
    return {
      tidstype: tid.tidstype,
      periode: {
        label: 'Periode',
        verdi: {
          fra: formatDate(parseISO(tid.periode.fra), DATO_FORMAT),
          til: formatDate(parseISO(tid.periode.til), DATO_FORMAT),
        } as PdfPeriode,
      },
    };
  }
};

// const mapAdresse = (adresse: Adresse): PdfAdresse => {
//   return {
//     adresselinje1: adresse?.adresse,
//     adresselinje2: `${adresse?.postnummer} ${adresse?.poststed}`,
//     adresselinje3: null,
//     land: '',
//   };
// };

const hentDokumentinfo = (): PdfDokumentInfo => {
  return {
    dokumentnavn: 'Kopi av skadeforklaring',
    dokumentDatoPrefix: 'Kopi generert',
    dokumentDato: formatDate(new Date(), DATO_FORMAT),
    dokumentnummer:
      'Dette dokumenter er en oppsummering av det som er sendt til NAV',
    tekster: hentDokumenttekster(),
  };
};

const hentDokumenttekster = (): PdfTekster => {
  return {
    innmelderSeksjonstittel: 'Om innmelder',
    omSkadenFlereSkader: 'Flere skader',
    omSkadenSeksjonstittel: 'Om fravær og behandling',
    omUlykkenSeksjonstittel: 'Om ulykken',
    skadelidtSeksjonstittel: 'Den skadelidte',
    tidOgStedSeksjonstittel: 'Tid og sted',
    vedleggSeksjonstittel: 'Vedlegg',
  };
};

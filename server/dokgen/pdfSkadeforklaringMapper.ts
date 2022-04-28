import {
  PdfAdresse,
  PdfBehandler,
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
  Adresse,
  Fravaer,
} from '../../client/src/api/skadeforklaring';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formatDate = (date: any, formatStr: string) =>
  format(date, formatStr, { locale: nb });

const DATO_FORMAT = 'dd.MM.yyyy';
const KLOKKESLETT_FORMAT = 'HH:mm';

export const pdfSkadeforklaringMapper = (
  skadeforklaring: Skadeforklaring
): PdfSkadeforklaring => {
  return {
    identifikator: '',
    innmelder: mapInnmelder(skadeforklaring.innmelder),
    skadelidt: mapSkadelidt(skadeforklaring.skadelidt),
    tid: mapTid(skadeforklaring.tid),
    helseinstitusjon: mapHelseinstitusjon(skadeforklaring.helseinstitusjon),
    dokumentInfo: hentDokumentinfo(),
    fravaer: mapFravaer(skadeforklaring.fravaer),
    arbeidetMedIUlykkesoeyeblikket: {
      label: 'Hva arbeidet du med i ulykkesøyeblikket',
      verdi: skadeforklaring.arbeidetMedIUlykkesoeyeblikket,
    },
    noeyaktigBeskrivelseAvHendelsen: {
      label: 'Gi en så nøyaktig beskrivelse av hendelsen som mulig',
      verdi: skadeforklaring.noeyaktigBeskrivelseAvHendelsen,
    },
  };
};

const mapInnmelder = (innmelder: Innmelder): PdfInnmelder => {
  return {
    norskIdentitetsnummer: {
      label: 'Fødselsnummer',
      verdi: innmelder.norskIdentitetsnummer,
    },
    navn: { label: 'Navn', verdi: '' },
    innmelderrolle: {
      label: 'Innmelderrolle',
      verdi: innmelder.innmelderrolle,
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
  helseinstitusjon: Helseinstitusjon
): PdfBehandler => {
  return {
    erHelsepersonellOppsokt: {
      label: 'Ble helseinstitusjon oppsøkt etter skaden?',
      verdi: helseinstitusjon.erHelsepersonellOppsokt,
    },
    behandlernavn: {
      label: 'Navn på helseforetak, legevakt eller lege',
      verdi: helseinstitusjon.navn,
    },
    behandleradresse: {
      label: 'Adresse',
      verdi: mapAdresse(helseinstitusjon.adresse),
    },
  };
};

const mapFravaer = (fravaer: Fravaer): PdfFravaer => {
  return {
    foerteDinSkadeEllerSykdomTilFravaer: {
      label: 'Førte din skade/sykdom til fravær?',
      verdi: fravaer.foerteDinSkadeEllerSykdomTilFravaer,
    },
    fravaertype: { label: 'Type fravær', verdi: fravaer.fravaertype },
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

const mapAdresse = (adresse: Adresse): PdfAdresse => {
  return {
    adresselinje1: adresse?.adresse,
    adresselinje2: `${adresse?.postnummer} ${adresse?.poststed}`,
    adresselinje3: null,
    land: '',
  };
};

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
    omSkadenSeksjonstittel: 'Om skaden',
    omUlykkenSeksjonstittel: 'Om ulykken',
    skadelidtSeksjonstittel: 'Den skadelidte',
    tidOgStedSeksjonstittel: 'Tid og sted',
  };
};

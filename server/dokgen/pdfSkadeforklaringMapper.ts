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
import dayjs from 'dayjs';
import {
  Skadeforklaring,
  Innmelder,
  Skadelidt,
  Tid,
  Behandler,
  Adresse,
  Fravaer,
} from '../../client/src/api/skadeforklaring';

const DATO_FORMAT = 'DD.MM.YYYY';
const KLOKKESLETT_FORMAT = 'HH:mm';

export const pdfSkadeforklaringMapper = (
  skadeforklaring: Skadeforklaring
): PdfSkadeforklaring => {
  return {
    innmelder: mapInnmelder(skadeforklaring.innmelder),
    skadelidt: mapSkadelidt(skadeforklaring.skadelidt),
    tid: mapTid(skadeforklaring.tid),
    behandler: mapBehandler(skadeforklaring.behandler),
    dokumentInfo: hentDokumentinfo(),
    fravaer: mapFravaer(skadeforklaring.fravaer),
    arbeidsbeskrivelse: {
      label: 'Hva arbeidet du med i ulykkesøyeblikket',
      verdi: skadeforklaring.arbeidsbeskrivelse,
    },
    ulykkesbeskrivelse: {
      label: 'Gi en så nøyaktig beskrivelse av hendelsen som mulig',
      verdi: skadeforklaring.ulykkesbeskrivelse,
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
      verdi: innmelder.rolle,
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

const mapBehandler = (behandler: Behandler): PdfBehandler => {
  return {
    erBehandlerOppsokt: {
      label: 'Ble behandler oppsøkt etter skaden?',
      verdi: behandler.erBehandlerOppsokt,
    },
    behandlernavn: {
      label: 'Navn på helseforetak, legevakt eller lege',
      verdi: behandler.behandlerNavn,
    },
    behandleradresse: {
      label: 'Adresse',
      verdi: mapAdresse(behandler.adresse),
    },
  };
};

const mapFravaer = (fravaer: Fravaer): PdfFravaer => {
  return {
    harFravaer: {
      label: 'Førte din skade/sykdom til fravær?',
      verdi: fravaer.harFravaer,
    },
    fravaertype: { label: 'Type fravær', verdi: fravaer.fravaertype },
  };
};

const mapTid = (tid: Tid): PdfTid => {
  if (tid.tidstype === 'Tidspunkt') {
    return {
      tidspunkt: {
        label: 'Tidspunkt',
        verdi: {
          dato: dayjs(tid.tidspunkt).format(DATO_FORMAT),
          klokkeslett: dayjs(tid.tidspunkt).format(KLOKKESLETT_FORMAT),
        } as PdfTidspunkt,
      },
      tidstype: tid.tidstype,
    };
  } else if (tid.tidstype === 'Periode') {
    return {
      tidstype: tid.tidstype,
      periode: {
        label: 'Periode',
        verdi: {
          fra: dayjs(tid.periode.fra).format(DATO_FORMAT),
          til: dayjs(tid.periode.til).format(DATO_FORMAT),
        } as PdfPeriode,
      },
    };
  }
};

const mapAdresse = (adresse: Adresse): PdfAdresse => {
  return {
    adresselinje1: adresse.adresse,
    adresselinje2: `${adresse.postnummer} ${adresse.poststed}`,
    adresselinje3: null,
    land: '',
  };
};

const hentDokumentinfo = (): PdfDokumentInfo => {
  return {
    dokumentnavn: 'Kopi av skademelding',
    dokumentDatoPrefix: 'Kopi generert',
    dokumentDato: dayjs(new Date()).format(DATO_FORMAT),
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

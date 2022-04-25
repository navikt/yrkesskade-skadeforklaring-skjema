export interface Soknadsfelt<T> {
  label: string;
  verdi: T;
}

export interface PdfInnmelder {
  norskIdentitetsnummer: Soknadsfelt<string>;
  navn?: Soknadsfelt<string>;
  innmelderrolle: Soknadsfelt<string>;
}

export interface PdfSkadelidt {
  norskIdentitetsnummer: Soknadsfelt<string>;
  navn?: Soknadsfelt<string>;
}
export interface PdfAdresse {
  adresselinje1?: string;
  adresselinje2?: string;
  adresselinje3?: string;
  land?: string;
}

export interface PdfTid {
  tidstype: string;
  tidspunkt?: Soknadsfelt<PdfTidspunkt>;
  periode?: Soknadsfelt<PdfPeriode>;
}

export interface PdfTidspunkt {
  dato: string;
  klokkeslett: string;
}

export interface PdfPeriode {
  fra: string;
  til: string;
}

export interface PdfBehandler {
  erHelsepersonellOppsokt: Soknadsfelt<string>;
  behandlernavn: Soknadsfelt<string>;
  behandleradresse: Soknadsfelt<PdfAdresse>;
}

export interface PdfFravaer {
  foerteDinSkadeEllerSykdomTilFravaer: Soknadsfelt<string>;
  fravaertype: Soknadsfelt<string>;
}

export interface PdfSkadeforklaring {
  identifikator: string;
  innmelder: PdfInnmelder;
  skadelidt: PdfSkadelidt;
  tid: PdfTid;
  arbeidsbeskrivelse: Soknadsfelt<string>;
  ulykkesbeskrivelse: Soknadsfelt<string>;
  fravaer: PdfFravaer;
  helseinstitusjon: PdfBehandler;
  dokumentInfo: PdfDokumentInfo;
}

export interface PdfDokumentInfo {
  dokumentnavn: string;
  dokumentnummer: string;
  dokumentDatoPrefix: string;
  dokumentDato: string;
  tekster: PdfTekster;
}

export interface PdfTekster {
  innmelderSeksjonstittel: string;
  tidOgStedSeksjonstittel: string;
  skadelidtSeksjonstittel: string;
  omUlykkenSeksjonstittel: string;
  omSkadenSeksjonstittel: string;
  omSkadenFlereSkader: string;
}

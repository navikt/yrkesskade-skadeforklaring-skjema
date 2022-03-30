import { BodyLong, BodyShort, Label } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import { formatDate } from '../../../utils/date';

const UlykkenOppsummering = () => {
  const DATO_FORMAT = 'dd.MM.yyyy';

  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const ulykkestid = () => {
    switch (skadeforklaring.tid?.tidstype) {
      case 'Tidspunkt':
        return formatDato(
          skadeforklaring.tid.tidspunkt,
          `${DATO_FORMAT} HH:MM`
        );
      case 'Periode':
        return `${formatDato(skadeforklaring.tid.periode?.fra)} - ${formatDato(
          skadeforklaring.tid.periode?.til
        )}`;
      default:
        return 'Kunne ikke fastslå ulykkestidspunkt';
    }
  };

  const formatDato = (
    dato: string | undefined,
    format: string = DATO_FORMAT
  ) => {
    if (!dato) {
      return 'Ukjent';
    }

    return formatDate(parseISO(dato), format);
  };

  return (
    <>
      <Label>Når skjedde ulykken?</Label>
      <BodyShort spacing>{ulykkestid()}</BodyShort>
      <Label>Hva arbeidet du med i ulykkesøyeblikket?</Label>
      <BodyLong spacing>{skadeforklaring.arbeidsbeskrivelse}</BodyLong>
      <Label>Beskrivelse av hendelsen</Label>
      <BodyLong spacing>{skadeforklaring.ulykkesbeskrivelse}</BodyLong>
      <Label>Førte din skade/sykdom til fravær?</Label>
      <BodyShort spacing>{skadeforklaring.fravaer?.harFravaer}</BodyShort>
      <Label>Antall fraværsdager</Label>
      <BodyShort spacing>{skadeforklaring.fravaer?.antallDager}</BodyShort>
      <Label>Ble lege oppsøkt etter skaden?</Label>
      <BodyShort spacing>
        {skadeforklaring.behandler?.erBehandlerOppsokt}
      </BodyShort>
      <Label>Navn på helseforetak, legevakt eller lege</Label>
      <BodyShort spacing>{skadeforklaring.behandler?.behandlerNavn}</BodyShort>
    </>
  );
};

export default UlykkenOppsummering;

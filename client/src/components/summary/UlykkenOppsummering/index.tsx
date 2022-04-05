import { BodyLong, Label } from '@navikt/ds-react';
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
    console.log('tidstype: ', skadeforklaring.tid?.tidstype);

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
      <BodyLong spacing>{ulykkestid()}</BodyLong>
      <Label>Hva arbeidet du med i ulykkesøyeblikket?</Label>
      <BodyLong spacing>{skadeforklaring.arbeidsbeskrivelse}</BodyLong>
      <Label>Beskrivelse av hendelsen</Label>
      <BodyLong spacing>{skadeforklaring.ulykkesbeskrivelse}</BodyLong>
      <Label>Førte din skade/sykdom til fravær?</Label>
      <BodyLong spacing>
        {skadeforklaring.fravaer?.harFravaer ? 'Ja' : 'Nei'}
      </BodyLong>
      <Label>Antall fraværsdager</Label>
      <BodyLong spacing>{skadeforklaring.fravaer?.antallDager}</BodyLong>
      <Label>Ble lege oppsøkt etter skaden?</Label>
      <BodyLong spacing>
        {skadeforklaring.behandler?.erBehandlerOppsokt ? 'Ja' : 'Nei'}
      </BodyLong>
      {skadeforklaring.behandler?.erBehandlerOppsokt && (
        <>
          <Label>Navn på helseforetak, legevakt eller lege</Label>
          <BodyLong spacing>
            {skadeforklaring.behandler?.behandlerNavn}
          </BodyLong>
        </>
      )}
    </>
  );
};

export default UlykkenOppsummering;

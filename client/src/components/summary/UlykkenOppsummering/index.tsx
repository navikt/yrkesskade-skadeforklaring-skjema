import { BodyLong, Label } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { Skadeforklaring, Tid } from '../../../api/skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import { formatDate } from '../../../utils/date';

const UlykkenOppsummering = () => {
  const DATO_FORMAT = 'dd.MM.yyyy';

  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const fravaertyper = useAppSelector((state) =>
    selectKodeverk(state, 'fravaertype')
  );

  const ulykkestid = () => {
    switch (skadeforklaring.tid?.tidstype) {
      case Tid.tidstype.TIDSPUNKT:
        return formatDato(
          skadeforklaring.tid.tidspunkt,
          `${DATO_FORMAT} HH:MM`
        );
      case Tid.tidstype.PERIODE:
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

  const fravaertype = (skadeforklaring: Skadeforklaring): string => {
    if (
      skadeforklaring.fravaer &&
      skadeforklaring.fravaer.fravaertype &&
      fravaertyper
    ) {
      const fravaertypekode: string = skadeforklaring.fravaer.fravaertype;
      return (
        fravaertyper[fravaertypekode]?.verdi || 'Kunne ikke finne kodeverdi'
      );
    }

    return 'Ukjent';
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
      <Label>Type fravær</Label>
      <BodyLong spacing>{fravaertype(skadeforklaring)}</BodyLong>
      <Label>Ble lege oppsøkt etter skaden?</Label>
      <BodyLong spacing={skadeforklaring.behandler?.erBehandlerOppsokt}>
        {skadeforklaring.behandler?.erBehandlerOppsokt ? 'Ja' : 'Nei'}
      </BodyLong>
      {skadeforklaring.behandler?.erBehandlerOppsokt && (
        <>
          <Label>Navn på helseforetak, legevakt eller lege</Label>
          <BodyLong spacing>
            {skadeforklaring.behandler?.behandlerNavn}
          </BodyLong>
          <Label>Adresse</Label>
          <BodyLong spacing>
            {skadeforklaring.behandler.adresse?.adresse}
          </BodyLong>
          <Label>Postnummer og sted</Label>
          <BodyLong>
            {skadeforklaring.behandler?.adresse?.postnummer}{' '}
            {skadeforklaring.behandler?.adresse?.poststed}
          </BodyLong>
        </>
      )}
    </>
  );
};

export default UlykkenOppsummering;

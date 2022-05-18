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

  const foerteDinSkadeEllerSykdomTilFravaer = useAppSelector((state) =>
    selectKodeverk(state, 'foerteDinSkadeEllerSykdomTilFravaer')
  );

  const ulykkestid = () => {
    switch (skadeforklaring.tid?.tidstype) {
      case Tid.tidstype.TIDSPUNKT:
        return formatDato(
          skadeforklaring.tid.tidspunkt,
          `${DATO_FORMAT} HH:mm`
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

  const fravaer = (skadeforklaring: Skadeforklaring): string => {
    if (
      skadeforklaring.fravaer.foerteDinSkadeEllerSykdomTilFravaer &&
      foerteDinSkadeEllerSykdomTilFravaer
    ) {
      return (
        foerteDinSkadeEllerSykdomTilFravaer[
          skadeforklaring.fravaer.foerteDinSkadeEllerSykdomTilFravaer
        ]?.verdi || 'Ukjent'
      );
    }

    return 'Ukjent';
  };

  return (
    <>
      <Label>Når skjedde ulykken?</Label>
      <BodyLong spacing>{ulykkestid()}</BodyLong>
      <Label>Hva arbeidet du med i ulykkesøyeblikket?</Label>
      <BodyLong spacing>
        {skadeforklaring.arbeidetMedIUlykkesoeyeblikket}
      </BodyLong>
      <Label>Beskrivelse av hendelsen</Label>
      <BodyLong spacing>
        {skadeforklaring.noeyaktigBeskrivelseAvHendelsen}
      </BodyLong>
      <Label>Førte din skade/sykdom til fravær?</Label>
      <BodyLong spacing>{fravaer(skadeforklaring)}</BodyLong>
      <Label>Type fravær</Label>
      <BodyLong spacing>{fravaertype(skadeforklaring)}</BodyLong>
      <Label>Ble helsepersonell oppsøkt etter skaden?</Label>
      <BodyLong
        spacing={
          skadeforklaring.helseinstitusjon?.erHelsepersonellOppsokt === 'ja'
        }
      >
        {skadeforklaring.helseinstitusjon?.erHelsepersonellOppsokt === 'ja'
          ? 'Ja'
          : 'Nei'}
      </BodyLong>
      {skadeforklaring.helseinstitusjon?.erHelsepersonellOppsokt === 'ja' && (
        <>
          <Label>Navn på helseforetak, legevakt eller lege</Label>
          <BodyLong spacing>{skadeforklaring.helseinstitusjon?.navn}</BodyLong>
          <Label>Adresse</Label>
          <BodyLong spacing>
            {skadeforklaring.helseinstitusjon.adresse?.adresse}
          </BodyLong>
          <Label>Postnummer og sted</Label>
          <BodyLong>
            {skadeforklaring.helseinstitusjon?.adresse?.postnummer}{' '}
            {skadeforklaring.helseinstitusjon?.adresse?.poststed}
          </BodyLong>
        </>
      )}
    </>
  );
};

export default UlykkenOppsummering;

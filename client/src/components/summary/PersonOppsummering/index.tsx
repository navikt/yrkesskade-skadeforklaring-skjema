import { BodyLong, Label } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectBruker } from '../../../core/reducers/bruker.reducer';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';

const PersonOppsummering = () => {
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const bruker = useAppSelector((state) => selectBruker(state));

  return (
    <>
      <Label>Innmelders fødselsnummer</Label>
      <BodyLong
        spacing={
          bruker.brukerinfo?.identifikator !==
          skadeforklaring.innmelder?.norskIdentitetsnummer
        }
      >
        {bruker.brukerinfo?.identifikator}
      </BodyLong>

      {bruker.brukerinfo?.identifikator !==
        skadeforklaring.skadelidt?.norskIdentitetsnummer && (
        <>
          <Label>Innmelders innmelderrolle</Label>
          <BodyLong spacing>
            {skadeforklaring.innmelder?.innmelderrolle}
          </BodyLong>
          <Label>Melder på vegne av</Label>
          <BodyLong>
            {skadeforklaring.skadelidt?.norskIdentitetsnummer}
          </BodyLong>
        </>
      )}
    </>
  );
};

export default PersonOppsummering;

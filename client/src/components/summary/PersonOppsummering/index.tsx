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
      <BodyLong spacing={bruker.fnr !== skadeforklaring.identifikator}>
        {bruker.fnr}
      </BodyLong>

      {bruker.fnr !== skadeforklaring.identifikator && (
        <>
          <Label>Innmelders rolle</Label>
          <BodyLong spacing>Foresatt?</BodyLong>
          <Label>Melder på vegne av</Label>
          <BodyLong>{skadeforklaring.identifikator}</BodyLong>
        </>
      )}
    </>
  );
};

export default PersonOppsummering;

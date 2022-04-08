import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  BodyLong,
  Ingress,
} from '@navikt/ds-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { logErrorMessage } from '../../utils/logging';

const Feil = () => {
  const location = useLocation();
  const state: any = location.state;

  useEffect(() => {
    logErrorMessage(
      `Bruker har blitt sendt til feilside: Årsak: ${
        state?.melding || 'ukjent'
      }`
    );
  });

  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12}>
          <Heading size="2xlarge" className="pageTitle">
            Dette gikk ikke så bra
          </Heading>
        </Cell>
        <Cell xs={12} lg={6} className="grid-centered--lg">
          <Ingress spacing>Det har oppstått en feil</Ingress>
          <BodyLong spacing>{state?.melding || 'En ukjent feil'}</BodyLong>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Feil;

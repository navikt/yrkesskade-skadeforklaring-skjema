import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  BodyLong,
  Ingress,
} from '@navikt/ds-react';
import { useLocation } from 'react-router';

const Feil = () => {
  const location = useLocation();
  const state: any = location.state;

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
          {state?.melding ? (
            <BodyLong spacing>{state.melding}</BodyLong>
          ) : (
            <BodyLong spacing>En ukjent feil</BodyLong>
          )}
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Feil;

import {
  Cell,
  ContentContainer,
  Grid,
  Heading,
  Ingress,
} from '@navikt/ds-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { logWarningMessage } from '../../utils/logging';

const NotFound = () => {
  const location = useLocation();
  console.log('location: ', location);

  useEffect(() => {
    logWarningMessage(
      `Bruker har prøvd å gå inn på siden ${location.pathname} som ikke ekstisterer`
    );
  });

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div>
            <div>
              <Heading size="2xlarge" spacing data-number="1">
                This is not the page you are looking for.
              </Heading>

              <Ingress spacing>
                Du har av en merksnodig grunn havnet på et sted som ikke
                eksisterer.
              </Ingress>
            </div>
          </div>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default NotFound;

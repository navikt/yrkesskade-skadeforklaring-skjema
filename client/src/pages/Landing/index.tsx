import { Cell, Grid, Heading, Ingress, Loader } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../core/hooks/state.hooks';
import { selectInnlogget } from '../../core/reducers/bruker.reducer';
import { InnloggetStatus } from '../../utils/autentisering';
import { logMessage } from '../../utils/logging';
import './Landing.less';

const Landing = () => {
  const navigate = useNavigate();
  const innloggetBruker = useAppSelector((state) => selectInnlogget(state));

  useEffect(() => {
    if (innloggetBruker === InnloggetStatus.OK) {
      logMessage('Bruker har logget inn og blir sendt videre til skjema siden');
      navigate('skjema');
    }
  }, [innloggetBruker, navigate]);

  return <LandingLaster />;
};

const LandingLaster = () => {
  return (
    <Grid>
      <Cell xs={12} lg={4}></Cell>
      <Cell xs={12} lg={4} className="center">
        <Heading spacing level="3" size="medium">
          <Loader size="xlarge" />
        </Heading>
        <Heading spacing level="3" size="medium">
          Henter opplysninger
        </Heading>
        <Ingress spacing>
          Vennligst vent mens vi henter de nødvendige opplysningene
        </Ingress>
      </Cell>
    </Grid>
  );
};

export default Landing;

/* eslint-disable react-hooks/exhaustive-deps */
import { FormProvider, useForm } from 'react-hook-form';
import { Routes, Route, useLocation } from 'react-router';
import { Skadeforklaring } from './api/skadeforklaring';
import { InnloggetProvider } from './core/contexts/InnloggetContext';
import Feil from './pages/Feil';
import Kvittering from './pages/Kvittering';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Oppsummering from './pages/Oppsummering';
import PaaVegneAv from './pages/PaaVegneAv';
import Ulykken from './pages/Ulykken';
import Vedlegg from './pages/Vedlegg';
import Veiledning from './pages/Veiledning';
import { StepsProvider, ISteps } from '@navikt/yrkesskade-stepindicator';
import { InnloggetStatus } from './utils/autentisering';
import { useEffect } from 'react';
import { LogService } from './services/LogService';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from './core/hooks/state.hooks';
import { hentKodeverk } from './core/reducers/kodeverk.reducer';
import { logAmplitudeEvent } from './utils/analytics/amplitude';
import { selectInnlogget } from './core/reducers/bruker.reducer';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    logAmplitudeEvent('skadeforklaring.sidevisning', {
      pathname: location.pathname,
    });
  }, [location]);

  useEffect(() => {
    if (LogService.sesjon === undefined) {
      LogService.sesjon = uuidv4();
    }
  });

  return (
    <InnloggetProvider>
      <AppContent />
    </InnloggetProvider>
  );
};

export default App;

const AppContent = () => {
  const methods = useForm<Skadeforklaring>();
  const dispatch = useAppDispatch();
  const innlogget = useAppSelector((state) => selectInnlogget(state));

  useEffect(() => {
    if (innlogget === InnloggetStatus.OK) {
      dispatch(hentKodeverk('fravaertype'));
      dispatch(hentKodeverk('foerteDinSkadeEllerSykdomTilFravaer'));
      dispatch(hentKodeverk('innmelderrolle'));
    }
  }, [innlogget]);

  return (
    <FormProvider {...methods}>
      <StepsProvider stepsDefinition={steps}>
        <Routes>
          <Route path="skadeforklaring">
            <Route index element={<Landing />} />
            <Route path="skjema">
              <Route index element={<Veiledning />} />
              <Route path="person" element={<PaaVegneAv />} />
              <Route path="ulykken" element={<Ulykken />} />
              <Route path="vedlegg" element={<Vedlegg />} />
              <Route path="oppsummering" element={<Oppsummering />} />
              <Route path="kvittering" element={<Kvittering />} />
            </Route>
            <Route path="feilmelding" element={<Feil />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StepsProvider>
    </FormProvider>
  );
};

const steps: ISteps = {
  totalSteps: 5,
  currentStep: 0,
  details: [
    {
      text: 'Veiledning',
      done: false,
      active: true,
      pathmatch: '/skadeforklaring/skjema',
    },
    {
      text: 'Dine opplysninger',
      done: false,
      active: false,
      pathmatch: '/skadeforklaring/skjema/person',
    },
    {
      text: 'Om ulykken',
      done: false,
      active: false,
      pathmatch: '/skadeforklaring/skjema/ulykken',
    },
    {
      text: 'Vedlegg',
      done: false,
      active: false,
      pathmatch: '/skadeforklaring/skjema/vedlegg',
    },
    {
      text: 'Oppsummering',
      done: false,
      active: false,
      pathmatch: '/skadeforklaring/skjema/oppsummering',
    },
  ],
};

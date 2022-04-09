import { FormProvider, useForm } from 'react-hook-form';
import { Routes, Route } from 'react-router';
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
import { autentiseringsInterceptor } from './utils/autentisering';
import { useEffect } from 'react';
import { LogService } from './services/LogService';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from './core/hooks/state.hooks';
import { hentKodeverk } from './core/reducers/kodeverk.reducer';

const App = () => {
  const methods = useForm<Skadeforklaring>();
  const dispatch = useAppDispatch();
  autentiseringsInterceptor();

  useEffect(() => {
    if (LogService.sesjon === undefined) {
      LogService.sesjon = uuidv4();

      dispatch(hentKodeverk({ typenavn: 'landkoder', kategorinavn: 'xxx' }));
    }
  });

  return (
    <InnloggetProvider>
      <FormProvider {...methods}>
        <StepsProvider stepsDefinition={steps}>
          <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StepsProvider>
      </FormProvider>
    </InnloggetProvider>
  );
};

export default App;

const steps: ISteps = {
  totalSteps: 5,
  currentStep: 0,
  details: [
    {
      text: 'Veiledning',
      done: false,
      active: true,
      pathmatch: '/skjema',
    },
    {
      text: 'Dine opplysninger',
      done: false,
      active: false,
      pathmatch: '/skjema/person',
    },
    {
      text: 'Om ulykken',
      done: false,
      active: false,
      pathmatch: '/skjema/ulykken',
    },
    {
      text: 'Vedlegg',
      done: false,
      active: false,
      pathmatch: '/skjema/vedlegg',
    },
    {
      text: 'Oppsummering',
      done: false,
      active: false,
      pathmatch: '/skjema/oppsummering',
    },
  ],
};

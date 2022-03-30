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
import { autentiseringsInterceptor } from './utils/autentisering';

const App = () => {
  const methods = useForm<Skadeforklaring>();
  autentiseringsInterceptor();

  return (
    <InnloggetProvider>
      <FormProvider {...methods}>
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
      </FormProvider>
    </InnloggetProvider>
  );
};

export default App;

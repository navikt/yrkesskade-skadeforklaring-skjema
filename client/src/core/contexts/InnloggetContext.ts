/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import createUseContext from 'constate';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/state.hooks';
import { InnloggetStatus } from '../../utils/autentisering';
import {
  selectInnlogget,
  setBruker,
  setInnlogget,
} from '../reducers/bruker.reducer';
import { BrukerinfoApiService } from '../../api/skadeforklaring/services/BrukerinfoApiService';
import { logErrorMessage } from '../../utils/logging';

const [InnloggetProvider, useInnloggetContext] = createUseContext(() => {
  const dispatch = useAppDispatch();
  const innlogget = useAppSelector((state) => selectInnlogget(state));

  useEffect(() => {
    if (innlogget === InnloggetStatus.IKKE_VERIFISERT) {
      verifiserAtBrukerErAutentisert();
    }
  }, [innlogget]);

  const verifiserAtBrukerErAutentisert = () => {
    return axios
      .get('/innlogget')
      .then((ressurs) => {
        if (ressurs.status === 200) {
          BrukerinfoApiService.hentBrukerinfo()
            .then((brukerResponse) => {
              if (brukerResponse) {
                dispatch(setInnlogget(InnloggetStatus.OK));
                dispatch(setBruker(brukerResponse));
              } else {
                dispatch(setInnlogget(InnloggetStatus.FEILET));
                logErrorMessage(
                  'Innlogging feilet. Kunne ikke finne bruker i brukerresponse'
                );
              }
            })
            .catch((error) => {
              dispatch(setInnlogget(InnloggetStatus.FEILET));
              logErrorMessage(
                `Hente brukerinformasjon feilet. Årsak: ${JSON.stringify(
                  error
                )}`
              );
            });
        } else {
          dispatch(setInnlogget(InnloggetStatus.FEILET));
          logErrorMessage(
            `Innlogginsjekk feilet. Uventet statuskode: ${ressurs.status}`
          );
        }
      })
      .catch((error) => {
        dispatch(setInnlogget(InnloggetStatus.FEILET));
        logErrorMessage(
          `Innloggingsjekk feilet. Årsak: ${JSON.stringify(error)}`
        );
      });
  };

  return {
    innlogget,
  };
});

export { InnloggetProvider, useInnloggetContext };

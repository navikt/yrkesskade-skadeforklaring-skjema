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
      .get('/user/profile')
      .then((ressurs) => {
        if (ressurs.status === 200) {
          dispatch(setInnlogget(InnloggetStatus.OK));
          dispatch(setBruker(ressurs.data));
        } else {
          dispatch(setInnlogget(InnloggetStatus.FEILET));
          logErrorMessage('Innlogging feilet');
        }
      })
      .catch((error) => {
        dispatch(setInnlogget(InnloggetStatus.FEILET));
        logErrorMessage(`Innlogging feilet. Årsak: ${JSON.stringify(error)}`);
      });
  };

  return {
    innlogget,
  };
});

export { InnloggetProvider, useInnloggetContext };

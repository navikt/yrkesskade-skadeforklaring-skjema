import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { selectSkjemaStartet } from '../reducers/app.reducer';
import { useAppSelector } from './state.hooks';

export const useCheckIfReloaded = () => {
  const skjemaStartet = useAppSelector((state) => selectSkjemaStartet(state));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (skjemaStartet) {
      return;
    }

    navigate('/skadeforklaring/skjema');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};

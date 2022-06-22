import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { logMessage } from '../../utils/logging';
import { persistStore } from 'redux-persist';
import store from '../store';

export const useCancel = () => {
  const handleCancel = () => {
    persistStore(store).purge();
    logMessage('Brukeren har avsluttet innsending av skadeforklaring');
    logAmplitudeEvent('skadeforklaring.innmelding', { status: 'avsluttet' });
    window.location.href =
      'https://www.nav.no/soknader/nb/person/helse/yrkesskade';
  };

  return handleCancel;
};

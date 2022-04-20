import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { logMessage } from '../../utils/logging';

export const useCancel = () => {
  const handleCancel = () => {
    logMessage('Brukeren har avsluttet innsending av skadeforklaring');
    logAmplitudeEvent('skadeforklaring.innmelding', { status: 'avsluttet' });
    window.location.href =
      'https://www.nav.no/soknader/nb/person/helse/yrkesskade';
  };

  return handleCancel;
};

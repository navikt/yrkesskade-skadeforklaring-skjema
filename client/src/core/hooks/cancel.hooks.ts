import { logMessage } from '../../utils/logging';

export const useCancel = () => {
  const handleCancel = () => {
    logMessage('Brukeren har avsluttet innsending av skadeforklaring');
    window.location.href =
      'https://www.nav.no/soknader/nb/person/helse/yrkesskade';
  };

  return handleCancel;
};

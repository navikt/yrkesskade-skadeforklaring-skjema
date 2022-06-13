import clientRegistry from '@navikt/yrkesskade-backend/dist/auth/clientRegistry';
import {
  ensureAuthenticated,
  getTokenFromRequest,
  utledAudience,
} from '@navikt/yrkesskade-backend/dist/auth/tokenUtils';
import { exchangeToken } from '@navikt/yrkesskade-backend/dist/auth/tokenx';
import axios from 'axios';
import { Request, Response, Express } from 'express';
import { verifiserAccessToken } from '../auth/idporten';
import { serviceConfig } from '../serviceConfig';
import { IService } from '@navikt/yrkesskade-backend/dist/typer';
import { logError } from '@navikt/yrkesskade-logging';

export const configureUserInfo = (app: Express) => {
  app.use('/user/profile', ensureAuthenticated, hentBrukerprofil);
};

const hentBrukerprofil = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  const service = serviceConfig.find(
    (service: IService) => service.id === 'yrkesskade-skadeforklaring-api'
  );

  if (token) {
    try {
      await verifiserAccessToken(token);
      const klient = clientRegistry.getClient('tokenX');
      const audience = utledAudience(service);
      const tokenX = await exchangeToken(klient, audience, req);
      const respons = await axios.get(`${service.proxyUrl}/api/v1/brukerinfo`, {
        headers: { Authorization: `Bearer ${tokenX.access_token}` },
      });

      res.status(200).json(respons.data);
    } catch (error) {
      logError(error);
      res.status(400).json({ melding: error });
    }
  } else {
    res.status(401).json({ melding: 'Token finnes ikke' });
  }
};

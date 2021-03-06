import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { exchangeToken } from '../tokenx';
import { logError, logSecure, stdoutLogger } from '@navikt/yrkesskade-logging';
import { v4 as uuidv4 } from 'uuid';

const errorHandler = (err, req, res) => {
  if (process.env.ENV !== 'production') {
    logError('Feil', err);
  } else {
    logSecure(err);
  }
};

export const doProxy = (path: string, target: string) => {
  return createProxyMiddleware(path, {
    pathRewrite: {
      '^/kodeverk/': '/',
      '^/api/': '/',
    },
    changeOrigin: true,
    secure: false,
    logLevel: process.env.ENV === 'prod' ? 'info' : 'debug',
    logProvider: () => stdoutLogger,
    onProxyReq: fixRequestBody,
    onError: errorHandler,
    router: async (req) => {
      const tokenSet = await exchangeToken(req);
      if (!tokenSet?.expired() && tokenSet?.access_token) {
        req.headers.authorization = `Bearer ${tokenSet.access_token}`;
      }

      req.headers['Nav-CallId'] = uuidv4();

      return undefined;
    },
    target: `${target}`,
  });
};

import { Express } from 'express';
import { LogMessage } from '../../client/src/types/log-message';
import {
  logInfo,
  logWarn,
  logError,
  logSecure,
  logDebug,
} from '@navikt/yrkesskade-logging';

export const configureLoggingEndpoint = (app: Express): Express => {
  app.post(`/log`, handleLogging);
  return app;
};

const handleLogging = (req, res) => {
  const logMessage = req.body as LogMessage;

  switch (logMessage.severity) {
    case 'INFO':
      logInfo(logMessage.message, { session: logMessage.session });
      break;
    case 'WARN':
      logWarn(logMessage.message, { session: logMessage.session });
      break;
    case 'ERROR':
      logError(logMessage.message, null, { session: logMessage.session });
      break;
    case 'SECURE':
      logSecure(logMessage.message, { session: logMessage.session });
      break;
    default:
      logDebug(logMessage.message);
  }

  res.sendStatus(200);
};

import { LogService } from '../services/LogService';
import { LogMessage } from '../types/log-message';

export const logMessage = (message: string) => {
  log(message, 'INFO');
};

export const logErrorMessage = (message: string) => {
  log(message, 'ERROR');
};

export const logWarningMessage = (message: string) => {
  log(message, 'WARN');
};

const log = (message: string, severity: string) => {
  const messageObject: LogMessage = {
    message: message,
    timestamp: new Date().toISOString(),
    severity: severity,
    session: LogService.sesjon,
  };
  LogService.log(messageObject);
};

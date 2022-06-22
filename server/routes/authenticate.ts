import { Express } from 'express';
import { redirectTilLogin } from '../autentisering';

export const configureAuthenticationAndVerification = (app: Express) => {
  app.get(`/redirect-til-login`, (request: any, response: any) => {
    redirectTilLogin(request, response);
  });
};

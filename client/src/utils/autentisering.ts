import axios, { AxiosError } from 'axios';

// interne hjelpe metoder
const er401Feil = (error: AxiosError) => error?.response?.status === 401;
const erNoValidToken = (error: AxiosError) => {
  return (
    error.response?.status === 500 &&
    error.response.statusText.includes(
      'no valid token found in validation context'
    )
  );
};

const getLoginUrl = () => {
  return `/redirect-til-login?redirect=${window.location.origin}/skadeforklaring/`;
};

export enum InnloggetStatus {
  IKKE_VERIFISERT,
  IKKE_INNLOGGET,
  INNLOGGET,
  FEILET,
  OK,
}

export interface InnloggetBruker {
  fnr: number;
}

export const autentiseringsInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      console.error(error);
      if (er401Feil(error) || erNoValidToken(error)) {
        window.location.href = getLoginUrl();
      } else {
        throw error;
      }
    }
  );
};

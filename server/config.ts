import dotenv from 'dotenv';
dotenv.config();

const APP_URL = process.env.APP_URL || 'localhost:3000';
const API_URL =
  process.env.API_URL ||
  'https://yrkesskade-skadeforklaring-api.dev.intern.nav.no/api';
const KODEVERK_URL =
  process.env.KODEVERK_API_URL ||
  'https://yrkesskade-kodeverk.dev.intern.nav.no';
const DOKGEN_URL =
  process.env.DOKGEN_URL || 'https://yrkesskade-dokgen.dev.intern.nav.no';
const COOKIE_NAME = 'local-idtoken';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  BASE_PATH: '/skadeforklaring',
  APP_URL,
  API_URL,
  DOKGEN_URL,
  KODEVERK_URL,
  COOKIE_NAME,
};

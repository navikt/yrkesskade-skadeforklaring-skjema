import { Express } from 'express';
import { logError, logInfo } from '@navikt/yrkesskade-logging';
import axios from 'axios';
import config from '../config';
import { pdfSkadeforklaringMapper } from '../dokgen/pdfSkadeforklaringMapper';
import { Skadeforklaring } from '../../client/src/api/skadeforklaring';

export const configurePrintEndpoint = (app: Express): Express => {
  app.post(`/print`, handlePrint);
  return app;
};

const handlePrint = async (req, res) => {
  logInfo(
    `Generer skadeforklaring PDF: ${config.DOKGEN_URL}/template/skadeforklaring-tro-kopi`
  );

  if (!req || !req.body) {
    logError('Ugyldig print request. Mangler skadeforklaring');
    res.sendStatus(400);
  }

  const pdfSkadeforklaring = await pdfSkadeforklaringMapper(
    req.body as Skadeforklaring
  );

  const response = await axios.post(
    `${config.DOKGEN_URL}/template/skadeforklaring-tro-kopi/download-pdf`,
    pdfSkadeforklaring,
    {
      responseType: 'stream',
    }
  );

  if (response.status !== 200) {
    logError(
      `Feilet i å generere PDF. Status: ${response.status} ${response.data}`
    );
    res.sendStatus(400);
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=kopi_skadeforklaring.pdf'
  );
  response.data.pipe(res);
};

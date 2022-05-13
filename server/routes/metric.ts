import { Express } from 'express';

export const configureMetricEndpoint = (app: Express): Express => {
  app.post(`/metric`, handleMetric);
  return app;
};

const handleMetric = (req, res) => {
  res.sendStatus(200);
};

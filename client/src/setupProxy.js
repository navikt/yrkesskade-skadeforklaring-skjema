const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  const host = process.env.HOST || 'localhost';
  const port = '3000';

  app.use(
    '/redirect-til-login',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/success',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/innlogget',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/toggles',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/log',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/print',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${host}:${port}`,
      changeOrigin: true,
    })
  );

  app.use(
    '/kodeverk',
    createProxyMiddleware({
      target: `http://${host}:${port}/`,
      changeOrigin: true,
    })
  );
};

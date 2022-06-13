import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.less';

import App from './App';
import store from './core/store';
import { OpenAPI } from './api/skadeforklaring';
import { OpenAPI as KodeverkOpenApi } from './api/kodeverk';
import { initAmplitude } from './utils/analytics/amplitude';
import { initWindowOnError } from './utils/global-error';

OpenAPI.BASE = '/backend/api';
KodeverkOpenApi.BASE = '/kodeverk';

initAmplitude();
initWindowOnError();

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

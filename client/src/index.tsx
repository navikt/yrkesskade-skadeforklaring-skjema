import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.less';

import App from './App';
import store from './core/store';
import { OpenAPI } from './api/skadeforklaring';
import { OpenAPI as KodeverkOpenApi } from './api/kodeverk';

OpenAPI.BASE = '/api';
KodeverkOpenApi.BASE = '/kodeverk';

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

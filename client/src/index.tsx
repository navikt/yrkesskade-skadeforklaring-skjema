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
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { autentiseringsInterceptor } from './utils/autentisering';

OpenAPI.BASE = '/backend/api';
KodeverkOpenApi.BASE = '/kodeverk';

autentiseringsInterceptor();

initAmplitude();
initWindowOnError();

const persistor = persistStore(store);

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

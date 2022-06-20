import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appReducer from '../reducers/app.reducer';
import brukerReducer from '../reducers/bruker.reducer';
import kodeverkReducer from '../reducers/kodeverk.reducer';
import skadeforklaringReducer from '../reducers/skadeforklaring.reducer';
import vedleggReducer from '../reducers/vedlegg.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  appState: appReducer,
  bruker: brukerReducer,
  skadeforklaring: skadeforklaringReducer,
  vedlegg: vedleggReducer,
  kodeverk: kodeverkReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['vedlegg'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const reducers = {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
};

const store = configureStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import brukerReducer from '../reducers/bruker.reducer';
import skadeforklaringReducer from '../reducers/skadeforklaring.reducer';
import vedleggReducer from '../reducers/vedlegg.reducer';

const reducers = {
  reducer: {
    bruker: brukerReducer,
    skadeforklaring: skadeforklaringReducer,
    vedlegg: vedleggReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
};

const store = configureStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AppState {
  skjemaStartet: boolean;
}

const initialState: AppState = {
  skjemaStartet: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSkjemaStartet: (state) => {
      state.skjemaStartet = true;
    },
    setSkjemaFullfort: (state) => {
      state.skjemaStartet = false;
    },
  },
});

export const selectAppState = (state: RootState) => state.appState;
export const selectSkjemaStartet = createSelector(
  selectAppState,
  (appState) => appState.skjemaStartet
);

export const { setSkjemaStartet, setSkjemaFullfort } = appSlice.actions;

export default appSlice.reducer;

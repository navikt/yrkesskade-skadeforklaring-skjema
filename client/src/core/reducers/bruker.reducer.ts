import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InnloggetStatus } from '../../utils/autentisering';
import { RootState } from '../store';

interface BrukerState {
  fnr: string;
  innlogget: InnloggetStatus;
}

const initialState: BrukerState = {
  fnr: '',
  innlogget: InnloggetStatus.IKKE_VERIFISERT,
};

export const brukerSlice = createSlice({
  name: 'bruker',
  initialState,
  reducers: {
    setBrukerIdentifikasjon: (state, action: PayloadAction<string>) => {
      state.fnr = action.payload;
    },
    setInnlogget: (state, action: PayloadAction<InnloggetStatus>) => {
      state.innlogget = action.payload;
    },
  },
});

export const selectBruker = (state: RootState) => state.bruker;
export const selectInnlogget = createSelector(
  selectBruker,
  (bruker: BrukerState) => {
    return bruker.innlogget;
  }
);

export const { setBrukerIdentifikasjon, setInnlogget } = brukerSlice.actions;

export default brukerSlice.reducer;

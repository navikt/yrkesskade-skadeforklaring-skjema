import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brukerinfo } from '../../api/skadeforklaring';
import { InnloggetStatus } from '../../utils/autentisering';
import { RootState } from '../store';

interface BrukerState {
  brukerinfo: Brukerinfo | null;
  innlogget: InnloggetStatus;
}

const initialState: BrukerState = {
  brukerinfo: null,
  innlogget: InnloggetStatus.IKKE_VERIFISERT,
};

export const brukerSlice = createSlice({
  name: 'bruker',
  initialState,
  reducers: {
    setBruker: (state, action: PayloadAction<Brukerinfo>) => {
      state.brukerinfo = action.payload;
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

export const { setBruker, setInnlogget } = brukerSlice.actions;

export default brukerSlice.reducer;

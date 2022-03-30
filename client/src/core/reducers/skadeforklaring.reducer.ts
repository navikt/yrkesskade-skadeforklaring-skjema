import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { Skadeforklaring } from '../../api/skadeforklaring/models/Skadeforklaring';
import { RootState } from '../store';

interface SkadeforklaringState {
  skadeforklaring: Skadeforklaring;
}

const initialState: SkadeforklaringState = {
  skadeforklaring: {
    identifikator: '12345678910',
    tid: {
      tidstype: '',
    },
    behandler: {
      erBehandlerOppsokt: undefined,
      behandlerNavn: '',
    },
    fravaer: {
      harFravaer: undefined,
      fravaertype: '',
      antallDager: 0,
    },
    arbeidsbeskrivelse: '',
    ulykkesbeskrivelse: '',
    vedleggtype: '',
    vedleggreferanser: [],
  },
};

export const skadeforklaringSlice = createSlice({
  name: 'skadeforklaring',
  initialState,
  reducers: {
    oppdaterSkadeforklaring: (
      state,
      action: PayloadAction<Skadeforklaring>
    ) => {
      state.skadeforklaring = merge(state.skadeforklaring, action.payload);
    },
  },
});

export const selectSkadeforklaring = (state: RootState) =>
  state.skadeforklaring.skadeforklaring;

export const { oppdaterSkadeforklaring } = skadeforklaringSlice.actions;
export default skadeforklaringSlice.reducer;
